"use strict";
exports.__esModule = true;
var circle = require("./Circle");
var triangle = require("./Triangle");
function drawAllShapes(shapes) {
    for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
        var shape_ = shapes_1[_i];
        shape_.draw();
    }
}
drawAllShapes([new circle.Circle(), new triangle.Triangle()]);
