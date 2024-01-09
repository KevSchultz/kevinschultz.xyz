import { rectangle } from "./shapes.js";

function WolframCellular(canvas, rule, width, height, rows, columns) {
    if (rule < 0 || rule > 255 || !Number.isInteger(rule)) {
        throw new Error("Invalid wolfram cellular rule.");
    }

    // Drawing Utilities
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Fixed Dimensions
    this.canvas.width = width;
    this.canvas.height = height;
    this.rows = rows;
    this.columns = columns;

    this.step = new Array(this.columns).fill('0');
    this.step[Math.floor(this.columns / 2)] = '1';
    this.current_row = 0;
    this.rule = Array.from(rule.toString(2).padStart(8, '0'));
}

WolframCellular.prototype.update = function () {
    this.rule = this.getRule();

    let decimal_rule = this.rule.reduce((acc, val, index) =>
        acc + val * Math.pow(2, this.rule.length - 1 - index), 0);

    document.getElementById("wolframRuleOutput").innerHTML = "Rule: " + String(decimal_rule);
    let new_step = new Array(this.columns).fill('0');
    for (let i = 1; i < this.columns - 1; i++) {
        let code = parseInt(this.step[i - 1] + this.step[i] + this.step[i + 1], 2);
        if (this.rule[7 - code] == '1') {
            new_step[i] = '1';
        }
    }
    this.step = new_step;
    this.current_row = (this.current_row + 1) % this.rows; // start again at 0th row.
};

WolframCellular.prototype.draw = function () {
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

WolframCellular.prototype.restart = function (rule) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.step = new Array(this.columns).fill('0');
    this.step[Math.floor(this.columns / 2)] = '1';
    this.current_row = 0;
    this.rule = rule.toString(2).padStart(8, '0');
};


WolframCellular.prototype.getRule = function () {
    let rule = "";
    for (let i = 7; i >= 0; i--) {
        if (document.getElementById("wolframOutput" + i).style.background == "white") {
            rule += "1";
        } else {
            rule += "0";
        }
    }
    return Array.from(rule);
};


export { WolframCellular };