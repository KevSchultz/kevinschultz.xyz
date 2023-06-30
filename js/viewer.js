var images = ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.gif", "14.png", "15.png"]

var current_image_index = 0;

function previousImage() {
    current_image_index = (current_image_index == 0) ? images.length - 1 : current_image_index - 1;
    document.getElementById("blenderImage").src = "images/" + images[current_image_index];
}

function nextImage(){
    current_image_index = (current_image_index == images.length - 1) ? 0: current_image_index + 1;
    document.getElementById("blenderImage").src = "images/" + images[current_image_index];
}

var arrow = document.querySelector(".arrow");
arrow.addEventListener("click", function(){
    document.querySelector("body").classList.toggle("close");
});

var close = document.querySelector(".close-button");
close.addEventListener("click", function(){
    document.querySelector("body").classList.toggle("close");
});