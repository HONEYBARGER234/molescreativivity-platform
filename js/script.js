// ================================
// MOLESCREATIVITY PLATFORM
// Main JavaScript
// ================================


// MOBILE MENU
function toggleMenu() {
    const menu = document.getElementById("mobileMenu");

    if (!menu) return;

    menu.classList.toggle("open");
}


// CLOSE MOBILE MENU WHEN A LINK IS CLICKED
document.addEventListener("DOMContentLoaded", function () {

    const menu = document.getElementById("mobileMenu");

    if (!menu) return;

    const links = menu.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {
            menu.classList.remove("open");
        });

    });

});


// CLOSE MENU WHEN CLICKING OUTSIDE IT
document.addEventListener("click", function (event) {

    const menu = document.getElementById("mobileMenu");
    const button = document.querySelector(".menu-btn");

    if (!menu || !button) return;

    if (
        menu.classList.contains("open") &&
        !menu.contains(event.target) &&
        !button.contains(event.target)
    ) {
        menu.classList.remove("open");
    }

});


// SIMPLE SCROLL REVEAL
const revealElements = document.querySelectorAll(
    ".feature-card, .service-item, .hero-dashboard, .cta"
);

const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.12
    }
);


// INITIAL REVEAL SETTINGS
revealElements.forEach(function (element) {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});


// CURRENT YEAR
const yearElements = document.querySelectorAll(".current-year");

yearElements.forEach(function (element) {

    element.textContent = new Date().getFullYear();

});
