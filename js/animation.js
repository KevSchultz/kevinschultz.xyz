import {StarSystem} from "./stars.js";
import {BirdSystem} from "./birds.js";
import {RainSystem} from "./rains.js";
import {LineDotSystem} from "./linedots.js"

const N = 500;
const FPS = 60;


var starsystem = new StarSystem(document.getElementById("stars"), FPS, N);
var birdsystem = new BirdSystem(document.getElementById("birds"), FPS, 50);
var rainsystem = new RainSystem(document.getElementById("rains"), FPS, 100);
var linedotsystem = new LineDotSystem(document.getElementById("linedots"), FPS, 10, 1);


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
        linedotsystem.update(delta);
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
        linedotsystem.draw(interpolationPercentage);
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
});

MainLoop.setUpdate(update).setDraw(draw).setMaxAllowedFPS(FPS).start();