/// <reference path = "IShape.ts" />
/// <reference path = "Circle.ts" />
/// <reference path = "Triangle.ts" />
function drawAllShapes(shapes: Drawing.IShape[]) {
    for (var shape of shapes) {
        shape.draw()
    }
}

drawAllShapes([new Drawing.Circle(), new Drawing.Triangle()])