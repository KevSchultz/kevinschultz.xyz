import {rectangle} from "./shapes.js";

const COLOR = "dodgerblue";
const SIZE = 5;

function Rain(x, y, dy, ddy, size) {
    this.x = x;
    this.y = y;
    this.lastY = this.y;
    this.dy = dy;
    this.ddy = ddy;
    this.size = size;
}

Rain.prototype.update = function(canvas, delta) {
    this.lastY = this.y;
    this.dy += this.ddy;
    this.y += this.dy * delta;
    if (this.y > canvas.height) {
        this.lastY = 0;
        this.y = 0;
        this.ddy = Math.random() / 5;
        this.dy = 0;
    }
};

Rain.prototype.draw = function(ctx, interpolationPercentage) {
    var y = this.lastY + (this.y - this.lastY) * interpolationPercentage;
    rectangle(ctx, this.x, y, this.size, this.size, COLOR)
};


function RainSystem(canvas, fps, n) {
    this.canvas = canvas;
    this.resize();
    this.ctx = canvas.getContext("2d");
    this.fps = fps;
    this.n = n;
    this.rains = [];    
    
    for (let i = 0; i < n; i++) {
        this.rains.push(new Rain(Math.floor(Math.random() * this.canvas.width), 0, 0, Math.random() / 5, SIZE));
    }
}


RainSystem.prototype.update = function(delta) {
    for (let rain of this.rains) {
        rain.update(this.canvas, delta / (1000 / this.fps));
    }
};

RainSystem.prototype.draw = function(interpolationPercentage) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let rain of this.rains) {
        rain.draw(this.ctx, interpolationPercentage);
    }
};

RainSystem.prototype.resize = function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
}

export {RainSystem};