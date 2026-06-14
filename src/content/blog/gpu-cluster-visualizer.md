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

- **Traffic on the real fabric.** Activations, gradients, and weights travel as sized
  streams along actual links — slab size reflects bytes in flight, and a wire reddens as it
  saturates. Fat **NVLink** inside a node versus thin **InfiniBand** between nodes makes it
  obvious why the gradient all-reduce is the expensive part.
- **Live GPU memory.** Every chip shows a stacked VRAM bar — weights · optimizer · gradients ·
  activations — that fills and drains through the step, so you can watch activation memory
  grow during the forward pass and gradients appear during backprop.
- **All three parallelism dimensions together,** mapped onto the hardware the way real
  clusters lay them out.

## The memory math: how much lands on each GPU

The per-GPU VRAM bar isn't hand-waved — it's the result of a short derivation. Here is the
whole thing, building up from a single parameter to the number the *fits / tight /
out-of-memory* verdict is based on.

### Symbols

| Symbol | Meaning |
|---|---|
| $P$ | total model parameters |
| $L$ | number of transformer layers |
| $t$ | tensor-parallel degree (TP) |
| $p$ | pipeline-parallel degree (PP) |
| $d$ | data-parallel degree (DP) |
| $b_q$ | bytes per weight element, set by the **quantization** — FP32 $=4$, BF16/FP16 $=2$, FP8/INT8 $=1$, INT4 $=0.5$ |
| $b_g$ | bytes per gradient element |
| $b_o$ | bytes per parameter of optimizer state |
| $b,\,s,\,h,\,a$ | microbatch size, sequence length, hidden size, attention heads |
| $m$ | microbatches kept "in flight" by the pipeline |

### 1. Cost of one parameter

Three things scale with the parameter count: the **weights**, their **gradients**, and the
**optimizer state**. With mixed-precision Adam the optimizer keeps an fp32 master weight plus
the two moment estimates, so

$$
b_o = \underbrace{4}_{\text{fp32 master}} + \underbrace{4}_{\text{1st moment } m} + \underbrace{4}_{\text{2nd moment } v} = 12 \ \text{bytes/param},
$$

and the model-state cost per parameter is

$$
c_{\text{model}} = \underbrace{b_q}_{\text{weights}} + \underbrace{b_g}_{\text{gradients}} + \underbrace{b_o}_{\text{optimizer}}.
$$

In the common BF16 + Adam recipe ($b_q = 2$, $b_g = 2$, $b_o = 12$) that is the familiar
**16 bytes/param**. Notice that dropping the weights to FP8 ($b_q = 1$) only trims the weight
term — the 12-byte optimizer state, kept in fp32 for numerical stability, is what actually
dominates a training run.

**Weight-only quantization** is the special case $b_g = b_o = 0$ (a frozen base model has no
gradients and no optimizer slots). Then $c_{\text{model}} = b_q$ alone — which is why a 4-bit
frozen model is roughly **32×** lighter than the same model trained in fp32 Adam
($0.5$ vs $16$).

### 2. Sharding the model state — TP × PP

Tensor parallelism splits every weight matrix across $t$ GPUs; pipeline parallelism puts a
different $1/p$ slice of the layers on each stage. Together they partition the model state
across a model-parallel group of $t \cdot p$ GPUs:

$$
M_{\text{model}}^{\text{GPU}} = \frac{P \,(b_q + b_g + b_o)}{t \cdot p}.
$$

(The division is exact for the big matmul weights; small replicated tensors — LayerNorm
scales, embeddings — add a few percent on top.)

### 3. The factor that's easy to miss — data parallelism

Vanilla data parallelism **replicates** the whole model on each of the $d$ replicas, so $d$
does *not* divide the per-GPU figure — it scales the cluster, not the chip. The exception is
**ZeRO / FSDP**, which additionally shards the optimizer (stage 1), the gradients (stage 2),
and even the weights (stage 3) across the $d$ replicas. Each term that a given ZeRO stage
shards picks up an extra $\div\, d$:

$$
M_{\text{model}}^{\text{GPU}} = \frac{P}{t\,p}\left( \frac{b_q}{z_3} + \frac{b_g}{z_2} + \frac{b_o}{z_1} \right), \qquad z_i = \begin{cases} d & \text{ZeRO stage } i \text{ on} \\ 1 & \text{otherwise} \end{cases}
$$

### 4. The other factor — activations

Weights are only half the story. The forward pass stores activations for the backward pass,
and at large batch or sequence length this term often **dominates**. Per transformer layer,
per microbatch, the activation memory (Megatron's estimate, no recomputation) is roughly

$$
A_{\text{layer}} \approx s\,b\,h\left( 34 + \underbrace{\frac{5\,a\,s}{h}}_{\text{attention scores } (\propto\, s^2)} \right) \ \text{bytes}.
$$

Activations partition *differently* from weights:

- Pipeline parallelism leaves each stage only $L/p$ layers $\to$ factor $L/p$.
- Tensor parallelism splits the activations inside a layer $\to \div\, t$.
- 1F1B scheduling keeps up to $m$ microbatches alive on the busiest (first) stage so their
  backward pass can run $\to \times\, m$, with $m \approx p$ in the worst case.

$$
M_{\text{act}}^{\text{GPU}} \approx \frac{(L/p)\,A_{\text{layer}}\,m}{t}.
$$

Gradient checkpointing (activation recomputation) trades compute for memory and collapses
$A_{\text{layer}}$ toward $s\,b\,h$ per layer.

### 5. Putting it together

$$
M_{\text{GPU}} = \underbrace{\frac{P\,(b_q + b_g + b_o)}{t \cdot p}}_{\text{weights · gradients · optimizer}} \;+\; \underbrace{\frac{(L/p)\,A_{\text{layer}}\,m}{t}}_{\text{activations}} \;+\; \underbrace{M_{\text{overhead}}}_{\text{context, buffers, frag.}}
$$

That sum is exactly what the per-GPU VRAM bar stacks up, and the verdict is just
$M_{\text{GPU}}$ compared against the chosen chip's capacity.

### A worked example

Llama-3 **70B** in BF16 + Adam → $c_{\text{model}} = 16$ B/param → **1.12 TB** of model state
in total.

- On a single 80 GB GPU: hopeless ($1.12\ \text{TB} \gg 80\ \text{GB}$).
- With **TP $= 8$, PP $= 4$** ($t \cdot p = 32$): $1.12\ \text{TB} / 32 \approx 35\ \text{GB/GPU}$
  of model state — now it fits on an 80 GB chip, with the remaining ~45 GB left for
  activations, comm buffers, and the inevitable fragmentation. That is the difference between
  a run that trains and one that OOMs on step 1, and it's the trade-off the visualizer lets
  you feel by dragging a slider.

## Technology stack

- **React 19** + **TypeScript**, built with **Vite**
- **react-three-fiber** and **three.js** for the real-time 3D scene, with **drei** helpers
  and **postprocessing** for bloom/effects
- **Zustand** for simulation and UI state
- **dagre** for laying out the computation graph
- Pure client-side: model/GPU specs and the memory & networking math run in the browser;
  custom entries persist via `localStorage`. Deployed as a static site on GitHub Pages.
- Built with assistance from Claude Code.

## Background

This 3D version grew out of two earlier 2D HTML prototypes that explored the same ideas at
a smaller scale. It was built as a focused learning-and-teaching tool for distributed
training — for engineers new to the topic, students, and anyone who wants to *see* what
training an LLM at scale looks like in motion.

**[🚀 Launch the live demo →](https://akhilnas.github.io/gpu-cluster-visualizer/)**
