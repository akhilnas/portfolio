---
title: 'Semiconductor Device Simulator Development'
description: Implemented a Density-Gradient solver for a 1D FinFET with dual gate contacts and demonstrated the need for multiple bias- and width-dependent fitting factors over the conventional single-factor approach.
publishDate: 'Jan 01 2020'
seo:
  image:
    src: '/portfolio/project-6.jpg'
    alt: Project preview
---

![Project preview](/portfolio/project-6.jpg)

## Background

Device engineers use the Density-Gradient method to calculate current in semiconductor devices, as the required quantities can be determined via parametric equations — far more tractable than solving the Schrödinger-Poisson equations simultaneously at every step. Up until now, a single fitting factor was applied uniformly across all devices, regardless of material, fin width, or gate bias.

## Project Scope

To implement a solver based on the Density-Gradient method for a one-dimensional FinFET device with dual gate contacts, and to investigate whether a single fitting factor is sufficient across varying operating conditions.

## Methodology

1. **Schrödinger-Poisson Solver** — A self-consistent Schrödinger-Poisson solver was built first to serve as the reference standard. Its correctness was verified against analytically solvable test cases.
2. **Density-Gradient Solver** — A Density-Gradient solver was then constructed and compared to the Schrödinger-Poisson solution using the non-linear least squares method to extract fitting factors.
3. **Bias and Width Sweep** — Simulations were run across a range of gate biases and fin widths, revealing that the optimal fitting factor varies with both parameters rather than being a single constant.
4. **Ab Initio Validation** — To further confirm the findings, the Density-Gradient solution was benchmarked against Density Functional Theory (DFT / ab initio) calculations, which were themselves cross-checked against the Schrödinger-Poisson solver to confirm consistent behaviour.
5. **Parametric Model** — A large number of computational simulations were performed and a graph of fitting factors was constructed as a function of gate bias and fin width, forming the basis for a parametric model.

## Results

The simulations firmly established that a single fitting factor is insufficient across different gate biases, fin widths, and materials. A parametric model was developed that accepts gate bias and fin width as inputs and returns an appropriate fitting factor, enabling more accurate and physically consistent Density-Gradient simulations.
