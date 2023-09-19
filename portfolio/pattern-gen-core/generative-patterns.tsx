import React, { useContext, useEffect, useRef, useState } from "react";
import { type Sketch, SketchProps, P5CanvasInstance, P5WrapperClassName } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import type CartType from "../interfaces/cart";
import type PartType from "../interfaces/part";
import type PositionType from "../interfaces/position";
import type Color from "../interfaces/color";
import { randomInt } from "crypto";
import { CustomSlider } from "../components/slider";
import { Toggle } from "../components/toggle";
import { ThemeContext } from "../context/context";



type MySketchProps = SketchProps & {
    grid: boolean;
    canvasWidth: number;
    canvasHeight: number;
    rows: number;
    cols: number;
    minPartCount: number;
    maxPartCount: number;
    run: boolean;
    restart: boolean;
    strokeWeight: number;
};

//draws grid to the screen
function drawGrid(p5: P5CanvasInstance<MySketchProps>, w:number, h: number) {
    
    p5.push();
    p5.strokeWeight(1);
    p5.stroke(0, 360, 360);

    const xCount = window.innerWidth  / w;
    const yCount = window.innerHeight / h;

    for (let index = 0; index < xCount; index++) {
        let x = index * w;
        p5.line(x, 0, x, window.innerHeight);
    }
    for (let index = 0; index < yCount; index++) {
        let y = index * h;
        p5.line(0, y, window.innerWidth, y);
    }

    p5.pop();
}

function drawX(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = cartPosition.x + halfWidth;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.line(x1, y1, x2, y2);
    p5.line(x1, y2, x2, y1);
    p5.pop();
}

function drawDiamond(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/3;
    const halfHeight= part.height * 1/3;
    const x1 = cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(x2, yHalf, xHalf, y2);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(x1, yHalf, xHalf, y1);
    p5.pop();
}

function drawSmallDiamond(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/9;
    const halfHeight= part.height * 1/9;
    const x1 = cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(x2, yHalf, xHalf, y2);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(x1, yHalf, xHalf, y1);
    p5.pop();
}

function drawDiagLeft(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 2;
    const halfHeight= part.height * 2;
    const x1 = cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = cartPosition.x + halfWidth;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.line(x1, y1, x2, y2);
    p5.pop();
}

function drawDiagRight(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 2;
    const halfHeight= part.height * 2;
    const x1 = cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = cartPosition.x + halfWidth;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.line(x1, y2, x2, y1);
    p5.pop();
}

function drawDiagCleft(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.line(xHalf, y1, x2, y1 - halfHeight);
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(xHalf, y2, x1, y2 + halfHeight);
    p5.pop();
}



function drawLargeBox(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = cartPosition.x + halfWidth;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.line(x1, y1, x2, y1);
    p5.line(x2, y1, x2, y2);
    p5.line(x2, y2, x1, y2);
    p5.line(x1, y2, x1, y1);
    p5.pop();
}

function drawCross(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.line(xHalf, y1, xHalf, y2);
    p5.line(x1, yHalf, x2, yHalf);
    p5.pop();
}

function drawSmallBox(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterWidth = part.width * 1/6;
    const quarterHeight= part.height * 1/6;
    const x1 = cartPosition.x - quarterWidth;
    const y1 = cartPosition.y - quarterHeight;
    const y2 = cartPosition.y + quarterHeight;
    const x2 = cartPosition.x + quarterWidth;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.line(x1, y1, x2, y1);
    p5.line(x2, y1, x2, y2);
    p5.line(x2, y2, x1, y2);
    p5.line(x1, y2, x1, y1);
    p5.pop();
}

function drawTripleLinesVertical(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const eighthWidth = part.width   * 1/8;
    const quarterHeight= part.height * 1/4;
    const x1 = cartPosition.x - eighthWidth;
    const x2 = cartPosition.x;
    const x3 = cartPosition.x + eighthWidth;
    const y1 = cartPosition.y - quarterHeight;
    const y2 = cartPosition.y + quarterHeight;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.line(x1, y1, x1, y2);
    p5.line(x2, y1, x2, y2);
    p5.line(x3, y1, x3, y2);
    p5.pop();
}

function drawTripleLinesHorizontal(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const eighthHeight = part.height * 1/8;
    const quarterWidth = part.width  * 1/4;
    const y1 = cartPosition.y - eighthHeight;
    const y2 = cartPosition.y;
    const y3 = cartPosition.y + eighthHeight;
    const x1 = cartPosition.x - quarterWidth;
    const x2 = cartPosition.x + quarterWidth;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.line(x1, y1, x2, y1);
    p5.line(x1, y2, x2, y2);
    p5.line(x1, y3, x2, y3);
    p5.pop();
}

function drawDot(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse((cartPosition.x), cartPosition.y, (part.width * 1/32), (part.width * 1/32));
    p5.pop();
}

function drawXDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height * 1/3;
    const quarterWidth  = part.width  * 1/2;
    const y1 = cartPosition.y  - quarterHeight;
    const y2 = cartPosition.y  + quarterHeight;
    const x1 = cartPosition.x - quarterWidth;
    const x2 = cartPosition.x + quarterWidth;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x1, y1, (part.width * 1/64), (part.width * 1/64));
    p5.ellipse(x1, y2, (part.width * 1/64), (part.width * 1/64));
    p5.ellipse(x2, y1, (part.width * 1/64), (part.width * 1/64));
    p5.ellipse(x2, y2, (part.width * 1/64), (part.width * 1/64));
    p5.pop();
}

function drawDoubleVerticalDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height * 1/6;
    const x = cartPosition.x;
    const y1 = cartPosition.y  - quarterHeight*2;
    const y2 = cartPosition.y  - quarterHeight*2;
    const y3 = cartPosition.y  + quarterHeight*3;
    const y4 = cartPosition.y  + quarterHeight*3;
    const rand: number = Math.random();
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x, y1, (part.width * 1/32), (part.width * 1/32));
    p5.ellipse(x, y2, (part.width * 1/32), (part.width * 1/32));
    p5.pop();
}

function drawDoubleHorizontalDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterWidth  = part.width  * 1/6;
    const x1 = cartPosition.x - quarterWidth;
    const x2 = cartPosition.x + quarterWidth;
    const y = cartPosition.y;
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x1, y, (part.width * 1/64), (part.width * 1/64));
    p5.ellipse(x2, y, (part.width * 1/64), (part.width * 1/64));
    p5.pop();
}

function drawSmallCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.noFill();
    p5.ellipse((cartPosition.x), 
                cartPosition.y, 
               (part.width * 1/4), 
               (part.width * 1/4))
    p5.pop();
}

function drawLargeCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.noFill();
    p5.ellipse(cartPosition.x, 
                cartPosition.y, 
               (part.width * 1/3), 
               (part.width * 1/3))
    p5.pop();
}

function drawExtraLargeCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.noFill();
    p5.ellipse(cartPosition.x, 
                cartPosition.y, 
               (part.width * 1.25), 
               (part.width * 1.25))
    p5.pop();
}

function drawSuperExtraLargeCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.push();
    p5.stroke(part.color.h, part.color.s, part.color.b);
    p5.noFill();
    p5.ellipse(cartPosition.x, 
                cartPosition.y, 
               (part.width * 3), 
               (part.width * 3))
    p5.pop();
}

function drawSmallBoxCross(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    drawSmallBox(p5, cartPosition, part);
    drawCross(p5, cartPosition, part);
}

function drawCircleDot(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    drawSmallCircle(p5, cartPosition, part);
    drawDot(p5, cartPosition, part);
}

function drawSmallBoxX(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    drawSmallBox(p5, cartPosition, part);
    drawX(p5, cartPosition, part);
}

function drawLargeBoxX(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    drawLargeBox(p5, cartPosition, part);
    drawX(p5, cartPosition, part);
}

function drawCrossDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    drawDoubleVerticalDots(p5, cartPosition, part);
    drawDoubleHorizontalDots(p5, cartPosition, part);
}

function drawCarts(p5: P5CanvasInstance<MySketchProps>, props){

   return () => {
        const { carts, grid } = props;
        // p5.clear();
        p5.background(0, 360, 30)
        // if (grid) {
        //     drawGrid(p5, carts[0].width, carts[0].height);
        // }
        for (let i = 0; i < carts.length; i++) {
            for (let j = 0; j < carts[i].length; j++) {
                var c: CartType = carts[i][j];
            
                for (let k = 0; k < c.parts.length; k++) {
                    var p = c.parts[k];
                    
                    switch (p.shape) {
                        case "X":                      drawX(p5, c.position, p);
                            break;
                        case "DIAMOND":                drawDiamond(p5, c.position, p);
                            break;
                        case "DIAG-LEFT":              drawDiagLeft(p5, c.position, p);
                            break;
                        case "DIAG-RIGHT":             drawDiagRight(p5, c.position, p);
                            break;
                        case "BOX-SM":                 drawSmallBox(p5, c.position, p);
                            break;
                        case "BOX-LG":                 drawLargeBox(p5, c.position, p);
                            break;
                        case "BOX-SM-X":               drawSmallBoxX(p5, c.position, p);
                            break;
                        case "BOX-LG-X":               drawLargeBoxX(p5, c.position, p);
                            break;
                        case "CIRCLE-SM":              drawSmallCircle(p5, c.position, p);
                            break;
                        case "CIRCLE-DOT":             drawCircleDot(p5, c.position, p);
                            break;
                        case "CIRCLE-LG":              drawLargeCircle(p5, c.position, p);
                            break;
                        case "DOT":                    drawDot(p5, c.position, p);
                            break;
                        case "CROSS":                  drawCross(p5, c.position, p);
                            break;
                        case "BOX-CROSS":              drawSmallBoxCross(p5, c.position, p);
                            break;
                        case "DOUBLE-DOT-HORIZONTAL":  drawDoubleHorizontalDots(p5, c.position, p);
                            break;
                        case "DOUBLE-DOT-VERTICAL":    drawDoubleVerticalDots(p5, c.position, p);
                            break;
                        case "QUAD-DOT-CROSS":         drawCrossDots(p5, c.position, p);
                            break;
                        case "QUAD-DOT-X":             drawXDots(p5, c.position, p);
                            break;
                        case "THREE-LINES-VERTICAL":   drawTripleLinesVertical(p5, c.position, p);
                            break;
                        case "THREE-LINES-HORIZONTAL": drawTripleLinesHorizontal(p5, c.position, p);
                            break;
                        case "SMALL-DIAMOND":          drawSmallDiamond(p5, c.position, p);
                            break;
                        case "DIAG-CLEFT":             drawDiagCleft(p5, c.position, p);
                            break;
                        case "EXTRA-LG-CIRCLE":        drawExtraLargeCircle(p5, c.position, p);
                            break;
                        case "SUPER-EXTRA-LG-CIRCLE":  drawSuperExtraLargeCircle(p5, c.position, p);
                            break;
                        default: drawX(p5, c.position, p);
                    }
                    
                }
            }
        }
    }
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPosition(minW: number, maxW: number, minH: number, maxH: number, w: number, h: number) {
    const colCount = maxW / w;
    const rowCount = maxH / h;
    const x = getRandomInt(minW, rowCount) * w;
    const y = getRandomInt(minH, colCount) * h;
    var p: PositionType = {
        x: x,
        y: y
    }
    return p;
}

function getRandomDirection() {
    const dir = getRandomInt(0, 7);
    switch(dir) {
        case 0:  return "NORTH";
        case 1:  return "EAST";
        // case 2:  return "EAST";
        // case 3:  return "EAST";
        default: return "EAST"
    }
}

function getRandomColor() {
    const color = getRandomInt(0, 6);
    switch(color) {
        case 0:  return {h: 150, s: 360, b: 360, a: 100};
        case 1:  return {h: 30,  s: 360, b: 360, a: 100};
        case 2:  return {h: 20, s: 360, b: 360, a: 100};
        case 3:  return {h: 10, s: 360, b: 360, a: 100};
        default: return {h: 0,   s: 360, b: 360, a: 100};
    }
}

function getRandomContainerPosition(partW: number, partH: number, cartPosition: PositionType) {
    const colCount = window.innerWidth /  partW;
    const selection = getRandomInt(0, 20);
    var partX: number;
    if(selection < 3) { 
        partX = (partW * 1/2)  + cartPosition.x;
    } else if(selection > 17) {
        partX = (partW * -1/2) + cartPosition.x;
    } else {
        partX = cartPosition.x;
    
    }
    var partPosition: PositionType = {
        x: partX,
        y: cartPosition.y
    }
    return partPosition;
}

function getRandomAccentPosition(partW: number, partH: number, cartPosition: PositionType) {
    const selection = getRandomInt(0, 8);
    var partX: number;
    switch(selection) {
        case 0:  partX = partW * 1/9  + cartPosition.x;
            break;
        case 1:  partX = partW * 1/4   + cartPosition.x;
            break;
        case 2:  partX = partW * 1/3    + cartPosition.x;
            break;
        case 3:  partX = partW + cartPosition.x;
            break;
        case 4:  partX = partW - cartPosition.x;
            break;
        case 5:  partX = partW * -1/3   + cartPosition.x;
            break;
        case 6:  partX = partW * -1/4  + cartPosition.x;
            break;
        case 7:  partX = partW * -1/9 + cartPosition.x;
            break;
        default: partX = partW * cartPosition.x;
    }
    var partPosition: PositionType = {
        x: partX,
        y: cartPosition.y
    }
    return partPosition;
}

function getRandomPartShape() {
    const selection = getRandomInt(0, 22);
     switch(selection) {
        case 0: return  "BOX-LG";
        case 1: return  "BOX-SM";
        case 2: return  "CIRCLE-SM";
        case 3: return  "CIRCLE-LG";
        case 4: return  "CIRCLE-DOT";
        case 5: return  "BOX-SM-X";
        case 6: return  "DOUBLE-DOT-HORIZONTAL";
        case 7: return  "DOUBLE-DOT-VERTICAL";
        case 8: return  "QUAD-DOT-CROSS";
        case 9: return  "QUAD-DOT-X";
        case 10: return "DOT";
        case 11: return "CROSS";
        case 12: return "THREE-LINES-VERTICAL";
        case 13: return "THREE-LINES-HORIZONTAL";
        case 14: return "X";
        case 15: return "DIAG-LEFT";
        case 16: return "DIAG-RIGHT";
        case 17: return "DIAMOND";
        case 18: return "BOX-LG-X";
        case 19: return "BOX-CROSS";
        case 20: return "SMALL-DIAMOND";
        case 21: return "DIAG-CLEFT";
        default: return "X"
     }
}

function changeCartColor(cart: CartType, h: number, s: number, b: number, bw: number) {
    for (let index = 0; index < cart.parts.length; index++) {
        cart.parts[index].color.h  = h;
        cart.parts[index].color.s  = s;
        cart.parts[index].color.b  = b;
        cart.parts[index].color.a = bw;
    }
}

function moveCart(cart: CartType, edgeExtend: number, continuation: number) {
    if (cart.isTransitioning) {
        if (cart.transitionCount >= ((cart.width / 2) - 2)) {
            cart.isTransitioning = false;
        } else {
            cart.transitionCount++;
        }
    } else {
        cart.isTransitioning = true;
        cart.transitionCount = 0;
        cart.age = 0;
        cart.direction = getRandomDirection();
    }

    switch (cart.direction) {
        case "NORTH": changeCartColor(cart, 40, 360, 360, 100);
                        cart.position.y = cart.position.y - 2;
                        break;
        case "SOUTH": changeCartColor(cart, 0, 0, 140, 100);
                        cart.position.y = cart.position.y + 2;
                        break;
        case  "EAST": changeCartColor(cart, 165, 360, 360, 100);
                        cart.position.x = cart.position.x + 2;
                        break;
        case  "WEST": changeCartColor(cart, 0, 0, 140, 100);
                        cart.position.x = cart.position.x - 2;
                        break;
        default: (console.error('Failed to move cart'));
    }
    
    if (cart.position.x > (window.innerWidth + cart.width*2)) {
        cart.position.x = 0 - cart.width*2;
        cart.position.y = cart.position.y + cart.height
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.x < 0 - cart.width*2) {
        cart.position.x = (window.innerWidth + cart.width*2);
        cart.position.y = cart.position.y - cart.height
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.y > (window.innerHeight + cart.height*2)) {
        cart.position.y = 0 - cart.height*2;
        cart.position.x = cart.position.x + cart.width
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.y < 0 - cart.height*2) {
        cart.position.y = (window.innerHeight + cart.height*2);
        cart.position.x = cart.position.x - cart.width
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }

    if (!cart.isTransitioning &&
        (cart.transitionCount == (cart.width / 2) - 2) &&
        (getRandomInt(0, 5) < continuation)) {
            cart.isTransitioning = true;
            cart.transitionCount = -1;
        }
    return cart;
}

function buildNewPart(cartPosition: PositionType, color: Color, partW: number, partH: number) {
    var shape: string = getRandomPartShape();
    var position: PositionType = cartPosition; //getRandomContainerPosition(partW, partH, cartPosition);

    // if (shape == "BOX-LG"     ||
    //     shape == "BOX-SM"     ||
    //     // shape == "CIRCLE-SM"  ||
    //     // shape == "CIRCLE-LG"  ||
    //     // shape == "CIRCLE-DOT" ||
    //     shape == "DIAG-CLEFT" ||
    //     shape == "BOX-SM-X"   ||
    //     shape == "BOX-LG-X"   ||
    //     shape == "X"          ||
    //     shape == "DIAG-LEFT"  ||
    //     shape == "DIAG-RIGHT" ||
    //     shape == "BOX-CROSS"  ||
    //     shape == "SUPER-EXTRA-LG-CIRCLE"  ||
    //     shape == "EXTRA-LG-CIRCLE"  ||
    //     shape == "DIAMOND") {
    //         position = getRandomContainerPosition(partW, partH, cartPosition)
    //     } else {
    //         position = getRandomAccentPosition(partW, partH, cartPosition);
    //     }
    var p: PartType = {
        shape: shape,
        color: color,
        position: position,
        width: partW,
        height: partH
    };
    return p;
}

function buildRandomEtraLargePart(cartPosition: PositionType, color: Color, partW: number, partH: number) {
    var shape: string = "EXTRA-LG-CIRCLE";
    var position: PositionType = getRandomContainerPosition(partW, partH, cartPosition);
    var p: PartType = {
        shape: shape,
        color: color,
        position: position,
        width: partW,
        height: partH
    };
    return p;
}

function buildRandomSuperEtraLargePart(cartPosition: PositionType, color: Color, partW: number, partH: number) {
    var shape: string = "SUPER-EXTRA-LG-CIRCLE";
    var position: PositionType = getRandomContainerPosition(partW, partH, cartPosition);
    var p: PartType = {
        shape: shape,
        color: color,
        position: position,
        width: partW,
        height: partH
    };
    return p;
}

// generates a give number of uniques carts
function generateCarts(rows: number, cols: number,minPartCount: number, maxPartCount: number, w: number, h: number) {
    let carts = [];
    for (let i = 0; i < cols; i++) {
        carts[i] = [];
        for(let j = 0; j < rows; j++){
            const partCount = getRandomInt(minPartCount, maxPartCount + 1)
            var cartColor: Color = getRandomColor();
            var cartPosition: PositionType = {
                x: i*w + w/2,
                y: j*h + h/2
            }
            console.log([maxPartCount, partCount])
            cartPosition = getRandomContainerPosition(w, h, cartPosition)
            var parts = new Array(partCount);
            for (let k = 0; k < partCount; k++) {
                parts[k] = buildNewPart(cartPosition, cartColor, w, h);
            }
            const speed = getRandomInt(2000, 10000);
            var cart: CartType = {
                id: i,
                position: cartPosition,
                age: getRandomInt(2000, speed),
                height: h,
                width: w,
                isTransitioning: false,
                transitionCount: 0,
                parts: parts,
                speed: speed,
                direction: getRandomDirection()
            }
            carts[i][j] = cart;
        }
    }
    return carts;
}

function gridSketch(p5: P5CanvasInstance<MySketchProps>) {
    let state = {
        grid: false,
        canvasWidth: 0,
        canvasHeight: 0,
        rows: 0,
        cols: 0,
        minPartCount: 0,
        maxPartCount: 0,
        carts: [],
        partWidth: 0,
        partHeight: 0,
        run: false,
        strokeWeight: 5
    }
    var canvas

    p5.setup = () => {
        canvas = p5.createCanvas(state.canvasWidth, state.canvasHeight, p5.P2D);
        p5.colorMode(p5.HSB, 360);
        p5.ellipseMode(p5.RADIUS);
        p5.strokeWeight(state.strokeWeight)
        p5.noLoop()
    }

    p5.updateWithProps = props => {
        if(state.canvasHeight != props.canvasHeight ||
           state.canvasWidth  != props.canvasWidth) {
            canvas = p5.resizeCanvas(props.canvasWidth, props.canvasHeight);
        }
        if(state.rows != props.rows ||
           state.cols != props.cols ||
           state.minPartCount != props.minPartCount ||
           state.maxPartCount != props.maxPartCount) {
            state = Object.assign(state, props);
            state.partWidth = state.canvasWidth  / state.cols;
            state.partHeight = state.canvasHeight / state.rows;
            state.carts = generateCarts(state.rows, 
                                        state.cols, 
                                        state.minPartCount, 
                                        state.maxPartCount,
                                        state.partWidth,
                                        state.partHeight)
        }
        if(state.strokeWeight != props.strokeWeight) {
            p5.strokeWeight(props.strokeWeight)
        }
        if(state.run != props.run) {
            state.carts = generateCarts(state.rows, 
                state.cols, 
                state.minPartCount, 
                state.maxPartCount,
                state.partWidth,
                state.partHeight)
        }
        state = Object.assign(state, props);
        p5.draw()
    }

    p5.draw = drawCarts(p5, state);
    
};

export default function GridPattern() {
    const [rows,                 setRows] = useState(3);
    const [cols,                 setCols] = useState(1);
    const [canvasWidth,   setCanvasWidth] = useState(500);
    const [canvasHeight, setCanvasHeight] = useState(309);
    const [minPartCount, setMinPartCount] = useState(1);
    const [maxPartCount, setMaxPartCount] = useState(3);
    const [dGrid,               setDGrid] = useState(true);
    const [run,                   setRun] = useState(false);
    const [strokeWeight, setStrokeWeight] = useState(5);


    function handleChangeRows(event) {
        let e = event.target.value;
        console.log(e)
        setRows(e);
    }

    function handleChangeCols(event) {
        setCols(Number(event.target.value));
    }

    function handleChangeCanvasWidth(event) {
        setCanvasWidth(Number(event.target.value));
    }

    function handleChangeCanvasHeight(event) {
        setCanvasHeight(Number(event.target.value));
    }

    function handleChangeMinPartCount(event) {
        setMinPartCount(Number(event.target.value));
        if(maxPartCount < Number(event.target.value)) {
            setMaxPartCount(Number(event.target.value))
        }
    }
    function handleChangeMaxPartCount(event) {
        setMaxPartCount(Number(event.target.value));
        if(minPartCount > Number(event.target.value)) {
            setMinPartCount(Number(event.target.value))
        }
    }

    function handleChangeStrokeWeight(event) {
        setStrokeWeight(Number(event.target.value));
    }

    function handleChangeRun() {
        setRun(!run);
    }

    const minPartRef = useRef(minPartCount)
    const maxPartRef = useRef(maxPartCount)

    useEffect(() => {

        }, [dGrid, 
            canvasWidth, 
            canvasHeight, 
            rows, 
            cols, 
            minPartCount, 
            maxPartCount, 
            run, 
            strokeWeight]);

    const { theme } = useContext(ThemeContext);
    return (
      <div className={`flex flex-col justify-start items-center p-5 ${theme == 'dark'? 'bg-emerald-600 text-zinc-100' : 'bg-emerald-500/[.3] text-emerald-950'}`}>
        <h1 className='flex text-center text-2xl font-bold'>Pattern Generator</h1>
        <div className={` rounded-md font-bold justify-center flex flex-row h-full`}>
        <div className="flex flex-col justify-center pr-5">
          <NextReactP5Wrapper 
            sketch={gridSketch}
            grid={dGrid} 
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            rows={rows}
            cols={cols}
            minPartCount={minPartCount}
            maxPartCount={maxPartCount}
            run={run}
            strokeWeight={strokeWeight}/>
        </div>
        <div className='text-md flex'>
          <div className="flex flex-col px-2 justify-between">
            <div className="flex flex-row justify-center items-center">
              <h6 className=''>Stroke Weight</h6>
            </div>
            <CustomSlider 
                title={''} 
                id={''} 
                min={1} 
                max={50} 
                step={1} 
                value={strokeWeight} 
                onChange={handleChangeStrokeWeight}
                ref={null}/>
            <div className="flex flex-row  justify-center items-center">
              <h6>Minimum Part Count</h6>
            </div>
            <CustomSlider 
                title={''} 
                id={''}
                min={0} 
                max={10} 
                step={1} 
                value={minPartCount} 
                onChange={handleChangeMinPartCount}
                ref={minPartRef}/>
                        <div className="flex flex-row  justify-center items-center">
              <h6>Maximum Part Count</h6>
            </div>
            <CustomSlider title={''} 
                id={''} 
                min={0} 
                max={10} 
                step={1} 
                value={maxPartCount} 
                onChange={handleChangeMaxPartCount}
                ref={maxPartRef}/>
            <div className="flex flex-row  justify-center items-center">
              <h6>Row Count</h6>
            </div>            
            <CustomSlider 
                title={''} 
                id={''} 
                min={.5} 
                max={30} 
                step={.5} 
                value={rows} 
                onChange={handleChangeRows}
                ref={null}/>
            <div className="flex flex-row  justify-center items-center">
              <h6>Column Count</h6>
            </div>
            <CustomSlider 
                title={''}  
                id={''} 
                min={.5} 
                max={30} 
                step={.5} 
                value={cols} 
                onChange={handleChangeCols}
                ref={null}/>
              <div className="flex flex-row justify-around">
                <button className={`${theme == 'dark'? 'bg-emerald-800' : 'bg-emerald-600'} rounded-md hover:bg-amber-400 flex-grow py-3 px-5 m-3 font-bold text-zinc-100`} 
                onClick={handleChangeRun}>
                    Generate Pattern
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

    )
}