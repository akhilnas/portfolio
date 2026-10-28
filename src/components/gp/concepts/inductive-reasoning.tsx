import { ConceptLink } from "../tooltip"

export const meta = { slug: "inductive-reasoning", term: "inductive reasoning" }

export default function InductiveReasoningContent() {
  return (
    <div className="stack">
      <p>
        Reasoning is <em>inductive</em> when it generalizes from a limited
        set of specific examples to a rule meant to cover cases you haven't
        seen. This is different from <em>deductive</em> reasoning, where a
        conclusion follows with certainty from its premises (e.g. "all
        ravens are black; this is a raven; therefore it's black"). Induction
        gives no such guarantee — from "every raven I've seen is black" you
        can only conclude that black ravens are likely, never certain.
      </p>
      <p>
        Learning from a <ConceptLink slug="training-set" /> is inductive in
        exactly this way: a finite handful of input-output examples is
        consistent with infinitely many different functions, so there's no
        purely logical way to pick "the" correct one. Some extra assumption
        about the kind of function you expect — e.g. that it's smooth, or
        linear — is unavoidable, which is exactly what a{" "}
        <ConceptLink slug="prior-distribution" /> supplies in the Bayesian
        approach Gaussian processes take.
      </p>
    </div>
  )
}
