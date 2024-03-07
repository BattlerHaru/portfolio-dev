const contactBtn = document.getElementById("contactBtn") as HTMLButtonElement;
const contactInputSubject = document.getElementById(
    "contactInputSubject",
) as HTMLInputElement;
const contactInputMessage = document.getElementById(
    "contactInputMessage",
) as HTMLInputElement;
const contactMailBase = document.getElementById(
    "mailBase",
) as HTMLInputElement;
const contactErrorMessage = document.getElementById(
    "contactErrorMessage",
) as HTMLInputElement;
const contactErrorSubject = document.getElementById(
    "contactErrorSubject",
) as HTMLInputElement;
let timer: number | undefined;
let isContactValid = false;

const sendEmail = (subject: string, body: string) => {
    const mailSender: string = contactMailBase.value;

    const mailFormat = `mailto:${mailSender}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailFormat;
};

const contactInputErrorShow = (input: HTMLInputElement, errorSpan: HTMLSpanElement) => {
    if (isContactValid) {
        errorSpan.classList.add("hidden");
        input.classList.remove("error-border");
        input.classList.remove("error-ring");
    } else {
        errorSpan.classList.remove("hidden");
        input.classList.add("error-border");
        input.classList.add("error-ring");
    }
}

const contactInputShowBG = (input: HTMLInputElement) => {
    input.classList.add("bg-[--contact-input-bg-hover-color]");
}
const contactInputHideBG = (input: HTMLInputElement) => {
    input.classList.remove("bg-[--contact-input-bg-hover-color]");
    input.classList.add("bg-[--contact-input-bg-color]");
}

contactInputSubject.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (contactInputSubject.value.trim().length < 3) {
            isContactValid = false;
        } else {
            isContactValid = true;
        }
        contactInputErrorShow(contactInputSubject, contactErrorSubject);
    }, 500);
});
contactInputMessage.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (contactInputMessage.value.trim().length < 3) {
            isContactValid = false;
        } else {
            isContactValid = true;
        }
        contactInputErrorShow(contactInputMessage, contactErrorMessage);
    }, 500);
});

contactInputSubject.addEventListener('change', () => {
    contactInputShowBG(contactInputSubject);
});
contactInputSubject.addEventListener('focus', () => {
    contactInputShowBG(contactInputSubject);
});

contactInputMessage.addEventListener('change', () => {
    contactInputShowBG(contactInputMessage);
});
contactInputMessage.addEventListener('focus', () => {
    contactInputShowBG(contactInputMessage);
});

contactBtn.addEventListener("click", (event) => {
    event.preventDefault();
    contactInputShowBG(contactInputSubject);
    contactInputShowBG(contactInputMessage);

    if (isContactValid) {
        sendEmail(contactInputSubject.value, contactInputMessage.value);
        contactInputSubject.value = "";
        contactInputMessage.value = "";

        contactInputHideBG(contactInputSubject);
        contactInputHideBG(contactInputMessage);

    } else {
        contactInputErrorShow(contactInputSubject, contactErrorSubject);
        contactInputErrorShow(contactInputMessage, contactErrorMessage);
    }
});