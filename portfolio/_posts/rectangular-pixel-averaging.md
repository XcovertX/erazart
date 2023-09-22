---
title: 'Rectangle Pixel Averaging'
excerpt: 'An algorithm for recursively dividing a provided image into rectangles and averaging the pixels of each rectangle.'
coverImage: 'rectangular-pixels/rectangle4'
date: '2020-03-16T05:35:07.322Z'
live: ''
author:
  name: J.A. Covert
  picture: assets/james_gray.jpg
ogImage:
  url: 'rectangular-pixels/rectangle-mapping-6_mjf5ti'
images: [
  {
    name: triangle1,
    picture: rectangular-pixels/rectangle1
  },
  {
    name: triangle2,
    picture: rectangular-pixels/rectangle2
  },
  {
    name: triangle3,
    picture: rectangular-pixels/rectangle3
  },
]
repo: 'https://github.com/XcovertX/Art-Gen/blob/main/src/clj/sketch/divider.clj'
---
## Rectangle Pixel Mapping
### Code Explanation
Presented below are sample outputs produced by an image processing tool developed in Clojure. This tool employs a recursive approach to partition the canvas into rectangles, with the depth of subdivision controlled by user-defined parameters. Each function call incorporates a stochastic element, introducing the possibility of the division process terminating before reaching the specified depth.

Upon reaching the base level of subdivision, the algorithm systematically places a node at each rectangle's vertex, meticulously recording connectivity information to adjacent vertices. This approach facilitates the implementation of specialized search algorithms for efficient rectangle retrieval.

Following the conclusion of the division process, the algorithm systematically traverses each individual rectangle, aggregating all pixels contained within, calculating their average color values, and subsequently filling the rectangle with the resulting color.
