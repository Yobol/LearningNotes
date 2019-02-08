import shape = require("./IShape")
import circle = require("./Circle")
import triangle = require("./Triangle")

function drawAllShapes(shapes: shape.IShape[]) {
    for (var shape_ of shapes) {
        shape_.draw()
    }
}

drawAllShapes([new circle.Circle(), new triangle.Triangle()])