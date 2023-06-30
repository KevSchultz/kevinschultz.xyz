import {line, circle} from "./shapes.js";
import {Point3D} from "./point3d.js";
import {distance} from "./utilities.js";

const MAXRADIUS = 10;
const MINRADIUS = 5;

function Dot(canvas, radius, x, y, z, dx, dy, dz, theta) {
    this.canvas = canvas;
    this.radius = radius;
    this.point3D = new Point3D(origin, radius, x, y, z)
    this.dx = dx;
    this.dy = dy;
    this.dz = dz;
    this.theta = theta;
}

Dot.prototype.getX = function() {
    return this.point3D.getCanvasX();
};

Dot.prototype.getY = function() {
    return this.point3D.getCanvasY();

};

Dot.prototype.getZ = function() {
    return this.point3D.getZ();
};

Dot.prototype.getDistance = function(dot) {
    return Math.sqrt((this.getX() - dot.getX())**2 + (this.getY() - dot.getY())**2 + (this.getZ() - dot.getZ())**2)
}

Dot.prototype.update = function() {

    if (this.point3D.getCanvasX() >= this.canvas.width  || this.point3D.getCanvasX() <= 0) {
        this.dx = -this.dx;
    }

    if (this.point3D.getCanvasY() >= this.canvas.height  || this.point3D.getCanvasY() <= 0) {
        this.dy = -this.dy;
    }


    this.point3D.setX(this.point3D.getX() + this.dx);
    this.point3D.setY(this.point3D.getY() + this.dy);
    this.point3D.setZ(this.point3D.getZ() + this.dz);

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

    this.point3D.multiply(yRotationMatrix);
};

Dot.prototype.draw = function(ctx) {
    this.point3D.draw(ctx);
};


Dot.prototype.spawn = function() {
    this.point3D.setX(Math.floor(Math.random() * this.canvas.width / 2) - Math.floor(Math.random() * this.canvas.width / 2));
    this.point3D.setY(Math.floor(Math.random() * this.canvas.height / 2) - Math.floor(Math.random() * this.canvas.height / 2));
    this.point3D.setZ(Math.floor(Math.random() * this.canvas.height));
    this.point3D.setOrigin([this.canvas.width / 2, this.canvas.height / 2]);
    this.dx = (Math.random() * 1 + Math.random() * -1);
    this.dy = (Math.random() * 1 + Math.random() * -1);
    this.dz = (Math.random() * 1 + Math.random() * -1);
};


function LineDotSystem(canvas, fps, n, connections) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.origin = [this.canvas.width / 2, this.canvas.height / 2];
    this.fps = fps;
    this.n = n;
    this.connections = connections;
    this.dots = [];
    this.lines = [];


    for (let i = 0; i < this.n; i++) {
        let radius = 5;
        let dot = new Dot(this.canvas, radius, 0, 0, 0, 0, 0, 0, .01);
        dot.spawn(this.origin);
        this.dots.push(dot);
        let arr = [];
        for (let j = 0; j < this.connections; j++) {
            arr.push(Math.floor(Math.random() * this.n));
        }
        this.lines.push(arr);
    }
    this.resize();
}

LineDotSystem.prototype.update = function(delta) {
    for (let dot of this.dots) {
        dot.update();
    }
    this.createLines();
};

LineDotSystem.prototype.draw = function() {
    this.ctx.fillStyle =  '#141414';
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill()
    for (let i = 0; i < this.n; i++) {
        var dot = this.dots[i];
        dot.draw(this.ctx);
        for (let j of this.lines[i]) {
            line(this.ctx, dot.getX(), dot.getY(), this.dots[j].getX(), this.dots[j].getY(), 1, "white");
        }
    }
};

LineDotSystem.prototype.restart = function() {
    for (let dot of this.dots) {
        dot.spawn();
    }
};

LineDotSystem.prototype.resize = function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.createLines();
    this.restart();
};

LineDotSystem.prototype.createLines = function() {
    // Blank Lines 
    for (let i = 0; i < this.n; i++) {
        this.lines[i] = [this.findClosest(this.dots[i])];
    }
}

LineDotSystem.prototype.findClosest = function(dot) {
    var closest = -1;
    var closestDistance = this.canvas.width + this.canvas.height;
    for (let i = 0; i < this.n; i++) {
        if (this.dots[i].getDistance(dot) < closestDistance && this.dots[i].getDistance(dot) != 0) {
            closest = i;
            closestDistance = this.dots[i].getDistance(dot);
        }
    }
    return closest;
}


export {LineDotSystem};
