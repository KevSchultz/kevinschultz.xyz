import {line} from "./shapes.js";
import {Point3D} from "./point3d.js";

/**
 * A spinning three dimensional cube.
 * @param {number} x coordinate. 
 * @param {number} y coordinate.
 * @param {number} z coordinate.
 * @param {number} theta rotation angle. 
 * @param {number} size length of each side.
 * @returns void
 */
function Cube(origin, x, y, z, theta, size, lineWidth) {
    this.origin = origin;
    this.x = x;
    this.y = y;
    this.z = z;
    this.theta = theta;
    this.size = size;
    this.lineWidth = lineWidth;
    let half = size / 2;
    this.points = [
        new Point3D(origin, half / 10,  x - half, y - half, z - half), 
        new Point3D(origin, half / 10,  x - half, y - half, z + half),
        new Point3D(origin, half / 10, x - half, y + half, z - half),
        new Point3D(origin, half / 10, x - half, y + half, z + half),
        new Point3D(origin, half / 10, x + half, y - half, z - half),
        new Point3D(origin, half / 10, x + half, y - half, z + half),
        new Point3D(origin, half / 10, x + half, y + half, z - half),
        new Point3D(origin, half / 10, x + half, y + half, z + half),
    ];
}

Cube.prototype.update = function() {
    const xRotationMatrix = [
        [1, 0, 0],
        [0, Math.cos(this.theta), -Math.sin(this.theta)],
        [0, Math.sin(this.theta), Math.cos(this.theta)]
    ];    
    const yRotationMatrix = [
        [Math.cos(this.theta), 0, Math.sin(this.theta)],
        [0, 1, 0],
        [-Math.sin(this.theta), 0, Math.cos(this.theta)]
    ];
    const zRotationMatrix = [
        [Math.cos(this.theta), -Math.sin(this.theta), 0],
        [Math.sin(this.theta), Math.cos(this.theta), 0],
        [0, 0, 1]
    ];



    for (let point of this.points) {
        point.multiply(xRotationMatrix);
        point.multiply(yRotationMatrix);
        point.multiply(zRotationMatrix);  
    }
};

Cube.prototype.draw = function(ctx) {
    for (let point of this.points) {
        point.draw(ctx);
    }

    // Connect each point to form cube. 
    for (let i = 0; i < 4; i++) {
        line(ctx, this.points[i].getCanvasX(), this.points[i].getCanvasY(), this.points[i + 4].getCanvasX(), this.points[i + 4].getCanvasY(), this.lineWidth, "white");
        line(ctx, this.points[i * 2].getCanvasX(), this.points[i * 2].getCanvasY(), this.points[i * 2 + 1].getCanvasX(), this.points[i * 2 + 1].getCanvasY(), this.lineWidth, "white");
    }

    for (let i = 0; i < 8; i += 4) {
        line(ctx, this.points[i].getCanvasX(), this.points[i].getCanvasY(), this.points[i + 2].getCanvasX(), this.points[i + 2].getCanvasY(), this.lineWidth, "white");
        line(ctx, this.points[i + 1].getCanvasX(), this.points[i + 1].getCanvasY(), this.points[i + 3].getCanvasX(), this.points[i + 3].getCanvasY(), this.lineWidth, "white");
    }
};

function CubeSystem(canvas, fps) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = canvas.getContext("2d");
    this.fps = fps;
    let origin = [this.canvas.width / 2, this.canvas.height / 2];
    let size = this.canvas.width / 20;
    this.cubes = [
        new Cube(origin, 0, 0, 0, .01, size, size / 100),
        new Cube(origin, size * 4, 0, 0, .01, size, size / 100),
        new Cube(origin, -size * 4, 0, 0, .01, size, size / 100),
        new Cube(origin, 0, size * 4, 0, .01, size, size / 100),
        new Cube(origin, 0, -size * 4, 0, .01, size, size / 100)
    ];
}

CubeSystem.prototype.update = function() {
    for (let cube of this.cubes) {
        cube.update();
    }
};

CubeSystem.prototype.draw = function() {
    this.ctx.fillStyle =  '#141414';
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill()
    for (let cube of this.cubes) {
        cube.draw(this.ctx);
    }
};

CubeSystem.prototype.resize = function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    let origin = [this.canvas.width / 2, this.canvas.height / 2];
    let size = this.canvas.width / 20;
    this.cubes = [
        new Cube(origin, 0, 0, 0, .01, size, size / 100),
        new Cube(origin, size * 4, 0, 0, .01, size, size / 100),
        new Cube(origin, -size * 4, 0, 0, .01, size, size / 100),
        new Cube(origin, 0, size * 4, 0, .01, size, size / 100),
        new Cube(origin, 0, -size * 4, 0, .01, size, size / 100)
    ];
}

export {CubeSystem};