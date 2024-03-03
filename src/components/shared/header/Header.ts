const sections: NodeListOf<HTMLElement> =
  document.querySelectorAll(".sectionMenu");
const navLinks: NodeListOf<HTMLAnchorElement> =
  document.querySelectorAll(".navLink");

const setActiveSection = () => {
  const scrollPosition = window.scrollY;

  sections.forEach((section, index) => {
    const offsetTop = section.offsetTop - 250;
    const offsetBottom = offsetTop + section.offsetHeight;

    const isActive =
      scrollPosition >= offsetTop && scrollPosition < offsetBottom;

    navLinks[index].classList.toggle("navLink-active", isActive);

    const ariaCurrent: any = isActive ? "page" : null;
    navLinks[index].setAttribute("aria-current", ariaCurrent);
  });
};

let mainMenu: HTMLButtonElement = document.getElementById(
  "navbar-default",
) as HTMLButtonElement;
let mainMenuHamburger: HTMLButtonElement = document.getElementById(
  "menuHamburger",
) as HTMLButtonElement;

mainMenuHamburger.addEventListener("click", () => {
  mainMenu.classList.toggle("hidden");
});

document.addEventListener("scroll", setActiveSection);

setActiveSection();