import {angleLine} from "./shapes.js";


function branch(ctx, angleDifference, x, y, angle, length) {
    angleLine(ctx, x, y, angle, length, 2, "white");
    if (length > 4) {
        branch(ctx, angleDifference, x + length * Math.cos(angle), y + length * Math.sin(angle), angle - angleDifference, length / 2);
        branch(ctx, angleDifference, x + length * Math.cos(angle), y + length * Math.sin(angle), angle + angleDifference, length / 2);
    }
}

function Tree(x, y, length, angle, angleDifference) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.angleDifference = angleDifference;
}

Tree.prototype.update = function() {
    this.angleDifference += .01;
    this.angleDifference %= 2 * Math.PI;
};

Tree.prototype.draw = function(ctx) {
    branch(ctx, this.angleDifference, this.x, this.y, this.angle, this.length);
};

function TreeSystem(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    this.trees = [];
    let width = this.canvas.width / 4;
    let height = this.canvas.height / 4;
    this.trees[0] = new Tree(this.canvas.width / 2, this.canvas.height / 2, height, Math.PI / 2, Math.PI / 2);
    this.trees[1] = new Tree(this.canvas.width / 2, this.canvas.height / 2, width, Math.PI, Math.PI / 2);
    this.trees[2] = new Tree(this.canvas.width / 2, this.canvas.height / 2, height, 3 * Math.PI / 2, Math.PI / 2);
    this.trees[3] = new Tree(this.canvas.width / 2, this.canvas.height / 2, width, 0, Math.PI / 2);
}

TreeSystem.prototype.update = function() {
    for (let tree of this.trees) {
        tree.update();
    }
}

TreeSystem.prototype.draw = function() {
    this.ctx.fillStyle =  '#141414';
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill()
    for (let tree of this.trees) {
        tree.draw(this.ctx);
    }
}

TreeSystem.prototype.resize = function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
}

export {TreeSystem};