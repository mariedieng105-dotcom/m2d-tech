/* ==========================================================
   NEXORA — script.js
   Menu mobile, liens WhatsApp, FAQ, navbar au scroll, révélations
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Liens WhatsApp (message pré-rempli, encodage sûr) ---------- */
    var WHATSAPP_NUMBER = "221757227035";

    document.querySelectorAll("[data-wa-message]").forEach(function (link) {
        var message = link.getAttribute("data-wa-message");
        link.setAttribute(
            "href",
            "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message)
        );
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener");
    });

    /* ---------- Menu mobile ---------- */
    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            var isOpen = navLinks.classList.toggle("is-open");
            navToggle.classList.toggle("is-active", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
            document.body.style.overflow = isOpen ? "hidden" : "";
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("is-open");
                navToggle.classList.remove("is-active");
                navToggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            });
        });
    }

    /* ---------- Navbar : ombre discrète au scroll ---------- */
    var navbar = document.getElementById("navbar");

    function updateNavbarState() {
        if (window.scrollY > 12) {
            navbar.classList.add("is-scrolled");
        } else {
            navbar.classList.remove("is-scrolled");
        }
    }

    if (navbar) {
        updateNavbarState();
        window.addEventListener("scroll", updateNavbarState, { passive: true });
    }

    /* ---------- FAQ (accordéon) ---------- */
    document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
        var panel = trigger.nextElementSibling;
        panel.style.maxHeight = "0px";

        trigger.addEventListener("click", function () {
            var isOpen = trigger.getAttribute("aria-expanded") === "true";

            // Ferme les autres panneaux ouverts (un seul ouvert à la fois)
            document.querySelectorAll(".accordion-trigger").forEach(function (otherTrigger) {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute("aria-expanded", "false");
                    otherTrigger.nextElementSibling.style.maxHeight = "0px";
                }
            });

            trigger.setAttribute("aria-expanded", String(!isOpen));
            panel.style.maxHeight = isOpen ? "0px" : panel.scrollHeight + "px";
        });
    });

    /* ---------- Révélations discrètes à l'apparition ---------- */
    var revealTargets = document.querySelectorAll("[data-reveal]");

    if ("IntersectionObserver" in window && revealTargets.length) {
        var observer = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealTargets.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealTargets.forEach(function (el) {
            el.classList.add("is-visible");
        });
    }

});
