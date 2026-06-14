---
title: 'Seeing LLM Training in 3D — A GPU Cluster Parallelism Visualizer'
excerpt: An interactive 3D visualization of how a large language model is trained across a GPU cluster — watch model shards, data batches, gradients and network traffic move through the hardware, and build intuition for tensor, pipeline, and data parallelism all at once.
publishDate: 'Jun 14 2026'
isFeatured: true
tags:
  - Machine Learning
  - LLM
  - Visualization
seo:
  image:
    src: '/portfolio/gpu-cluster-visualizer.png'
    alt: A 3D server farm of glowing GPU slabs with data streaming along the network fabric
---

![GPU Cluster 3D Parallelism Visualizer](/portfolio/gpu-cluster-visualizer.png)

## [🚀 Launch the live demo →](https://akhilnas.github.io/gpu-cluster-visualizer/)

> Runs entirely in the browser — no sign-up, no backend. Best on a desktop with a WebGL-capable GPU.

## Overview

Distributed training is usually explained with dense block diagrams and bandwidth math.
It is hard to build intuition for what "tensor parallelism on NVLink, data parallelism over
InfiniBand" actually *means* when the only picture you have is a static slide.

The **GPU Cluster · 3D Parallelism Visualizer** turns that abstraction into something you
can watch. It renders a rack-and-node server farm where every GPU is a glowing slab, then
animates a single training step end to end: the model is split across chips, sub-batches of
data stream along the right cables, gradients flow back, and the cluster synchronizes — all
laid out on the hardware the way real systems do it. You can orbit the scene, scrub the
timeline, change the configuration, and watch the memory and network numbers recompute live.

The goal is **understanding**, not benchmarking — to make the moving parts of large-scale
LLM training legible to anyone trying to reason about them.

## The problem it addresses

Modern LLMs are trained across hundreds or thousands of GPUs using three kinds of
parallelism layered together:

- **Tensor parallelism** — a single layer's matrices are split across GPUs inside one node.
- **Pipeline parallelism** — different layers (stages) live on different nodes.
- **Data parallelism** — the whole model is replicated, and each replica trains on a
  different slice of the batch.

Each comes with its own memory footprint and its own network cost, and they interact in
ways that decide whether a run is fast, runs out of memory, or stalls waiting on the
network. The visualizer makes those trade-offs **visible** instead of theoretical.

## What you can explore

- **Pick a model and a GPU.** Choose from popular open models (Qwen3, Qwen2.5, Llama 3.1/3.2,
  Mistral, Mixtral, GPT-2/OPT), large frontier models (Llama-2 70B, GPT-3 175B, Llama 3.1 405B),
  and Mixture-of-Experts models (Mixtral, DeepSeek-V3, DeepSeek-R1). GPUs range from an
  RTX 4090 up to a B200 — or enter your own model/chip specs, saved in your browser and
  exportable as JSON.
- **Tune the parallelism.** Adjust tensor, pipeline, and data-parallel degrees and the
  cluster shape (racks × nodes × GPUs); the 3D layout and all the math update live.
- **Choose precision / quantization.** Switch between FP32, BF16, FP8, INT8, and INT4 and
  watch the memory picture change — including how weight-only quantization frees a frozen
  base model from gradients and optimizer state.
- **Read the numbers.** Per-GPU memory with a *fits / tight / out-of-memory* verdict,
  gradient-sync volume and time, and total cluster compute — all recomputed as you adjust.
- **Inspect the architecture.** See where each model's parameters live (attention vs. MLP
  vs. embeddings; GQA vs. MHA vs. MLA), and for MoE models the expert structure and
  active-vs-total parameter counts.
- **Open the compute graph.** View a GGML-style computation graph of one forward pass — one
  transformer block expanded, the rest collapsed — exportable as a Graphviz `.dot` file.
- **Watch the pipeline schedule.** A timeline view shows each stage's forward/backward work
  over time, making the idle "bubble" of pipeline parallelism visible.
- **Follow a shard.** Lock the camera onto a single sub-batch and ride along as it threads
  through the cluster.

## How a training step plays out

The animation walks through the full loop, one stage at a time:

1. **Shard placement** — the model's weights are split and loaded onto the GPUs that own them.
2. **Batch scatter** — the global batch is divided into sub-batches, one per model replica.
3. **Forward pass** — activations stream stage to stage through the pipeline.
4. **Backward pass** — gradients flow back the other way.
5. **All-reduce** — replicas exchange and average their gradients across the network.
6. **Optimizer step** — each GPU updates the parameters it owns, and the next step begins.

## What the simulation actually models

The visuals are driven by the real quantities, not decoration:

- **Traffic on the real fabric.** Activations, gradients, and weights travel as sized
  streams along actual links — slab size reflects bytes in flight, and a wire reddens as it
  saturates. Fat **NVLink** inside a node versus thin **InfiniBand** between nodes makes it
  obvious why the gradient all-reduce is the expensive part.
- **Live GPU memory.** Every chip shows a stacked VRAM bar — weights · optimizer · gradients ·
  activations — that fills and drains through the step, so you can watch activation memory
  grow during the forward pass and gradients appear during backprop.
- **All three parallelism dimensions together,** mapped onto the hardware the way real
  clusters lay them out.

## Technology stack

- **React 19** + **TypeScript**, built with **Vite**
- **react-three-fiber** and **three.js** for the real-time 3D scene, with **drei** helpers
  and **postprocessing** for bloom/effects
- **Zustand** for simulation and UI state
- **dagre** for laying out the computation graph
- Pure client-side: model/GPU specs and the memory & networking math run in the browser;
  custom entries persist via `localStorage`. Deployed as a static site on GitHub Pages.

## Background

This 3D version grew out of two earlier 2D HTML prototypes that explored the same ideas at
a smaller scale. It was built as a focused learning-and-teaching tool for distributed
training — for engineers new to the topic, students, and anyone who wants to *see* what
training an LLM at scale looks like in motion.

**[🚀 Launch the live demo →](https://akhilnas.github.io/gpu-cluster-visualizer/)**
