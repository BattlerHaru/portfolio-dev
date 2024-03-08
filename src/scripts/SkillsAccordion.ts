const skillAccordionInput = document.querySelector(
    ".skill-accordion-input",
) as HTMLInputElement;
const skillAccordionArrow = document.querySelector(
    ".skill-accordion-arrow",
) as HTMLElement;
const skillAccordionContent = document.querySelector(
    ".skill-accordion-content",
) as HTMLElement;

skillAccordionInput.addEventListener("change", () => {
    if (skillAccordionInput.checked) {
        skillAccordionContent.style.maxHeight = "0";
        skillAccordionArrow.style.transform = "rotate(90deg)";
    } else {
        skillAccordionContent.style.maxHeight = "100%";
        skillAccordionArrow.style.transform = "rotate(270deg)";
    }
});