/* =========================================================
   MOLESCREATIVITY PLATFORM
   GLOBAL JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMenu() {
    const nav = document.getElementById("mainNav");

    if (!nav) return;

    nav.classList.toggle("active");
}


/* Close mobile menu when a link is clicked */

document.addEventListener("click", function (event) {

    const nav = document.getElementById("mainNav");
    const menuButton = document.querySelector(".menu-toggle");

    if (!nav) return;

    if (
        nav.classList.contains("active") &&
        !nav.contains(event.target) &&
        !menuButton?.contains(event.target)
    ) {
        nav.classList.remove("active");
    }

});


/* =========================================================
   CURRENT YEAR
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    document
        .querySelectorAll(".current-year")
        .forEach(function (element) {

            element.textContent =
                new Date().getFullYear();

        });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const revealElements =
        document.querySelectorAll(".reveal");

    if (!revealElements.length) return;

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(function (element) {

        observer.observe(element);

    });

});


/* =========================================================
   DEMO BUTTONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    document
        .querySelectorAll("[data-demo]")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const message =
                    button.getAttribute("data-demo");

                alert(
                    message ||
                    "This feature will be connected when the platform backend is added."
                );

            });

        });

});


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);

    if (!input) return;

    if (input.type === "password") {

        input.type = "text";

        if (button) {
            button.textContent = "🙈";
        }

    } else {

        input.type = "password";

        if (button) {
            button.textContent = "👁";
        }

    }

}


/* =========================================================
   SIMPLE SEARCH
========================================================= */

function platformSearch(inputId, itemsSelector) {

    const input =
        document.getElementById(inputId);

    const items =
        document.querySelectorAll(itemsSelector);

    if (!input || !items.length) return;

    input.addEventListener("input", function () {

        const search =
            input.value
                .toLowerCase()
                .trim();

        items.forEach(function (item) {

            const text =
                item.textContent
                    .toLowerCase();

            if (
                text.includes(search)
            ) {

                item.style.display = "";

            } else {

                item.style.display = "none";

            }

        });

    });

}


/* =========================================================
   SMOOTH ANCHOR LINKS
========================================================= */

document.addEventListener("click", function (event) {

    const link =
        event.target.closest(
            'a[href^="#"]'
        );

    if (!link) return;

    const targetId =
        link.getAttribute("href");

    if (
        !targetId ||
        targetId === "#"
    ) return;

    const target =
        document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* =========================================================
   ACTIVE PAGE NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    document
        .querySelectorAll(".nav a")
        .forEach(function (link) {

            const linkPage =
                link
                    .getAttribute("href")
                    ?.split("/")
                    .pop();

            if (
                linkPage === currentPage
            ) {

                link.classList.add("active");

            }

        });

});


/* =========================================================
   DEMO WALLET
========================================================= */

function showWalletDemo() {

    alert(
        "Wallet system ready for backend integration. " +
        "Payment gateway and transaction processing will be connected later."
    );

}


/* =========================================================
   DEMO PURCHASE
========================================================= */

function showPurchaseDemo(product) {

    alert(
        "Purchase selected: " +
        (product || "Digital Product") +
        "\n\nCheckout functionality will be connected when the backend and payment system are added."
    );

}


/* =========================================================
   DEMO SUPPORT
========================================================= */

function showSupportMessage() {

    alert(
        "Support messaging will be connected to the Molescreativivity support system later."
    );

}


/* =========================================================
   PLATFORM READY MESSAGE
========================================================= */

console.log(
    "Molescreativivity Platform loaded successfully."
);
