import RBush from "rbush";
import Node from "./node";

export default class CustomRBush extends RBush {
    toBBox(Node) { return { minX: Node.x, minY: Node.y, maxX: Node.x, maxY: Node.y }; }
    compareMinX(a, b) { return a.x - b.x };
    compareMinY(a, b) { return a.y - b.y };
}