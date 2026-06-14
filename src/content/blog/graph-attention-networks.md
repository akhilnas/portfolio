---
title: An Introduction to Graph Attention Networks
excerpt: Graph learning is increasingly relevant as a significant amount of real-world data can be modelled as graphs. This post explains how the Graph Attention Network (GAT) is constructed, step by step.
publishDate: 'Jan 3 2020'
tags:
  - Deep Learning
  - Machine Learning
  - Graph Neural Networks
---

> Originally published on [Medium](https://medium.com/@eakhil711/an-introduction-to-graph-attention-networks-d41ed52e5b1e).

Graph Learning is increasingly becoming more and more relevant as a significant amount of real-world data can be modelled as graphs.

The Graph Attention Network or **GAT** is a non-spectral learning method which utilizes the spatial information of the node directly for learning. This is in contrast to the spectral approach of the Graph Convolutional Network which mirrors the same basics as the Convolutional Neural Net.

In this article, I will explain how the GAT is constructed.

The basic building block of the GAT is the *Graph Attention Layer*. To explain it, an example graph is used, where $h_i$ is a feature vector of length $F$.

## Step 1: Linear Transformation

The first step performed by the Graph Attention Layer is to apply a linear transformation — a weighted matrix $W$ — to the feature vectors of the nodes.

## Step 2: Computation of Attention Coefficients

*Attention Coefficients* determine the relative importance of neighbouring features to each other. They are calculated using the formula:

$$e_{ij} = a(W\vec{h}_i, W\vec{h}_j)$$

Here $a$ is a function that we determine subject to the following restriction:

$$a : \mathbb{R}^{F'} \times \mathbb{R}^{F'} \to \mathbb{R}$$

where $i$ and $j$ are neighbouring nodes. We first calculate the self-attention coefficient and then compute attention coefficients with all of the neighbours.

## Step 3: Normalization of Attention Coefficients

Due to the varied structure of graphs, nodes can have a different number of neighbours. To have a common scaling across all neighbourhoods, the attention coefficients are normalized:

$$\alpha_{ij} = \frac{\exp(\text{LeakyReLU}(e_{ij}))}{\sum_{k \in N} \exp(\text{LeakyReLU}(e_{ik}))}$$

Here $N$ is the neighbourhood of node $i$.

## Step 4: Computation of Final Output Features

Now we compute the learned features of the nodes, where $\sigma$ is a non-linear transformation:

$$\vec{h}_i' = \sigma\left(\sum_{j \in N} \alpha_{ij} W \vec{h}_j\right)$$

## Step 5: Computation of Multiple Attention Mechanisms

To improve the stability of the learning process, multi-head attention is employed. We compute multiple different attention maps and finally aggregate all the learned representations:

$$\vec{h}_i' = \sigma\left(\frac{1}{K}\sum_{k=1}^{K}\sum_{j \in N} \alpha_{ij}^{k} W^{k} \vec{h}_j\right)$$

Here $K$ denotes the number of independent attention maps used.

---

This is my first Medium article and I hope you find it informative. I will update on the actual implementation of the network in Python in the next article.

## Reference

[1] P. Veličković, G. Cucurull, A. Casanova, A. Romero, P. Liò, Y. Bengio. *Graph Attention Networks*. In International Conference on Learning Representations, 2018.
