---
title: 'Medical Literature Triage & Evidence Synthesis Agent'
description: Built a production multi-agent system that continuously monitors PubMed, extracts structured PICO data using LLMs, generates semantic embeddings with PubMedBERT, and synthesises graded evidence summaries for clinicians — deployed on AWS ECS Fargate with full observability.
publishDate: 'Mar 01 2026'
isFeatured: true
seo:
  image:
    src: '/portfolio/project-9.jpg'
    alt: Project preview
---

![Project preview](/portfolio/project-9.jpg)

## Background

PubMed indexes over one million new biomedical articles every year. Clinicians and researchers tracking a clinical question — say, the effect of SGLT2 inhibitors on heart failure outcomes — face an impossible task if they attempt to monitor the literature manually. New randomised controlled trials, meta-analyses, and cohort studies appear continuously, but the workflow of finding, reading, grading, and synthesising that evidence has remained largely a manual, time-intensive process.

The opportunity is clear: if a system could continuously watch PubMed, automatically extract the structured clinical data that determines evidence quality, and produce a graded summary of what the literature actually says — clinicians and researchers could stay current without the overhead.

## Project Scope

To design and deploy a production-grade multi-agent system that automates the full medical literature triage workflow: from scheduled PubMed monitoring through structured data extraction, semantic embedding, and evidence synthesis, surfaced via a clinician-facing dashboard and REST API.

The project was built as a portfolio demonstration of end-to-end AI agent engineering — spanning NLP, agent orchestration, production ML system design, and cloud infrastructure.

## Architecture

The system follows an event-driven, multi-agent pipeline where four specialised agents hand off work through a shared PostgreSQL database. Using the database as the communication layer — rather than direct inter-agent messaging — provides natural checkpointing: if the pipeline fails mid-run, it resumes from the last completed step without re-processing.

### The Four-Agent Pipeline

1. **Monitor Agent** — Runs on a configurable cron schedule, queries PubMed via the E-utilities API for each active clinical query, deduplicates against existing records using PubMed IDs, scores article relevance, and stores new articles with `pending` status.

2. **Extraction Agent (Gemini Flash)** — Processes each pending article, extracting structured PICO elements (Population, Intervention, Comparison, Outcome), classifying study design (RCT, cohort, meta-analysis, case report, etc.), pulling quantitative results (effect size, confidence interval, p-value), and assigning an evidence level (I–V) based on study hierarchy.

3. **Embedding Agent (PubMedBERT)** — Generates 768-dimensional semantic embeddings from article abstracts and PICO data using a domain-specific biomedical language model (`sentence-transformers` with PubMedBERT weights), storing vectors in PostgreSQL via the `pgvector` extension.

4. **Synthesis Agent (Gemini Flash)** — Takes the top-ranked articles for a clinical query, groups findings by evidence quality, assesses consensus versus conflicting results, and generates a structured narrative summary with an overall evidence grade (strong / moderate / weak / insufficient) and identified evidence gaps.

### Presentation Layer

A **FastAPI** REST API exposes pipeline control, article search, and synthesis retrieval. A **Streamlit** dashboard provides a clinician-facing interface for query management, article browsing, semantic search, and synthesis review. Search uses a hybrid scoring formula combining semantic similarity and full-text ranking: `0.7 × cosine_similarity + 0.3 × ts_rank`.

### Observability

Every service emits structured JSON logs with correlation IDs via `structlog`. A Prometheus `/metrics` endpoint is scraped every 15 seconds, with Grafana dashboards auto-provisioned from configuration. Alert rules cover pipeline stalls, high LLM token consumption, elevated API latency, and extraction failure rates.

## Key Capabilities

- Automated PubMed monitoring on configurable cron schedules per clinical query
- PICO extraction and study design classification via Gemini Flash
- Evidence level grading (Level I–V) based on study hierarchy
- PubMedBERT 768-dimensional semantic embeddings stored in pgvector
- Hybrid semantic + full-text search (`0.7 × cosine + 0.3 × ts_rank`)
- Evidence synthesis with grade, consensus analysis, key findings, and evidence gaps
- Streamlit dashboard with query management, article explorer, and synthesis viewer
- Prometheus metrics and Grafana dashboards for pipeline observability
- Structured JSON logging with correlation IDs across all agents
- Database-as-shared-state agent communication pattern for fault-tolerant checkpointing

## Tech Stack

| Layer | Technology |
|---|---|
| API | FastAPI + SQLAlchemy 2.0 async |
| Database | PostgreSQL 16 + pgvector |
| LLM | Google Gemini Flash (`google-genai`) |
| Embeddings | PubMedBERT via `sentence-transformers` |
| Scheduling | APScheduler |
| Observability | structlog + Prometheus + Grafana |
| Dashboard | Streamlit |
| IaC | Terraform (AWS ECS Fargate + RDS + ElastiCache) |
| CI/CD | GitHub Actions with OIDC authentication |

## Infrastructure & Deployment

The production stack runs on AWS, provisioned entirely via Terraform:

- **Compute** — Two ECS Fargate services: the FastAPI application and the Streamlit dashboard, both behind an Application Load Balancer with HTTPS termination via ACM.
- **Database** — RDS PostgreSQL 16 with the `pgvector` extension for embedding storage.
- **Cache / Queue** — ElastiCache Redis for job queuing and caching.
- **Secrets** — Sensitive configuration (database password, Gemini API key, NCBI API key) stored as KMS-encrypted SSM Parameter Store `SecureString` values, referenced by the ECS task definition via `secrets.valueFrom` — never stored as plaintext.

The CI/CD pipeline is split across two repositories. The application repository builds and pushes Docker images to ECR on every merge to `main`. The infrastructure repository handles ECS deploys via a manual `workflow_dispatch` trigger, pulling any nominated image tag. GitHub Actions authenticates to AWS via OIDC — no long-lived credentials are stored as secrets.

The live deployment is accessible at `https://medlit-demo.link`.
