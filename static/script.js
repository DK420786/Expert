// ================================
// MOBILE / NAVIGATION
// ================================

document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    // ================================
    // CONTACT FORM
    // ================================

    const form = document.querySelector(".contact-form");

    if (form) {

        form.addEventListener("submit", function () {

            const button = form.querySelector("button[type='submit']");

            if (button) {
                button.textContent = "Sending...";
                button.disabled = true;
            }

        });

    }


    // ================================
    // CURRENT YEAR
    // ================================

    const footerYear = document.querySelector(".footer-bottom p");

    if (footerYear) {

        const currentYear = new Date().getFullYear();

        footerYear.textContent =
            "© " + currentYear + " Expert Homecare. All rights reserved.";

    }

});
