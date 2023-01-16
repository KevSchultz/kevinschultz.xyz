import {triangle} from "./shapes.js";
import {distance} from "./utilities.js";

/**
 * Bird class - a moving triangle.
 *
 * @param {Object} center
 *   An object with `x` and `y` parameters representing coordinates for the
 *   center of the planet's orbit.
 * @param {Number} size
 *   The side length of the triangle.
 * @param {Number} [vx=0]
 *   The velocity of the bird in the x direction.
 * @param {Number} [vy=0]
 *   The velocity of the bird in the y direction.
 * @param {String} [color='black']
 *   The color of the planet.
 */
function Bird(x, y, vx, vy, size, visualRange, closeRange, separation, alignment, cohesion, turn, max, min, color) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.visualRange = visualRange;
    this.closeRange = closeRange;
    this.separation = separation;
    this.alignment = alignment;
    this.cohesion = cohesion;
    this.turn = turn;
    this.max = max;
    this.min = min;
    this.color = color;
}

Bird.prototype.update = function(canvas, birds, delta) {

    let neighbors = 0;
    let close = 0;
    let x_avg = 0;
    let y_avg = 0;
    let vx_avg = 0;
    let vy_avg = 0;
    let close_dx = 0;
    let close_dy = 0;

    for (let bird of birds) {
        if (bird == this) {
            continue;
        }

        if (distance(this.x, this.y, bird.x, bird.y) < this.closeRange) {
            close_dx += this.x - bird.x;
            close_dy += this.y - bird.y;
            close++;
        } else if (distance(this.x, this.y, bird.x, bird.y) < this.visualRange) {
            x_avg += bird.x;
            y_avg += bird.y;
            vx_avg += bird.vx;
            vy_avg += bird.vy;
            neighbors++;
        }
    }

    if (neighbors > 0) {
        x_avg /= neighbors;
        y_avg /= neighbors;
        vx_avg /= neighbors;
        vy_avg /= neighbors;
        this.vx += ((vx_avg - this.vx) * this.alignment) + ((x_avg - this.x) * this.cohesion);
        this.vy += ((vy_avg - this.vy) * this.alignment) + ((y_avg - this.y) * this.cohesion);
    }


    if (close > 0) {
        this.vx += (close_dx * this.separation);
        this.vy += (close_dy * this.separation);
    }

    if (this.x > canvas.width - 200) {
        this.vx -= this.turn;
    } else if (this.x < 0 + 200) {
        this.vx += this.turn;
    }

    if (this.y > canvas.height - 200) {
        this.vy -= this.turn;
    } else if (this.y < 0 + 200) {
        this.vy += this.turn;
    }

    let speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > this.max) {
        this.vx = (this.vx / speed) * this.max;
        this.vy = (this.vy / speed) * this.max;
    } else if (speed < this.min) {
        this.vx = (this.vx / speed) * this.min;
        this.vy = (this.vy / speed) * this.min;
    }



    this.lastX = this.x;
    this.lastY = this.y;
    this.x = this.x + (this.vx * delta);
    this.y = this.y + (this.vy * delta);
};

Bird.prototype.draw = function(ctx, interpolationPercentage) {
    // Interpolate with the last position to reduce stuttering.
    var x = this.lastX + (this.x - this.lastX) * interpolationPercentage,
        y = this.lastY + (this.y - this.lastY) * interpolationPercentage;
    triangle(ctx, x, y, (Math.atan2(this.vy, this.vx) - (3 * Math.PI) / 2), this.size, this.color);
};

function BirdSystem(canvas, fps, n) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.n = n;
    this.fps = fps;

    this.birds = [];

    for (let i = 0; i < this.n; i++) {
        let x = Math.floor(Math.random()*1000);
        let y = Math.floor(Math.random()*1000);
        let vx = Math.floor(Math.random()*5);
        let vy = Math.floor(Math.random()*5);
        let size = 10;
        let visualRange = 100;
        let closeRange = 40;
        let separation = .05;
        let alignment = 0.05;
        let cohesion = 0.0005;
        let turn = 0.2;
        let max = 7;
        let min = 5;
        let color = "#" + Math.floor(Math.random()*16777215).toString(16);
        this.birds.push(new Bird(x, y, vx, vy, size, visualRange, closeRange, separation, alignment, cohesion, turn, max, min, color));
    }
    this.resize();
}


BirdSystem.prototype.update = function(delta) {
    for (let bird of this.birds) {
        bird.update(this.canvas, this.birds, delta / (1000 / this.fps));
    }
};

BirdSystem.prototype.draw = function(interpolationPrecentage) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let bird of this.birds) {
        bird.draw(this.ctx, interpolationPrecentage);
    }
};

BirdSystem.prototype.resize = function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
};

export {BirdSystem};