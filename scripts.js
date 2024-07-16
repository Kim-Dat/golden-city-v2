// scripts.js

// Get modal element
const modal = document.querySelector(".modal");
// Get open modal button
const openModalButton = document.querySelector(".open-modal");
// Get close button
const closeButton = document.querySelector(".close-button");

// Open modal
openModalButton.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center"; // Change to 'flex' to center the modal
    setTimeout(() => {
        modal.classList.add("show");
    }, 10); // Add a small timeout to trigger animation
});

// Close modal
function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("hide");
    }, 300); // Wait for the animation to complete
}

// Close modal when clicking close button
closeButton.addEventListener("click", closeModal);

// Close modal when clicking outside of modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.getElementById("openDrawer").addEventListener("click", function () {
    document.getElementById("drawer").classList.add("open");
    document.getElementById("overlay").classList.add("visible");
});

document.getElementById("closeDrawer").addEventListener("click", function () {
    document.getElementById("drawer").classList.remove("open");
    document.getElementById("overlay").classList.remove("visible");
});

document.getElementById("overlay").addEventListener("click", function () {
    document.getElementById("drawer").classList.remove("open");
    document.getElementById("overlay").classList.remove("visible");
});

/* select */

function initializeCustomSelect(selectElement) {
    const selectBtn = selectElement.querySelector(".select-btn");
    const selectOptions = selectElement.querySelector(".select-options");
    const options = selectElement.querySelectorAll(".option");

    selectBtn.addEventListener("click", () => {
        selectOptions.classList.toggle("show");
    });

    options.forEach((option) => {
        option.addEventListener("click", () => {
            selectBtn.textContent = option.textContent;
            options.forEach((opt) => opt.classList.remove("selected"));
            option.classList.add("selected");
            selectOptions.classList.remove("show");
        });
    });
}

// Initialize all custom select boxes
document.querySelectorAll(".custom-select").forEach(initializeCustomSelect);

// Close all custom select boxes if clicking outside
document.addEventListener("click", (event) => {
    if (!event.target.closest(".custom-select")) {
        document.querySelectorAll(".select-options.show").forEach((selectOptions) => {
            selectOptions.classList.remove("show");
        });
    }
});

/* slider */

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll(".carousel-item");
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector(".carousel-inner").style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto slide
setInterval(nextSlide, 3000);

// Initialize the carousel
showSlide(currentSlide);

/* scroll header */

const nav = document.querySelector(".nav");
const header = document.querySelector("header");
document.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY > 100;
    if (scrollPosition) {
        nav.style.height = "64px";
        header.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)";
    } else {
        nav.style.height = "80px";
        header.style.boxShadow = "none";
    }
});
