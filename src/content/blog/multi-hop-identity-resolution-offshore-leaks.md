---
title: 'Finding the Same Person Twice: Multi-Hop Identity Resolution on the Offshore Leaks Graph'
excerpt: How do you prove two records belong to the same entity when they don't share a single field in common? A walkthrough of a propose-then-prove identity resolution pipeline built on the ICIJ Offshore Leaks graph.
publishDate: 'Jul 10 2026'
tags:
  - Graph Neural Networks
  - Machine Learning
  - Data Engineering
seo:
  image:
    src: '/portfolio/multi-hop-network.png'
    alt: A network graph visualization showing nodes connected across multiple hops
---

![Multi-hop identity resolution network graph](/portfolio/multi-hop-network.png)
*Image generated with Google Gemini.*

*How do you prove two records are the same entity when they don't share a single field in common?*

## The problem with "just join on the ID"

Most identity resolution is a join. Table A has a `customer_id`, table B has the same `customer_id`, you match rows, done. It works right up until it doesn't — which, in any system that's grown organically for more than a year or two, is almost immediately.

I ran into this for real building an ingestion pipeline for hospital data. Every export a hospital sends you uses a different ID for the same patient — a billing system keys off `ORDER_ID`, the EHR keys off `Person Unified Identifier`, a lab feed keys off `Transaction ID` — and *no single file* ever contains both the ID you have and the ID you need. The only way to resolve them is to notice that `ORDER_ID` shows up next to `Visit Number` in one file, and `Visit Number` shows up next to the patient ID in another, and chain the two co-occurrences together. One hop isn't enough. You need to walk the graph.

That pipeline works, but it's built on proprietary hospital data I can't show anyone. So I went looking for an open dataset that has the same shape — separate ID spaces, no direct key overlap, and a real payoff for chaining hops — to make the idea concrete without a single confidential row in sight.

## Enter the Offshore Leaks

The [ICIJ Offshore Leaks database](https://offshoreleaks.icij.org) turned out to be close to perfect. It's the graph behind the Panama Papers, Paradise Papers, Pandora Papers, Bahamas Leaks, and the original Offshore Leaks investigation — five separate leaks, from five separate sources, merged into one property graph: **2 million nodes, 3.3 million relationship rows** (2.9 million once you collapse exact duplicates into a proper graph).

Nodes come in five flavors — Officer (a person or company with a role at an entity), Entity (the offshore company itself), Intermediary (the law firm or middleman that set it up), Address, and a handful of holding-group connectors. Relationships are things like `officer_of`, `intermediary_of`, and `registered_address`.

The important part, for this demo, is what ICIJ *didn't* do: they never deduplicated or standardized names across the five leaks. The same real person who shows up as a director of the same company in both the 2016 Panama Papers release and the original 2013 Offshore Leaks release exists as **two separate node records**, under whatever spelling and punctuation each source happened to use. No shared key. Just a name that looks similar, sitting in two different corners of a 2-million-node graph.

That's not a data-quality bug I need to work around — that's the exact multi-hop identity resolution problem, handed to me for free.

## First attempt: the wrong lesson from a real BFS

My first pass was simple: pick a seed name, walk out from it a few hops, cap the subgraph at 400 nodes so it stays small enough to look at, done. I seeded on "Ross," because that's the name ICIJ uses in their own tutorial.

I ran it. It produced exactly 400 nodes and **zero edges.**

Turns out "Ross" matches 3,618 nodes across the dataset — officers, entities, even addresses with "Ross" in the street name. My BFS frontier was so stuffed with unrelated seed nodes that it hit the 400-node cap before it ever expanded past depth zero. I hadn't built a neighborhood around a name. I'd built a random sample of everyone who happens to share four letters, and none of them are connected to each other.

It's a small failure, but it's the right shape of failure: **a common substring is not a query.** Real identity resolution has to generate candidates deliberately and verify them structurally — which is, not coincidentally, exactly what the hospital pipeline does with an LLM proposing column mappings and a graph search confirming them. So I rebuilt the demo around that same two-step shape, at the scale of the *entire* graph instead of one seed neighborhood.

## The real pipeline: propose, then prove

Four stages, each one a stand-in for a stage in the production system:

**1. Load everything.** All five node files, all 3.3M raw relationship rows (2.9M unique edges once duplicates collapse), into one graph in memory. No sampling, no cap.

**2. Propose candidates.** This is the analog of the LLM proposing a column mapping. Since ICIJ never deduplicated names, I group all ~770,000 officer nodes by a normalized version of their name — uppercase, punctuation stripped — and pull out every pair of *different* node IDs that land in the same small group (2–5 members, to skip overly generic names). That alone turns up **79,948 exact-match candidate pairs.** I add a second pass for near-misses (spelling variants, extra initials, punctuation like "S.A." vs "SA") using a similarity ratio, blocked by first name-token to keep it tractable — another **241,952 candidate pairs.** Every candidate pair I keep already has *no* direct edge between the two nodes — if they were already linked, there'd be nothing to resolve.

That's roughly 322,000 candidates total. For this demo I don't test all of them — I cap and prioritize down to a testable slice: 500 exact-match pairs and 3,000 near-misses, sorted cross-leak matches first, since "same person surfaced in two different leaks" is the more interesting case than two records sitting in the same file. That's the slice the numbers below describe — not the full population.

**3. Prove or disprove it.** This is the graph search. For each candidate pair, I run a bounded shortest-path search — up to 4 hops, since `Officer → Entity → Address → Entity → Officer` is the longest structural loop you'd expect if two records are the same person filed under two different entities. If a path exists within that cutoff, the pair is **resolved**. If not, it's logged as a name coincidence the graph correctly ruled out.

**4. Export the receipts.** For every resolved pair, pull out the path plus a little context and write it to its own GraphML file — small enough to open directly in Gephi and see the whole chain at once.

Out of the 3,500 candidate pairs tested, **121 resolved** into real connected paths — 49 in 2 hops, 45 in 3, and 27 that needed the full 4-hop structural loop. Every single one of those 121 is a genuine identity resolved with zero shared keys.

## Walking one path end to end

Here's the smallest, cleanest one:

> Officer **"BRIAN JACK YOUD"** *(Panama Papers)*
> `--registered_address-->`
> Address **"MARINO; LE CLOS DE LA MARE; LA RUE DE MAUPERTUIS; ST CLEMENT; JERSEY JE2 6NH"** *(Panama Papers)*
> `--same_as-->`
> Address **"Marino, Le Clos de la Mare La Rue de Maupertuis St. Clement, Jersey JE2 6NH"** *(Offshore Leaks)*
> `--registered_address-->`
> Officer **"Brian Jack Youd"** *(Offshore Leaks)*

Two officer records, filed three years apart in two different leak investigations — the original 2013 Offshore Leaks and the 2016 Panama Papers. Different node IDs, different casing, different punctuation in the address — literally not one character-for-character identical field between them. What connects them is that both list the same registered address, and ICIJ's own similarity engine had already flagged those two address strings as `same_as` each other, even though they're formatted differently. The graph walk stitches a residential address in Jersey to a person's identity across two unrelated data drops. That's the whole trick: no field matches, but the *path* is unambiguous.

## A near-miss, not an exact one

The Brian Jack Youd example started from an *exact* name match — same spelling, different everything else. The fuzzy pass exists for the more common real-world case: the name itself isn't even spelled the same. Here's one the near-miss matcher caught (similarity 0.984, just shy of identical):

> Officer **"OFFSHORE INCORPORATION LIMITED"** *(Panama Papers)*
> `--registered_address-->`
> Address **"1103 RUTTONJEE HOUSE; 11 DUDDELL STREET; CENTRAL; HONG KONG"** *(Panama Papers)*
> `--same_as-->`
> Address **"1103 RUTTONJEE HOUSE, 11 DUDDELL STREET CENTRAL HONG KONG"** *(Offshore Leaks)*
> `--registered_address-->`
> Officer **"Offshore Incorporations Limited"** *(Offshore Leaks)*

Singular "Incorporation" versus plural "Incorporations" — the kind of typo that breaks an exact-match join outright and would need a fuzzy threshold to even get considered. The mechanism that confirms it is identical to the exact case: no shared key, just a shared address that ICIJ's own dedup logic had already linked, walked in three hops.

## The hub problem (or: why "connected" isn't proof of anything)

Early on, nearly every candidate pair I tested "resolved" — which was suspicious, because most of them shouldn't have been the same person at all. The culprit was node degree. Offshore entities routinely share a registered agent's address, and one address in this dataset is connected to **37,338 different relationships.** Walk through a hub like that and you can find a "path" between almost any two officers in the entire graph.

The fix: exclude high-degree nodes from serving as intermediate hops. Degree in this graph is heavily skewed — median 2, 99th percentile 14 — so cutting off anything above 150 removes only the top ~0.1% of nodes as *pass-through* points, while every candidate officer is still free to be an *endpoint* no matter how connected they are. After that filter, the noise mostly disappeared, and what was left were paths like the one above: short, specific, and boring in exactly the way real evidence should be boring.

## The false lead: precision over recall

Not every same-name pair should resolve, and the pipeline gets that right too. Take **"BELL GARY"** — one record filed under the Bahamas Leaks, another under a Paradise Papers corporate registry, identical name, identical formatting. Every superficial signal says "same person." The 4-hop graph search found **no connecting path** between them at all, hub exclusion or not.

Maybe they *are* the same Gary Bell and the connecting entity simply wasn't captured in this particular relationship dump. Or maybe "Gary Bell" is just a name two different people happen to share — it's not exactly rare. Either way, the pipeline doesn't guess. It reports "candidate proposed, not resolved" and moves on, which is a far more honest answer than confidently merging two people because their names matched.

3,379 of the 3,500 candidates tested landed here. That ratio isn't a failure rate — it's the entire point. A system that resolved almost all 3,500 same-named pairs into "confirmed identity matches" wouldn't be doing identity resolution, it'd be doing string matching with extra steps.

## Why this generalizes

Swap "officer" for "patient," "leak source" for "hospital export system," and `same_as` address matching for whatever fuzzy signal your domain gives you, and this is structurally the same pipeline as the production one: **propose candidates from partial signal, let a bounded graph search confirm or reject the connection, never trust a match that only "looks right."** The mechanism doesn't care whether the nodes are offshore shell companies or hospital patients — it cares whether there's a real, short, evidence-backed path between two records that no single field will ever directly link.

The code for all four stages — graph loading, candidate generation, bounded resolution, and GraphML export — is a few hundred lines of Python (pandas + networkx, no exotic dependencies). Loading the full 2.9M-edge graph takes under a minute; testing 3,500 candidate pairs one bounded search at a time is the slow part, at a few minutes more. If you want to point it at a different name, a different hop cutoff, or a larger slice of the 322,000 candidates actually sitting in the data, the seams are right there to pull.

---

*Dataset: [ICIJ Offshore Leaks Database](https://offshoreleaks.icij.org).*
