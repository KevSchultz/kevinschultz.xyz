import {rectangle} from "./shapes.js";

const width = 800;
const height = 800;

function WolframCellular(canvas, rule) {
    if (rule < 0 || rule > 255 || !Number.isInteger(rule)) {
        throw new Error("Invalid wolfram cellular rule.");
    }

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    this.rows = 200;
    this.columns = 200;

    this.step = new Array(this.columns).fill('0');
    this.step[Math.floor(this.columns / 2)] = '1'; 
    this.current_row = 0;
    this.rule = Array.from(rule.toString(2).padStart(8, '0'));
}

WolframCellular.prototype.update = function() {
    let new_step = new Array(this.columns).fill('0');
    for (let i = 1; i < this.columns - 1; i++) {
        let code = parseInt(this.step[i - 1] + this.step[i] + this.step[i + 1], 2);
        if (this.rule[7 -  code] == '1') {
            new_step[i] = '1';
        }
    }
    this.step = new_step;
    this.current_row = (this.current_row + 1) % this.rows;
};

WolframCellular.prototype.draw = function() {
    if (this.current_row == 0) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    for (let i = 0; i < this.columns; i++) {
        if (this.step[i] == '1') {
            let width = this.canvas.width / this.columns;
            let height = this.canvas.height / this.rows;
            rectangle(this.ctx, i * width, this.current_row * height, width, height, "white");
        }
    }
};

WolframCellular.prototype.restart = function(rule) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.step = new Array(this.columns).fill('0');
    this.step[Math.floor(this.columns / 2)] = '1'; 
    this.current_row = 0;
    this.rule = rule.toString(2).padStart(8, '0');
}; 

WolframCellular.prototype.flipRule = function(bit, i) {
    this.rule[7 - i] = bit;
    document.getElementById("wolframRuleOutput").innerHTML = "Rule: " + parseInt(this.rule.join(''), 2);
}

export {WolframCellular};