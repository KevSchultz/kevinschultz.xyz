import {angleLine} from "./shapes.js";

const ANGLEANIMATIONSTEP = 0.01;

/**
 * A canvas fractal tree.
 * @param {number} x coordinate tree origin. 
 * @param {number} y coordinate tree origin.
 * @param {number} length branch starting length.
 * @param {number} lineWidth branch line width.
 * @param {string} tree color.
 * @param {number} angleStart first branch starting angle (units in radians aligned with unit circle).
 * @param {number} angleDifference angle between each branch.
 * @param {number} numberBranches number of branches generated at each step.
 * @param {number} minBranchLength min branch length drawn (base case).
 * @param {number} reductionFactor factor multiplied to branch length at each step. (greater than 1 equals infinite recursion)
 * @returns void
 */
function Tree(x, y, length, lineWidth, color, angleStart, angleDifference, numberBranches, minBranchLength, reductionFactor) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.lineWidth = lineWidth;
    this.color = color;
    this.angleStart = angleStart;
    this.angleDifference = angleDifference;
    this.numberBranches = numberBranches;
    this.minBranchLength = minBranchLength;
    this.reductionFactor = reductionFactor;
}

/**
 * Updates the angle between each branch for every frame. 
 * @returns void
 */ 
Tree.prototype.update = function() {
    this.angleDifference += ANGLEANIMATIONSTEP;
    this.angleDifference %= 2 * Math.PI;
};

/**
 * Draws tree to ctx canvas context.
 * @param {object} ctx 2d canvas context. 
 * @returns void
 */ 
Tree.prototype.draw = function(ctx) {
    branch(ctx,
           this.x,
           this.y, 
           this.length,
           this.lineWidth,
           this.color, 
           this.angleStart,
           this.angleDifference,
           this.numberBranches,
           this.minBranchLength,
           this.reductionFactor
          );
};


Tree.prototype.print = function() {
    console.log(this);
};

/**
 * Recursive helper function to draw tree. 
 * @param {object} ctx 2d canvas context. 
 * @param {number} x coordinate tree origin. 
 * @param {number} y coordinate tree origin.
 * @param {number} length branch starting length.
 * @param {number} lineWidth branch line width.
 * @param {string} tree color.
 * @param {number} angleStart first branch starting angle (units in radians aligned with unit circle).
 * @param {number} angleDifference angle between each branch.
 * @param {number} numberBranches number of branches generated at each step.
 * @param {number} minBranchLength min branch length drawn (base case).
 * @param {number} reductionFactor factor multiplied to branch length at each step. (greater than 1 equals infinite recursion)
 * @returns void
 */ 
function branch(ctx, x, y, length, lineWidth, color, angleStart, angleDifference, numberBranches, minBranchLength, reductionFactor) {
    if (length < minBranchLength) {
        return;
    }

    angleLine(ctx, x, y, angleStart, length, lineWidth, color);

    var n = numberBranches;
    if (numberBranches % 2 == 1) {
        branch(ctx,
               x + length * Math.cos(angleStart),
               y - length * Math.sin(angleStart), 
               length * reductionFactor,
               lineWidth,
               color, 
               angleStart,
               angleDifference,
               numberBranches,
               minBranchLength,
               reductionFactor
              );
        n--;
    }

    for (let i = 1; i <= (n/2); i++) {
        branch(ctx,
               x + length * Math.cos(angleStart),
               y - length * Math.sin(angleStart), 
               length * reductionFactor,
               lineWidth,
               color, 
               angleStart + angleDifference * i,
               angleDifference,
               numberBranches,
               minBranchLength,
               reductionFactor
              );
        branch(ctx,
               x + length * Math.cos(angleStart),
               y - length * Math.sin(angleStart), 
               length * reductionFactor,
               lineWidth,
               color, 
               angleStart - angleDifference * i,
               angleDifference,
               numberBranches,
               minBranchLength,
               reductionFactor
              );
    }
}



/**
 * A collection of canvas fractal trees.
 * @param {object} canvas canvas object for trees. 
 * @returns void
 */ 
function TreeSystem(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.trees = [];
    this.restart();
    this.resize();
}

/**
 * Updates each tree every frame. 
 * @returns void
 */ 
TreeSystem.prototype.update = function() {
    for (let tree of this.trees) {
        tree.update();
    }
};

/**
 * Erases canvas and draws each tree every frame. 
 * @returns void
 */ 
TreeSystem.prototype.draw = function() {
    // Erase Canvas
    this.ctx.fillStyle =  '#141414';
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill()

    for (let tree of this.trees) {
        tree.draw(this.ctx);
    }
}


function createAttributeInput(attribute, value) {
    var div = document.createElement("div");
    var span = document.createElement("span");
    span.innerHTML = attribute;
    var input = document.createElement("input");
    input.setAttribute("class", "treeInput");
    input.setAttribute("type", "number");
    input.setAttribute("value", value);
    div.appendChild(span);
    div.appendChild(input);
    return div;
}

TreeSystem.prototype.addTree = function(x, y, length, lineWidth, color, angleStart, angleDifference, numberBranches, minBranchLength, reductionFactor) {
    var tree = new Tree(x,
                        y,
                        length,
                        lineWidth,
                        color,
                        angleStart,
                        angleDifference,
                        numberBranches,
                        minBranchLength,
                        reductionFactor
                       );
    this.trees.push(tree);

    var treeContainer = document.createElement("div");
    treeContainer.setAttribute("class", "treeContainer");

    var treeName = document.createElement("h3");
    treeName.innerHTML = "Tree " + (this.trees.length - 1);

//    var xDiv = document.createElement("div");
//    var xSpan = document.createElement("span");
//    xSpan.innerHTML = "X: ";
//    var xInput = document.createElement("input");
//    xInput.setAttribute("class", "treeInput");
//    xInput.setAttribute("type", "number");
//    xInput.setAttribute("value", x.toString());
//    xInput.addEventListener("change", function(e) {
//        tree.x = Number(xInput.value);
//    });
//    xDiv.appendChild(xSpan);
//    xDiv.appendChild(xDiv);
    
    
    var xDiv = createAttributeInput("X: ", x);
    var xInput = xDiv.querySelector("input");
    xInput.addEventListener("change", function(e) {
        tree.x = Number(xInput.value); 
    });
    
    var yDiv = createAttributeInput("Y: ", y);
    var yInput = yDiv.querySelector("input");
    yInput.addEventListener("change", function(e) {
        tree.y = Number(yInput.value);
    });
    
    var lengthDiv = createAttributeInput("Length: ", length);
    var lengthInput = lengthDiv.querySelector("input");
    lengthInput.addEventListener("change", function(e) {
       tree.length = Number(lengthInput.value); 
    });
    
    var lineWidthDiv = createAttributeInput("Line Width: ", lineWidth);
    var lineWidthInput = lineWidthDiv.querySelector("input");
    lineWidthInput.addEventListener("change", function(e) {
        tree.lineWidth = Number(lineWidthInput.value);
    });
    
    var angleStartDiv = createAttributeInput("Start Angle: ", angleStart);
    var angleStartInput = angleStartDiv.querySelector("input");
    angleStartInput.addEventListener("change", function(e) {
        tree.angleStart = Number(angleStartInput.value);
    });
    
    var numberBranchesDiv = createAttributeInput("Branches: ", numberBranches);
    var numberBranchesInput = numberBranchesDiv.querySelector("input");
    numberBranchesInput.addEventListener("change", function(e) {
        tree.numberBranches = Number(numberBranchesInput.value);
    });
    
    var minBranchLengthDiv = createAttributeInput("Min Length: ", minBranchLength);
    var minBranchLengthInput = minBranchLengthDiv.querySelector("input");
    minBranchLengthInput.addEventListener("change", function(e) {
        tree.minBranchLength = Number(minBranchLengthInput.value);
    });
    
    var reductionFactorDiv = createAttributeInput("Reduction Factor: ", reductionFactor);
    var reductionFactorInput = reductionFactorDiv.querySelector("input");
    reductionFactorInput.addEventListener("change", function(e) {
        tree.reductionFactor = Number(reductionFactorInput.value);
    });


    treeContainer.appendChild(treeName);
    treeContainer.appendChild(xDiv);
    treeContainer.appendChild(yDiv);
    treeContainer.appendChild(lengthDiv);
    treeContainer.appendChild(lineWidthDiv);
    treeContainer.appendChild(angleStartDiv);
    treeContainer.appendChild(numberBranchesDiv);
    treeContainer.appendChild(minBranchLengthDiv);
    treeContainer.appendChild(reductionFactorDiv);

    //    // Create a button element
    //    var button = document.createElement("button");
    //
    //    // Set the button's text and attributes
    //    button.innerHTML = "Click me";
    //    button.setAttribute("id", "myButton");
    //    button.addEventListener('click', function(e) {
    //        tree.print();
    //    })
    document.getElementById("treeSidebar").appendChild(treeContainer); 
};

TreeSystem.prototype.restart = function() {
    var x = 1000;
    var y = 1000;
    var length = 300;
    var lineWidth = 3;
    var color = "red";
    var angleStart = Math.PI / 2;
    var angleDifference = 0;
    var numberBranches = 2;
    var minBranchLength = 4;
    var reductionFactor = 0.5;

    this.addTree(x,
                 y,
                 length,
                 lineWidth,
                 color,
                 angleStart,
                 angleDifference,
                 numberBranches,
                 minBranchLength,
                 reductionFactor
                );
}

TreeSystem.prototype.resize = function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
}

export {TreeSystem};