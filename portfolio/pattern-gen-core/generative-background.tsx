import React, { useEffect, useState, useRef } from "react";
import { type Sketch, SketchProps, P5CanvasInstance, P5WrapperClassName } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import type CartType from "../interfaces/cart";
import type PartType from "../interfaces/part";
import type PositionType from "../interfaces/position";
import type Color from "../interfaces/color";

type MySketchProps = SketchProps & {
    rotation: number;
    carts: Array<CartType>;
    grid: boolean;
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
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.line(x1, y1, x2, y2);
    p5.line(x1, y2, x2, y1);
}

function drawDiamond(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/3;
    const halfHeight= part.height * 1/3;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(x2, yHalf, xHalf, y2);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(x1, yHalf, xHalf, y1);
}

function drawSmallDiamond(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/9;
    const halfHeight= part.height * 1/9;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(x2, yHalf, xHalf, y2);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(x1, yHalf, xHalf, y1);
}

function drawDiagLeft(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 2;
    const halfHeight= part.height * 2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.line(x1, y1, x2, y2);
}

function drawDiagRight(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 2;
    const halfHeight= part.height * 2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.line(x1, y2, x2, y1);
}

function drawDiagCleft(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType) {
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.line(xHalf, y1, x2, y1 - halfHeight);
    p5.line(xHalf, y1, x2, yHalf);
    p5.line(xHalf, y2, x1, yHalf);
    p5.line(xHalf, y2, x1, y2 + halfHeight);
}

function drawLargeBox(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    p5.line(x1, y1, x2, y1);
    p5.line(x2, y1, x2, y2);
    p5.line(x2, y2, x1, y2);
    p5.line(x1, y2, x1, y1);
}

function drawCross(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const halfWidth = part.width * 1/2;
    const halfHeight= part.height * 1/2;
    const x1 = part.position.x + cartPosition.x - halfWidth;
    const y1 = cartPosition.y - halfHeight;
    const y2 = cartPosition.y + halfHeight;
    const x2 = part.position.x + cartPosition.x + halfWidth;
    const xHalf = x1 + halfWidth;
    const yHalf = y1 + halfHeight;
    p5.line(xHalf, y1, xHalf, y2);
    p5.line(x1, yHalf, x2, yHalf);
}

function drawSmallBox(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterWidth = part.width * 1/6;
    const quarterHeight= part.height * 1/6;
    const x1 = part.position.x + cartPosition.x - quarterWidth;
    const y1 = cartPosition.y - quarterHeight;
    const y2 = cartPosition.y + quarterHeight;
    const x2 = part.position.x + cartPosition.x + quarterWidth;
    p5.line(x1, y1, x2, y1);
    p5.line(x2, y1, x2, y2);
    p5.line(x2, y2, x1, y2);
    p5.line(x1, y2, x1, y1);
}

function drawTripleLinesVertical(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const eighthWidth = part.width   * 1/8;
    const quarterHeight= part.height * 1/4;
    const x1 = part.position.x + cartPosition.x - eighthWidth;
    const x2 = part.position.x + cartPosition.x;
    const x3 = part.position.x + cartPosition.x + eighthWidth;
    const y1 = cartPosition.y - quarterHeight;
    const y2 = cartPosition.y + quarterHeight;
    p5.line(x1, y1, x1, y2);
    p5.line(x2, y1, x2, y2);
    p5.line(x3, y1, x3, y2);
}

function drawTripleLinesHorizontal(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const eighthHeight = part.height * 1/8;
    const quarterWidth = part.width  * 1/4;
    const y1 = part.position.y + cartPosition.y - eighthHeight;
    const y2 = part.position.y + cartPosition.y;
    const y3 = part.position.y + cartPosition.y + eighthHeight;
    const x1 = cartPosition.x - quarterWidth;
    const x2 = cartPosition.x + quarterWidth;
    p5.line(x1, y1, x2, y1);
    p5.line(x1, y2, x2, y2);
    p5.line(x1, y3, x2, y3);

}

function drawDot(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse((cartPosition.x + part.position.x), cartPosition.y, (part.width * 1/32), (part.width * 1/32));
    p5.pop();
}

function drawXDot1(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height;
    const quarterWidth  = part.width;
    const y2 = cartPosition.y  + quarterHeight;
    const x2 = part.position.x + cartPosition.x + quarterWidth;
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x2, y2, (part.width * 1/64), (part.width * 1/64));
    p5.pop();
}

function drawXDot2(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height * 1/2;
    const quarterWidth  = part.width  * 1/2;
    const y1 = cartPosition.y  - quarterHeight;
    const x1 = part.position.x + cartPosition.x - quarterWidth;
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x1, y1, (part.width * 1/20), (part.width * 1/20));
    p5.pop();
}

function drawXDot3(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height;
    const quarterWidth  = part.width;
    const y2 = cartPosition.y  + quarterHeight;
    const x1 = part.position.x + cartPosition.x - quarterWidth;
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x1, y2, (part.width * 1/8), (part.width * 1/8));
    p5.pop();
}

function drawXDot4(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height;
    const quarterWidth  = part.width;
    const y1 = cartPosition.y  - quarterHeight;
    const x2 = part.position.x + cartPosition.x + quarterWidth;
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x2, y1, (part.width * 1/16), (part.width * 1/16));
    p5.pop();
}

function drawDoubleVerticalDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterHeight = part.height * 1/6;
    const x = part.position.x + cartPosition.x;
    const y1 = cartPosition.y  - quarterHeight*2;
    const y2 = cartPosition.y  - quarterHeight*2;
    const y3 = cartPosition.y  + quarterHeight*3;
    const y4 = cartPosition.y  + quarterHeight*3;
    const rand: number = Math.random();
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x, y1, (part.width * 1/32), (part.width * 1/32));
    p5.ellipse(x, y2, (part.width * 1/32), (part.width * 1/32));
    p5.pop();
}

function drawDoubleHorizontalDots(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    const quarterWidth  = part.width  * 1/6;
    const x1 = part.position.x + cartPosition.x - quarterWidth;
    const x2 = part.position.x + cartPosition.x + quarterWidth;
    const y = cartPosition.y;
    p5.push();
    p5.noStroke();
    p5.fill(part.color.h, part.color.s, part.color.b);
    p5.ellipse(x1, y, (part.width * 1/32), (part.width * 1/32));
    p5.ellipse(x2, y, (part.width * 1/32), (part.width * 1/32));
    p5.pop();
}

function drawSmallCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.ellipse((cartPosition.x + part.position.x), 
                cartPosition.y, 
               (part.width * 1/3), 
               (part.width * 1/3))
}

function drawLargeCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.ellipse((cartPosition.x + part.position.x), 
                cartPosition.y, 
               (part.width * 1/2), 
               (part.width * 1/2))

}

function drawExtraLargeCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.ellipse((cartPosition.x + part.position.x), 
                cartPosition.y, 
               (part.width * 1/3), 
               (part.width * 1/3))

}

function drawSuperExtraLargeCircle(p5: P5CanvasInstance<MySketchProps>, cartPosition: PositionType, part: PartType){
    p5.ellipse((cartPosition.x + part.position.x), 
                cartPosition.y, 
               (part.width * 3), 
               (part.width * 3))
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

function drawBackgroundGradient(p5: P5CanvasInstance<MySketchProps>, orbX: number, orbY: number) {
    let gradient = p5.drawingContext.createRadialGradient(orbX, orbY, 15, orbX, orbY, 600);
    gradient.addColorStop(0, p5.color(35, 360, 360));
    gradient.addColorStop(.4, p5.color(25, 360, 300));
    gradient.addColorStop(1, p5.color(160, 360, 50));
    
    p5.push();
    p5.drawingContext.fillStyle = gradient;
    p5.noStroke();
    p5.ellipse(window.innerWidth/2, window.innerHeight, 1000);
    p5.pop();
}

function drawOrb(p5: P5CanvasInstance<MySketchProps>, orbX: number, orbY: number) {
    let glowGradient = p5.drawingContext.createRadialGradient(orbX, orbY, 15, orbX, orbY, 100);
    glowGradient.addColorStop(0, p5.color(35, 360, 360, 100));
    glowGradient.addColorStop(1, p5.color(25, 360, 360, 0));

    let orbGradient = p5.drawingContext.createRadialGradient(orbX, orbY, 0, orbX, orbY, 20)
    orbGradient.addColorStop( .1, p5.color(35,  10, 360));
    orbGradient.addColorStop(.85, p5.color(40, 270, 360));
    orbGradient.addColorStop(1, p5.color(25, 360, 340));

    p5.push();
    p5.noStroke()
    p5.drawingContext.fillStyle = glowGradient;
    p5.ellipse(orbX, orbY, 100);
    p5.pop();
    p5.push();
    p5.noStroke()
    p5.drawingContext.fillStyle = orbGradient;
    p5.ellipse(orbX, orbY, 20);
    p5.pop()
    
}

function drawCarts(layer, props){

    const { carts, grid } = props;

    if (grid) {
        drawGrid(layer, carts[0].width, carts[0].height);
    }
    
    layer.background(360, 360, 0)
    layer.noFill()
    layer.erase()
    for (let i = 0; i < carts.length; i++) {
        var c = carts[i];

        for (let j = 0; j < c.parts.length; j++) {
            var p = c.parts[j];
            
            switch (p.shape) {
                case "X":                      drawX(layer, c.position, p);
                    break;
                case "DIAMOND":                drawDiamond(layer, c.position, p);
                    break;
                case "DIAG-LEFT":              drawDiagLeft(layer, c.position, p);
                    break;
                case "DIAG-RIGHT":             drawDiagRight(layer, c.position, p);
                    break;
                case "BOX-SM":                 drawSmallBox(layer, c.position, p);
                    break;
                case "BOX-LG":                 drawLargeBox(layer, c.position, p);
                    break;
                case "BOX-SM-X":               drawSmallBoxX(layer, c.position, p);
                    break;
                case "BOX-LG-X":               drawLargeBoxX(layer, c.position, p);
                    break;
                case "CIRCLE-SM":              drawSmallCircle(layer, c.position, p);
                    break;
                case "CIRCLE-DOT":             drawCircleDot(layer, c.position, p);
                    break;
                case "CIRCLE-LG":              drawLargeCircle(layer, c.position, p);
                    break;
                case "DOT":                    drawDot(layer, c.position, p);
                    break;
                case "CROSS":                  drawCross(layer, c.position, p);
                    break;
                case "BOX-CROSS":              drawSmallBoxCross(layer, c.position, p);
                    break;
                case "DOUBLE-DOT-HORIZONTAL":  drawDoubleHorizontalDots(layer, c.position, p);
                    break;
                case "DOUBLE-DOT-VERTICAL":    drawDoubleVerticalDots(layer, c.position, p);
                    break;
                case "QUAD-DOT-CROSS":         drawCrossDots(layer, c.position, p);
                    break;
                case "QUAD-DOT-X-1":           drawXDot1(layer, c.position, p);
                    break;
                case "QUAD-DOT-X-2":           drawXDot2(layer, c.position, p);
                    break;
                case "QUAD-DOT-X-3":           drawXDot3(layer, c.position, p);
                    break;
                case "QUAD-DOT-X-4":           drawXDot4(layer, c.position, p);
                    break;
                case "THREE-LINES-VERTICAL":   drawTripleLinesVertical(layer, c.position, p);
                    break;
                case "THREE-LINES-HORIZONTAL": drawTripleLinesHorizontal(layer, c.position, p);
                    break;
                case "SMALL-DIAMOND":          drawSmallDiamond(layer, c.position, p);
                    break;
                case "DIAG-CLEFT":             drawDiagCleft(layer, c.position, p);
                    break;
                case "EXTRA-LG-CIRCLE":        drawExtraLargeCircle(layer, c.position, p);
                    break;
                case "SUPER-EXTRA-LG-CIRCLE":  drawSuperExtraLargeCircle(layer, c.position, p);
                    break;
                default: drawX(layer, c.position, p);
            }
            
        }
    }
    layer.noErase()
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
    const dir = getRandomInt(0,20);
    switch(dir) {
        case 0:  return "EAST";
        case 1:  return "WEST";
        default: return "NORTH"
    }
}

function getRandomColor() {
    const color = getRandomInt(0, 4);
    switch(color) {
        case 0:  return 131;
        case 1:  return 21;
        case 2:  return 145;
        case 3:  return 131;
        default: return 0;
    }
}

function getRandomContainerPosition(partW: number, partH: number, cartPosition: PositionType) {
    const colCount = window.innerWidth /  partW;
    const selection = getRandomInt(0, 3);
    var partX: number;
    switch(selection) {
        case 0:  partX = (partW * 1/2)  + cartPosition.x;
            break;
        case 1:  partX = cartPosition.x;
            break;
        case 2:  partX = (partW * -1/2) + cartPosition.x;
            break;
        default: partX = cartPosition.x;
    }
    var partPosition: PositionType = {
        x: partX,
        y: cartPosition.y
    }
    return partPosition;
}

function getRandomPartShape() {
    const selection = getRandomInt(0, 25);
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
        case 9: return  "QUAD-DOT-X-1";
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
        case 22: return  "QUAD-DOT-X-2";
        case 23: return  "QUAD-DOT-X-3";
        case 24: return  "QUAD-DOT-X-4";
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
        case "NORTH": changeCartColor(cart, 160, 360, 360, 100);
                        cart.position.y = cart.position.y - 2;
                        break;
        case "SOUTH": changeCartColor(cart, 40, 360, 360, 100);
                        cart.position.y = cart.position.y + 2;
                        break;
        case  "EAST": changeCartColor(cart, 30, 360, 360, 100);
                        cart.position.x = cart.position.x + 2;
                        break;
        case  "WEST": changeCartColor(cart, 165, 360, 360, 100);
                        cart.position.x = cart.position.x - 2;
                        break;
        default: (console.error('Failed to move cart'));
    }
    
    if (cart.position.x > (window.innerWidth + cart.width)) {
        cart.position.x = 0 - cart.width;
        cart.position.y = cart.position.y + cart.height
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.x < 0 - cart.width) {
        cart.position.x = window.innerWidth + cart.width - (window.innerWidth % cart.width);
        cart.position.y = cart.position.y - cart.height
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.y > (window.innerHeight*5 + cart.height)) {
        cart.position.y = 0 - cart.height;
        cart.position.x = cart.position.x + cart.width
        cart.transitionCount = -1;
        cart.isTransitioning = true;
    }
    if (cart.position.y < 0 - cart.height) {
        cart.position.y = window.innerHeight*5 + cart.height - (window.innerHeight*5 % cart.height);
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

function buildRandomExtraLargePart(cartPosition: PositionType, color: Color, partW: number, partH: number) {
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

function buildRandomSuperExtraLargePart(cartPosition: PositionType, color: Color, partW: number, partH: number) {
    var shape: string = "SUPER-EXTRA-LG-CIRCLE";
    var position: PositionType = {x: window.innerWidth/2, y: window.innerHeight*5}
    var p: PartType = {
        shape: shape,
        color: color,
        position: position,
        width: 700,
        height: 700
    };
    console.log("here")
    return p;
}

// generates a give number of uniques carts
function generateCarts(cartCount: number, partCount: number, w: number, h: number, minSpeed: number, maxSpeed: number) {
    let carts = new Array(cartCount);
    for (let i = 0; i < cartCount; i++) {
        var cartColor: Color = {h: 140, s: 300, b: 270, a: 100};
        var cartPosition: PositionType = getRandomPosition(0, window.innerWidth, 0, window.innerHeight*5, w, h);
        var parts = new Array(getRandomInt(0, partCount) + 1);
        for (let j = 0; j < partCount; j++) {
            parts[j] = buildNewPart(cartPosition, cartColor, w, h);
        }
        const speed = getRandomInt(minSpeed, maxSpeed);
        var cart: CartType = {
            id: i,
            position: cartPosition,
            age: getRandomInt(minSpeed, speed),
            height: w,
            width: h,
            isTransitioning: false,
            transitionCount: 0,
            parts: parts,
            speed: speed,
            direction: getRandomDirection()
        }
        carts[i] = cart;
    }
    return carts;
}



function backgroundSketch(p5: P5CanvasInstance<MySketchProps>) {
    let state = {
        carts: [],
        grid: false,
        orbX: window.innerWidth/2,
        orbY: window.innerHeight/2,
        orbBounce: Math.PI
    }
    var canvas, cartLayer;

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight*5);
        cartLayer.w = p5.windowWidth;
        cartLayer.h = p5.windowHeight*5;
        state.orbX = window.innerWidth/2;
        state.orbY = window.innerHeight/2;
        state.orbBounce = Math.PI;
    }

    p5.setup = () => {
        canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight*5, p5.P2D);
        canvas.position(0,0);
        canvas.style('z-index', '-1');
        p5.colorMode(p5.HSB, 360);
        p5.ellipseMode(p5.RADIUS);
        
        cartLayer = p5.createGraphics(window.innerWidth, window.innerHeight*5)
        cartLayer.position(0,0);
        cartLayer.colorMode(p5.HSB, 360)
        cartLayer.strokeWeight(3);
        cartLayer.ellipseMode(p5.RADIUS);
    }

    p5.updateWithProps = props => {
        state = Object.assign(state, props);
    }

    function drawAll() {

        return () => {
            if(p5.frameCount % 1 == 0) {
                state.orbBounce = state.orbBounce + Math.PI/180;
            }
            state.orbX = state.orbX + p5.sin(state.orbBounce/2)*4;
            state.orbY = state.orbY + p5.cos(state.orbBounce)*2;
            drawBackgroundGradient(p5, state.orbX, state.orbY);
            drawCarts(cartLayer, state);
            p5.image(cartLayer, 0, 0)
            drawOrb(p5, state.orbX, state.orbY);
        }
    }

    p5.draw = drawAll();
};

export default function Background() {
    const [rotation,     setRotation] = useState(0);
    const [cartCount,   setCartCount] = useState(100);
    const [carts,           setCarts] = useState(Array<CartType>(cartCount));
    const [maxSpeed,     setMaxSpeed] = useState(500);
    const [minSpeed,     setMinSpeed] = useState(10000);
    const [partWidth,   setPartWidth] = useState(150);
    const [partHeight, setPartHeight] = useState(150);
    const [partCount,   setPartCount] = useState(2);
    const [edgeExtend, setEdgeExtend] = useState(0);
    const [dGrid,           setDGrid] = useState(false);
    const [continuation, setContinue] = useState(2);
    const [orbX,             setOrbX] = useState(0);
    const [orbY,             setOrbY] = useState(0);
    const [orbBounce,   setOrbBounce] = useState(0);

    useEffect(() => {

        console.log(window.innerHeight % partHeight)
        const c: Array<CartType> = generateCarts(cartCount, partCount, partWidth, partHeight, minSpeed, maxSpeed);
        setCarts(c);
        if(partWidth > partHeight) {
            setEdgeExtend(partWidth);
        } else {
            setEdgeExtend(partHeight);
        }
        setOrbX(window.innerWidth/2);
        setOrbY(window.innerHeight/2)
        
        const interval = setInterval(() => setCarts(carts => {
            let cts = new Array<CartType>(carts.length);
            for (let i = 0; i < carts.length; i++) {
                cts[i] = carts[i];
                if (cts[i].isTransitioning || cts[i].age >= cts[i].speed) {
                    moveCart(cts[i], edgeExtend, continuation);
                } else {
                    cts[i].age++;
                    for (let j = 0; j < cts[i].parts.length; j++) {
                        if (cts[i].parts[j].color.h < 130 || cts[i].parts[j].color.h > 141) {
                            cts[i].parts[j].color.h = 130;
                        }
                        if (cts[i].parts[j].color.h < 140) {
                            cts[i].parts[j].color.h = cts[i].parts[j].color.h + cts[i].parts[j].color.h * 1/200;
                        }
                        cts[i].parts[j].color.s = 300;

                        if (cts[i].parts[j].color.b < 269) {
                            cts[i].parts[j].color.b = 360;
                        }
                        if (cts[i].parts[j].color.b > 270) {
                            cts[i].parts[j].color.b = cts[i].parts[j].color.b - cts[i].parts[j].color.b * 1/200;
                        }
                    }
                }
            }
            return cts;
            }),
            10);
            return () => {
                clearInterval(interval);
            };
        }, [dGrid]);

    return (
        <NextReactP5Wrapper sketch={backgroundSketch} rotation={rotation} carts={carts} grid={dGrid}/>
    )
}