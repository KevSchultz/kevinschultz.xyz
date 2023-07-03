import {StarSystem} from "./stars.js";
import {BirdSystem} from "./birds.js";
import {RainSystem} from "./rains.js";
import {LineDotSystem} from "./linedots.js"
import {WolframCellular} from "./wolframcellular.js";
import {TreeSystem} from "./tree.js";
import {CubeSystem} from "./cube.js";
import {SmileSystem} from "./smile.js"

const N = 500;
const FPS = 60;


var starsystem = new StarSystem(document.getElementById("stars"), FPS, N);
var birdsystem = new BirdSystem(document.getElementById("birds"), FPS, 50);
var rainsystem = new RainSystem(document.getElementById("rains"), FPS, 100);
var smilesystem = new SmileSystem(document.getElementById("smile"), FPS, 7670);
var linedotsystem = new LineDotSystem(document.getElementById("linedots"), FPS, 50, 1);
var treesystem = new TreeSystem(document.getElementById("tree"));
var cubesystem = new CubeSystem(document.getElementById("cube"), FPS);
var wolframcellular = new WolframCellular(document.getElementById("wolframcellular"), 90, 800, 800, 200, 200);

for (let i = 0; i <= 7; i++) { 
    document.getElementById("wolframRule" + i).addEventListener('click', (event) => {
        if (document.getElementById("wolframOutput" + i).style.background == "white") {
            document.getElementById("wolframOutput" + i).style.background = "black";
            wolframcellular.flipRule("0", i);
        } else {
            document.getElementById("wolframOutput" + i).style.background = "white";
            wolframcellular.flipRule("1", i);
        }
    });
}

document.getElementById("lineDotsSlider").addEventListener("input", (event) => {
    linedotsystem = new LineDotSystem(document.getElementById("linedots"), FPS, event.target.value, 1);
});


function current(sectionID) {
    return window.getComputedStyle(document.getElementById(sectionID)).display == "flex";
}

function update(delta) {
    if (current("home")) {
        starsystem.update(delta);
    } else if (current("birdSection")) {
        birdsystem.update(delta);
    } else if (current("rainSection")) {
        rainsystem.update(delta);
    } else if (current("linedotSection")) {
        linedotsystem.update();
    } else if (current("cubeSection")) {
        cubesystem.update();
    } else if (current("treeSection")) {
        treesystem.update();
    } else if (current("smileSection")) {
        smilesystem.update();
    }
}

function draw(interpolationPercentage) {
    if (current("home")) {
        starsystem.draw(interpolationPercentage);
    } else if (current("birdSection")) {
        birdsystem.draw(interpolationPercentage);
    } else if (current("rainSection")) {
        rainsystem.draw(interpolationPercentage);
    } else if (current("linedotSection")) {
        linedotsystem.draw();
    } else if (current("cubeSection")) {
        cubesystem.draw();
    } else if (current("treeSection")) {
        treesystem.draw();
    } else if (current("smileSection")) {
        smilesystem.draw(interpolationPercentage);
    }
}

addEventListener('visibilitychange', (event) => {
    if (document.visibilityState == 'visible') {
        MainLoop.start();
    } else {
        MainLoop.stop();
    }
});

addEventListener('resize', (event) => {
    starsystem.resize();
    birdsystem.resize();
    rainsystem.resize();
    linedotsystem.resize();
    cubesystem.resize();
    treesystem.resize();
});

MainLoop.setUpdate(update).setDraw(draw).setMaxAllowedFPS(FPS).start();

setInterval(function() {wolframcellular.update(); wolframcellular.draw();}, 1);
