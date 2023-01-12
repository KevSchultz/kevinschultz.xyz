import {line, circle} from "./shapes.js";

const MAXRADIUS = 10;
const MINRADIUS = 5;

function Dot(x, y, r, t, dx, dy, dr, dt) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.t = t;
    this.lastX = this.x;
    this.lastY = this.y;
    this.lastR = this.r;
    this.lastT = this.t;
}


Dot.prototype.update = function(delta) {
    this.lastX = this.x;
    this.lastY = this.y;
    this.lastR = this.r;
    this.lastT = this.t;

    this.x += this.dx * delta;
    this.y += this.dy * delta;
    this.r += this.dr * delta;
    this.t += this.dt * delta;
};

Dot.prototype.draw = function(ctx, interpolationPercentage) {
    var x = this.lastX + (this.x - this.lastX) * interpolationPercentage,
        y = this.lastY + (this.y - this.lastY) * interpolationPercentage;
    circle(ctx, this.x, this.y, this.r, 'white');
};


Dot.prototype.spawn = function(canvas) {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);
    this.r = MINRADIUS;
    this.t = 0;
    this.dx = Math.floor(Math.random() * 5) + Math.floor(Math.random() * -5);
    this.dy = Math.floor(Math.random() * 5) + Math.floor(Math.random() * -5);
    this.dr = 0;
    this.dt = 0.1;
};


function LineDotSystem(canvas, fps, n, connections) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.fps = fps;
    this.n = n;
    this.connections = connections;
    this.dots = [];
    this.lines = [];


    for (let i = 0; i < this.n; i++) {
        let dot = new Dot();
        dot.spawn(this.canvas);
        this.dots.push(dot);
        let arr = [];
        for (let j = 0; j < this.connections; j++) {
            arr.push(Math.floor(Math.random() * this.n));
        }
        this.lines.push(arr);
        console.log(arr);
    }
    console.log(this.dots);
    this.resize();

}

LineDotSystem.prototype.update = function(delta) {
    for (let dot of this.dots) {
        dot.update(delta / (1000 / this.fps));
        if (dot.x > this.canvas.width || dot.x < 0) {
            dot.spawn(this.canvas);
        }

        if (dot.y > this.canvas.height || dot.y < 0) {
            dot.spawn(this.canvas);
        }
    }
};

LineDotSystem.prototype.draw = function(interpolationPercentage) {
    this.ctx.fillStyle =  '#141414';
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill()
    for (let i = 0; i < this.n; i++) {
        var dot = this.dots[i];
        dot.draw(this.ctx, interpolationPercentage);
        for (let j of this.lines[i]) {
            line(this.ctx, dot.x, dot.y, this.dots[j].x, this.dots[j].y, 1, "white");
        }
    }
};

LineDotSystem.prototype.restart = function() {
    for (let dot of this.dots) {
        dot.spawn(this.canvas);
    }
};

LineDotSystem.prototype.resize = function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.restart();
};

export {LineDotSystem};
