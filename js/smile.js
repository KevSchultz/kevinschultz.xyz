import {drawText, drawSmile} from "./shapes.js";

const COLOR = "yellow";
const SIZE = 10;

function Smile(x, y, dx, dy, ddy, size) {
    this.x = x;
    this.y = y;
    this.dx = dx
    this.dy = dy;
    this.ddy = ddy;
    this.size = size;
}

Smile.prototype.update = function(canvas) {
    this.dy += this.ddy;
    this.y += this.dy;
    this.x += this.dx;
    
    if (this.y > canvas.height) {
        this.dy *= -1;
        this.y = canvas.height - 1;
    }

    if (this.y < 0) {
        this.dy *= -1;
        this.y = 1;
    }

    if (this.x > canvas.width) {
        this.dx *= -1;
        this.x = canvas.width - 1;
    }

    if (this.x < 0) {
        this.dx *= -1;
        this.x = 1;
    }
};

Smile.prototype.draw = function(ctx) {
    drawText(ctx, this.x, this.y, "15px Arial", COLOR, "☺")
//    drawSmile(ctx, this.x, this.y, 5);
};


function SmileSystem(canvas, fps, n) {
    this.canvas = canvas;
    this.resize();
    this.ctx = canvas.getContext("2d");
    this.fps = fps;
    this.n = n;
    this.Smiles = [];    
    
    for (let i = 0; i < n; i++) {
        this.Smiles.push(new Smile(Math.floor(Math.random() * this.canvas.width), 0, Math.random() - Math.random(), Math.random() - Math.random(), 0, SIZE));
    }
}


SmileSystem.prototype.update = function() {
    for (let Smile of this.Smiles) {
        Smile.update(this.canvas);
    }
};

SmileSystem.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let Smile of this.Smiles) {
        Smile.draw(this.ctx);
    }
};

SmileSystem.prototype.resize = function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
}

export {SmileSystem};
