const toggle = document.getElementById("toggle") as HTMLDivElement;

const darkMode = () => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.theme = "dark";
};

const lightMode = () => {
    document.documentElement.removeAttribute("data-theme");
    localStorage.theme = "light";
};

if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
    document.documentElement.classList.add("dark");
    darkMode();
} else {
    document.documentElement.classList.remove("dark");
    lightMode();
}

toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    if (localStorage.theme === "dark") {
        lightMode();
    } else {
        darkMode();
    }
});