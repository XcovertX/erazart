---
title: 'Differential Growth Algorithm (Javascript)'
excerpt: 'A differential growth algorithm I wrote that simulates space-fillings, organic growth structurs seen in nature such as coral and other sealife.'
coverImage: 'differential-growth/difgrow-1.png'
date: '2020-03-16T05:35:07.322Z'
live: '/dif-grow-1/'
author:
  name: J.A. Covert
  picture: assets/james_profile_pic.png
ogImage:
  url: 'differential-growth/difgrow-1.png'
images: []
repo: https://github.com/XcovertX/erazart/tree/main/portfolio/differential-growth-core/demo-1
---

## Differential Growth Algorithm

### Inspiration
This snippet of code started as an attempt to recreate the work of polyhop seen here: 

[polyhop differential growth](https://www.instagram.com/p/CTLHdApnY7M/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==)

As per usual, the project evolved beyond the inspiration, however, I think it's important to give credit where credit is due! polyhop's generative designs are fascinating and certainly worth exploring. 

### Code Explanation

The code comprises of two main structures: nodes and paths. A node is a point on the canvas and a path is a collection of nodes. The algorithm works iteratively with each cycle applying a number of forces on the collection of nodes of a path then redrawing the path to the canvas. 

## Forces
### Repultion Force
Each iteration, the algorithm locates all neighboring nodes that are within the user-defined distance (repultion radius). This is a resource demanding process so I used a data structure that stores the node locations in a searchable poximity tree. I then used a KNN (k-Nearest Neighbors) algorithm to allow nodes to quickly locate their closest neighbors. The force repels away from the node applying the force.
### Attraction Force
The attracting force is then applied to the node's two direct on-path neighbors, pulling the toward the applying node.
### Alignment Force
The alignment force removes nodes where thew path angle exceeds a user-defined limit (alighnment force). This straightens out the path, making it apear 'smoother'.
### Brownian Force
Lastly, the brownian force is applied. This is a randomly generated force to push nodes in any direction which makes them look as tho the path is alive...

### Controls

1. Run - executes the differential algorithm on the path
2. Restart - restarts the differential algorithm a new randomly generated path
3. Min Node Distance - minimum distance can be from a neighboring node before being deleted
4. max Node Distance - maximum distance from a neighboring node before a new node is inserted inbetween the node and its neighbor
5. Repultion Force - the repelling force a node applies to its spatially closest neighboring nodes
6. Attraction Force - the attracting force a node applies to its two direct on-path neighbors
7. Alignment Force - the force applied to any sharp angle on a path to straigten out
8. Brownian Force - random generated force to push nodes in any direction, creating a vibrating look
9. Stroke Color - the color of the path in HSB(360, 360, 360,360)
11. Background Color - the color of the background in HSB(360, 360, 360,360)
12. Draw Nodes - displays all nodes on the path
13. Show Bounds - shows the path's bounding walls
14. Fill Mode - fills the enlosed path
15. Trace Mode - does not erase the canvas before each redraw, persisting previous paths to the canvas
16. Close Path - closes the ends of the path
17. Debug Mode - colors the path red to violet to detect any bugs