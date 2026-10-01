// theme.js: dark/light toggle shared by all pages

// Apply the saved theme immediately, before the page paints (avoids a flash of the wrong theme)
const saved = localStorage.getItem("theme");
if (saved) {
    document.documentElement.setAttribute("data-bs-theme", saved);
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    document.documentElement.setAttribute("data-bs-theme", "light");
}

// Make the button say what it WILL do, and tell screen readers the same thing
function updateToggle(theme) {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;   // the navbar may not have loaded yet
    if (theme === "dark") {
        btn.textContent = "Light mode";
        btn.setAttribute("aria-label", "Switch to light mode");
    } else {
        btn.textContent = "Dark mode";
        btn.setAttribute("aria-label", "Switch to dark mode");
    }
}

// Listen on the whole document, because the navbar button is loaded later by jQuery
document.addEventListener("click", function (e) {
    if (!e.target.closest("#theme-toggle")) return;   // ignore clicks on anything else
    const current = document.documentElement.getAttribute("data-bs-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", next);
    localStorage.setItem("theme", next);
    updateToggle(next);
});
