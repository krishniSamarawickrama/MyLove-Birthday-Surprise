
/* PASSWORD */

const SECRET_PIN = "11252001";


/* PAGE NAVIGATION */

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

function openPinPage() {
    showPage("pinPage");
}

function nextPage(pageId) {
    showPage(pageId);
}

function goHome() {
    showPage("welcomePage");
}


/* PIN CHECK */

function checkPin() {
    const enteredPin = document.getElementById("pinInput").value;
    const message = document.getElementById("pinMessage");

    if (enteredPin === SECRET_PIN) {
        message.textContent = "";
        document.getElementById("pinInput").value = "";

        showPage("memoriesPage");

        showSlide(0);
        startSlideshow();

    } else {
        message.textContent =
            "Oops! That's not the correct birthday. Try again ❤️";

        document.getElementById("pinInput").value = "";
    }
}


/* PRESS ENTER TO UNLOCK */

document.getElementById("pinInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkPin();
    }
});


/* PHOTO SLIDESHOW */

let currentSlide = 0;
let slideshowTimer = null;

const slides = document.querySelectorAll(".memory-slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active-slide", i === currentSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active-dot", i === currentSlide);
    });
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
    startSlideshow();
}

function goToSlide(index) {
    showSlide(index);
    startSlideshow();
}

function startSlideshow() {

    clearInterval(slideshowTimer);

    slideshowTimer = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 3000);
}


/* BIRTHDAY CELEBRATION */

function celebrate() {

    const wish = document.getElementById("birthdayWish");

    wish.textContent =
        "May all your dreams come true, my love! I wish I could be there to celebrate with you. ❤️";

    createHearts();
}


/* FLOATING HEARTS AFTER MAKE A WISH */

function createHearts() {

    const container = document.getElementById("heartContainer");

    const heartSymbols = ["❤️", "💙", "💕", "💗", "💖"];

    for (let i = 0; i < 25; i++) {

        const heart = document.createElement("div");

        heart.classList.add("floating-heart");

        heart.textContent =
            heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        heart.style.left = Math.random() * 100 + "%";

        heart.style.animationDelay = Math.random() * 2 + "s";

        heart.style.fontSize = (20 + Math.random() * 20) + "px";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
}


/* BACKGROUND MUSIC */

const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

async function toggleMusic() {

    if (backgroundMusic.paused) {

        try {
            await backgroundMusic.play();
            musicToggle.textContent = "⏸ Pause Music";

        } catch (error) {

            musicToggle.textContent = "🎵 Play Music";

            console.error("Music could not play:", error);

            alert("Music could not play. Please check the audio file and try again.");
        }

    } else {

        backgroundMusic.pause();
        musicToggle.textContent = "🎵 Play Music";
    }
}


/* CONTINUOUS FALLING HEARTS */

function createFallingHeart() {

    const container = document.getElementById("fallingHeartContainer");

    if (!container) return;

    const heart = document.createElement("div");

    heart.classList.add("falling-heart");

    const heartSymbols = ["❤️", "💗", "💕", "💖", "💙"];

    heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (14 + Math.random() * 18) + "px";

    const duration = 5 + Math.random() * 5;

    heart.style.animationDuration = duration + "s";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}


/* START FALLING HEARTS */

setInterval(createFallingHeart, 350);
