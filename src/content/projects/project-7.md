---
title: 'Development of Equations for Rarefied Gas Flow'
description: Verified a novel set of Stable Burnett Equations for rarefied gas flows derived from non-equilibrium thermodynamic principles, showing agreement with established analytical and published solutions.
publishDate: 'Jun 01 2019'
seo:
  image:
    src: '/portfolio/project-7.jpg'
    alt: Project preview
---

![Project preview](/portfolio/project-7.jpg)

## Background

The problem of flow in a microchannel is not yet fully understood, and significant effort has gone into describing the phenomena by deriving equations from the Boltzmann equations. A set of Burnett-order equations was developed that accounts for non-equilibrium thermodynamic effects (governed by Onsager's reciprocity principle and the H-theorem), while requiring the same number of boundary conditions as the conventional Navier-Stokes equations. These equations are additionally unconditionally stable, and their phase density function satisfies both the collision invariance property and the linearised Boltzmann equation.

## Project Scope

To verify the Stable Burnett Equations for rarefied gas flows derived from non-equilibrium thermodynamic considerations.

## Methodology

- The derived equations were solved analytically for canonical cases: **microchannel flow** and **Couette flow**.
- Where analytical solutions to the PDEs were not tractable, computational methods were employed.
- Perturbation theory was applied, using the ratio of channel height to length (ε) as the small parameter; higher-order ε terms were neglected and appropriate boundary conditions applied.
- The gas was treated as ideal — a valid assumption under rarefied flow conditions.
- The resulting coupled, variable-coefficient PDEs were solved computationally.

## Results

The analytical solution for microchannel flow was compared against Arkilic's published work, *"Gaseous Slip Flow in Long Microchannels"*, and found to be in close agreement. The Couette flow solution was also verified to match physically intuitive expectations, providing further confidence in the correctness of the derived equations.
