---
title: 'Polymer Rheology'
description: Calculated rheological parameters of a fluid with suspended slender rods under a periodic external force, discovering the presence of an attractor that limits the achievable change in rheological properties.
publishDate: 'Jan 01 2019'
seo:
  image:
    src: '/portfolio/project-8.jpg'
    alt: Project preview
---

![Project preview](/portfolio/project-8.jpg)

## Background

Dynamic systems have been of scientific interest for over a century. The study of rheological parameters for objects suspended in fluid dates back to the 1900s, while the study of slender rods specifically began around the 1950s. Renewed interest in the subject has been driven by significant advances in polymer science and applications — polymer-suspended solutions are particularly attractive due to their ability to alter their rheological properties based on the orientation of the suspended macromolecules.

## Project Scope

To calculate the rheological parameters of a fluid with suspended slender rods subjected to a periodic external force.

## Methodology

- The orientation of the rods was derived as a function of time, and the dependence of key rheological parameters on rod orientation was established analytically.
- Two cases were studied:
  - **Case A:** All rods share the same initial orientation.
  - **Case B:** Rods have varying initial orientations (81 rods used, limited by computational constraints).
- The orientation function and rheological parameters for both cases were computed using the **adaptive fourth-order Runge-Kutta** method.

## Results

The simulations revealed the presence of an **attractor** in the system. This has a direct practical implication: in real-world applications of polymer solutions driven by a periodic external force, there exists a limiting number of forcing cycles beyond which no further change in rheological parameters can be induced. This places a fundamental bound on the degree of rheological tunability achievable through periodic forcing alone.
