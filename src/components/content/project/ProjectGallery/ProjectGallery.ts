const images: NodeListOf<HTMLImageElement> =
    document.querySelectorAll(".gallery-img");

const modal = document.getElementById("modalContainer") as HTMLDialogElement;
const modalImg = document.getElementById("modalImg") as HTMLImageElement;

const closeButton = document.getElementById(
    "modalBtnClose",
) as HTMLButtonElement;
const prevButton = document.getElementById(
    "modalBtnPrev",
) as HTMLButtonElement;
const nextButton = document.getElementById(
    "modalBtnNext",
) as HTMLButtonElement;

let imageCollection: string[] = [];
let imageCurrent: string = "";
const regexId = /-[^-]*$/;
const regexSrc = /^.*\//;

let startX: number;
let startY: number;



images.forEach((image) => {
    image.addEventListener("click", () => {
        openModal(image.src, image.id);
    });
});

const getImageCollection = (id: string) => {
    imageCollection = [];
    imageCurrent = id;
    images.forEach((image) => {
        if (image.id.includes(id.replace(regexId, ""))) {
            imageCollection.push(image.src);
        }
    })
    return imageCollection;
}

const controlImageCollection = (direction: "next" | "prev") => {
    let indexControl: number = 0;
    const currentIndex = imageCollection.findIndex(imageSrc => imageSrc.includes(imageCurrent.replace(regexSrc, "")));


    if (direction === "next") {
        indexControl = (imageCollection.length - 1) === currentIndex ? 0 : (currentIndex + 1);
    } else if (direction === "prev") {
        indexControl = currentIndex === 0 ? (imageCollection.length - 1) : (currentIndex - 1);
    }
    modalImg.src = imageCollection[indexControl];
    imageCurrent = modalImg.src.replace(regexSrc, "")
}

const openModal = (src: string, id: string) => {
    if (modalImg) {
        let galleryImgs = getImageCollection(id);
        modalImg.src = src;
        modal.showModal();

        if (galleryImgs.length === 1) {
            prevButton.style.display = "none";
            nextButton.style.display = "none";
        } else {
            prevButton.style.display = "block";
            nextButton.style.display = "block";
        }
    }
};

prevButton.addEventListener("click", (event) => {
    event.preventDefault();
    controlImageCollection("prev")
});

nextButton.addEventListener("click", (event) => {
    event.preventDefault();
    controlImageCollection("next")
});

closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    modal.close();
});


// test touch
modal.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});


modal.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
        prevButton.click();
    }

    else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
        nextButton.click();
    }
});