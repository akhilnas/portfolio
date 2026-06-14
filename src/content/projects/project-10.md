---
title: 'Kestrel: Real-Time Fraud Detection Pipeline'
description: Built a real-time fraud detection system that scores a high-throughput synthetic transaction stream end to end — Kafka ingestion, Spark/Scala streaming feature engineering, distributed Ray + MLflow training, a fail-open FastAPI scorer, and a closed continuous-learning loop, all observable through Prometheus and Grafana.
publishDate: 'Jun 10 2026'
isFeatured: true
seo:
  image:
    src: '/portfolio/project-10.jpg'
    alt: Project preview
---

![Project preview](/portfolio/project-10.jpg)

## Background

Card fraud is a needle-in-a-haystack problem at firehose speed: a payments stream carries hundreds to thousands of transactions per second, the vast majority legitimate, and a decision to approve, review, or block has to be made in milliseconds — before the labelled outcome (a chargeback) even exists. The hard parts are not any single model, but the system around it: keeping online and offline features consistent, scoring without train/serve skew, and continuously retraining as fraud patterns shift.

> **Why "Kestrel"?** A kestrel is a falcon that hovers dead-still over a moving field, scanning the flow beneath it, then strikes the instant it spots prey. That is the system's shape: hold a steady watch over a high-throughput transaction stream, score every event in real time, and act decisively the moment one looks fraudulent.

## Project Scope

To design and build a complete, production-shaped real-time fraud detection pipeline — from a synthetic transaction generator through streaming feature engineering, distributed model training, low-latency inference, and a closed continuous-learning loop — with full observability and a one-command `docker compose` stack.

The project was built as a portfolio demonstration of end-to-end streaming ML system engineering, spanning data infrastructure, distributed training, production serving, and MLOps.

## Architecture

The system is a five-phase pipeline where each stage hands off through durable infrastructure (Kafka topics, Redis, Parquet, an MLflow registry) rather than direct coupling — so each component can be developed, tested, and scaled independently, and the pipeline resumes cleanly after failures.

### The Five Phases

1. **Transaction Stream Generator (Python)** — Publishes 500–2000 synthetic transactions/sec to a Kafka topic over a stable pool of ~10k users and ~1k merchants, injecting five realistic fraud campaigns (velocity attack, geographic impossibility, amount anomaly, card testing, off-hours) at a ~1% baseline. Buffers under backpressure and exposes Prometheus metrics.

2. **Streaming Feature Engineering (Scala / Spark)** — A Spark Structured Streaming job that keys the stream by user and uses `flatMapGroupsWithState` to emit one point-lookup-shaped feature row per transaction carrying every horizon — velocity counts, amount aggregates, distinct merchant/category/location counts, and recency. Fans out to **Redis** (online, latest-per-user) and **Parquet** (offline training set), with bounded per-user state and event-time eviction.

3. **Distributed Model Training (Ray + MLflow)** — Trains an XGBoost classifier on a **chronological** split (never random — fraud is time-dependent), sweeps hyperparameters with Ray Tune (ASHA early-stopping) optimising **AUC-PR** for the ~1% positive rate, tracks every trial in MLflow, and gates promotion from `@challenger` to `@champion` on a frozen golden validation set.

4. **Real-Time Inference Service (FastAPI)** — Scores transactions against `fraud_detector@champion`, assembling the exact 13-feature vector from the shared feature contract so there is **no train/serve skew**. Fail-open by design (returns `review` rather than a 500 on Redis/model errors), with hot model reloading and Prometheus metrics.

5. **Observability & Continuous-Learning Loop** — Closes the loop: a drift detector (KL / PSI vs. the training baseline), an active-learning sampler, a chargeback simulator emitting delayed ground truth, and a human label UI feed a leak-free `predictions ⨝ labels` retraining join that fires a new training run when drift and label-count conditions are met.

### Avoiding Train/Serve Skew

A shared `kestrel_contract` package defines the feature vector once, used identically at training and inference time. Features that cannot be reproduced offline without skew (e.g. last-location distance, 30-day z-scores) are deliberately excluded from the v0 model and re-enter only through the prediction-join retraining mode — where the exact scored vector is carried on each `predictions` event.

## Key Capabilities

- Synthetic transaction stream with five injected fraud campaigns at configurable rate
- Stateful streaming feature engineering with online (Redis) and offline (Parquet) sinks
- Chronological train/validation splitting to prevent future leakage
- Ray Tune hyperparameter sweep optimising AUC-PR for extreme class imbalance
- MLflow model registry with `@challenger` → `@champion` promotion gating
- Low-latency FastAPI scorer with skew-free feature assembly and hot model reload
- Fail-open inference (degrades to `review` rather than erroring)
- Drift detection (KL divergence + PSI) against a self-describing training baseline
- Active-learning sampler + human label UI + chargeback-based ground truth
- Leak-free `predictions ⨝ labels` retraining join with automated retrain triggers
- Full Prometheus + Grafana observability across every service

## Tech Stack

| Layer | Technology |
|---|---|
| Ingestion | Apache Kafka (KRaft) |
| Stream Processing | Spark Structured Streaming (Scala 2.12 / Spark 3.5) |
| Online Feature Store | Redis |
| Offline Feature Store | Parquet |
| Model | XGBoost |
| Training | Ray Train + Ray Tune (ASHA) |
| Experiment Tracking | MLflow (alias-based registry) |
| Inference | FastAPI + Pydantic |
| Observability | Prometheus + Grafana |
| Orchestration | Docker Compose |

## Infrastructure & Deployment

The entire stack — Kafka, Redis, MLflow, the five Python services, the Scala streaming job, Prometheus, and Grafana — runs on one Docker Compose network with healthchecks and dependency ordering:

```bash
cp .env.example .env
make up            # start everything in dependency order
make train         # train the v0 model -> registers @champion + drift baseline
make ps            # watch health
```

Training and retraining run on demand behind a `train` compose profile rather than as long-running services. `make load-test` runs a Locust SLA check, and operating procedures and loop failure modes are documented in a runbook.

## Source Code

The full design plan, per-phase documentation, and runbook live in the repository.
