---
title: 'Procedural Pattern Generator'
excerpt: 'A procedural pattern generating program that receives user inputs to build a randomly generated pattern.'
coverImage: 'pattern-generation/pattern2'
date: '2023-03-28T05:35:07.322Z'
live: '/pattern-gen-1/'
author:
  name: J.A. Covert
  picture: assets/james_profile_pic.png
ogImage:
  url: 'pattern-generation/patgen1'
images: [
  {
    name: First Pattern,
    picture: 'pattern-generation/pattern2'
  },
  {
    name: Second Pattern,
    picture: 'pattern-generation/pattern1_cc3ntw'
  },
    {
    name: Third Pattern,
    picture: 'pattern-generation/pattern3'
  },
  {
    name: Forth Pattern,
    picture: 'pattern-generation/pattern4_square'
  },
  {
    name: Fifth Pattern,
    picture: 'pattern-generation/pattern5_Landscape'
  }
]
repo: https://github.com/XcovertX/erazart/blob/main/portfolio/pattern-gen-core/generative-patterns.tsx
---

## Pattern Generating Algorithm

### Inspiration
This snippet of code started as an attempt to recreate the work of Seohyo seen here: 

[Seohyo-230706](https://www.instagram.com/reel/CuW8W-HuUUU/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==)

As per usual, the project evolved beyond the inspiration, however, I think it's important to give credit where credit is due! Seohyo's generative designs are fascinating and certainly worth exploring. 

### Controls

1. Stroke Weight - for changing the line thickness used
2. Row / Column Count - The canvas is divided into a grid of rows and columns. These two controls are used for changing the number of rows and columns the canvas is divided up into (min: .5 max: 30)
3. Minimum / Maximum Part Count - each tile on the grid is drawn from a composite of rudimentary parts. These controls allow for the user to select a minimum and maximum part count which, in turn, will be used as parameters to randomly select the number of rudimentary parts used for each tile. If the user wants to force a given part count, the user should set the min and max to the same number. (min: 0 max: 10)
4. Run - generates a new pattern using the selected parameters

### Code Explanation

On mount, the GridPattern function (main driver function) sets the initial state of program for the controls listed above. Additionally, the code initializes a P5 instance and establishes a new canvas with the provided initial state. The GenerateCarts function (called carts because they can be animated to move, however, for this demo, carts are synonymous with tiles) is called which generates a 2D array of randomly generated tiles. Each tile is comprised of a collection of rudimentary parts, a color and coordinates; all selected in the GenerateCarts function. Once all tiles are formed, they are iterated over by the DrawCarts function. Each part within each cart is likewise iterated over and drawn to the canvas.
