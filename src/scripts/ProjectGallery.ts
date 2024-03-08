const imagesGalleryList: NodeListOf<HTMLImageElement> =
    document.querySelectorAll(".gallery-img");

const modalGallery = document.getElementById("modalGalleryContainer") as HTMLDialogElement;
const modalGalleryImg = document.getElementById("modalGalleryImg") as HTMLImageElement;

const modalGalleryCloseButton = document.getElementById(
    "modalGalleryBtnClose",
) as HTMLButtonElement;
const modalGalleryPrevButton = document.getElementById(
    "modalGalleryBtnPrev",
) as HTMLButtonElement;
const modalGalleryNextButton = document.getElementById(
    "modalGalleryBtnNext",
) as HTMLButtonElement;

let imageGalleryModalIsOpen = false;
let imageGalleryCollection: string[] = [];
let imageGalleryCurrent: string = "";
const imageGalleryRegexId = /-[^-]*$/;
const imageGalleryRegexSrc = /^.*\//;

let startX: number;
let startY: number;



imagesGalleryList.forEach((image) => {
    image.addEventListener("click", () => {
        openModal(image.src, image.id);
    });
});

const getImageCollection = (id: string) => {
    imageGalleryCollection = [];
    imageGalleryCurrent = id;
    imagesGalleryList.forEach((image) => {
        if (image.id.includes(id.replace(imageGalleryRegexId, ""))) {
            imageGalleryCollection.push(image.src);
        }
    })
    return imageGalleryCollection;
}

const controlImageCollection = (direction: "next" | "prev") => {
    let indexControl: number = 0;
    const currentIndex = imageGalleryCollection.findIndex(imageSrc => imageSrc.includes(imageGalleryCurrent.replace(imageGalleryRegexSrc, "")));


    if (direction === "next") {
        indexControl = (imageGalleryCollection.length - 1) === currentIndex ? 0 : (currentIndex + 1);
    } else if (direction === "prev") {
        indexControl = currentIndex === 0 ? (imageGalleryCollection.length - 1) : (currentIndex - 1);
    }
    modalGalleryImg.src = imageGalleryCollection[indexControl];
    imageGalleryCurrent = modalGalleryImg.src.replace(imageGalleryRegexSrc, "")
}

const openModal = (src: string, id: string) => {
    if (modalGalleryImg) {
        let galleryImgs = getImageCollection(id);
        modalGalleryImg.src = src;
        modalGallery.showModal();
        imageGalleryModalIsOpen = true;

        if (galleryImgs.length === 1) {
            modalGalleryPrevButton.style.display = "none";
            modalGalleryNextButton.style.display = "none";
        } else {
            modalGalleryPrevButton.style.display = "block";
            modalGalleryNextButton.style.display = "block";
        }
    }
};

modalGalleryPrevButton.addEventListener("click", (event) => {
    event.preventDefault();
    controlImageCollection("prev")
});

modalGalleryNextButton.addEventListener("click", (event) => {
    event.preventDefault();
    controlImageCollection("next")
});

modalGalleryCloseButton.addEventListener("click", (event) => {
    event.preventDefault();
    modalGallery.close();
    imageGalleryModalIsOpen = false;

});


// test touch
modalGallery.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});


modalGallery.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
        modalGalleryPrevButton.click();
    }

    else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
        modalGalleryNextButton.click();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modalGalleryCloseButton.click();
    }
});
