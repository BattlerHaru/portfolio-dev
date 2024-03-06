const images: NodeListOf<HTMLImageElement> =
    document.querySelectorAll(".gallery-img");
const modal = document.getElementById("modalContainer") as HTMLDialogElement;
const closeButton = document.getElementById(
    "modalBtnClose",
) as HTMLButtonElement;
const modalContent = document.getElementById(
    "modalContent",
) as HTMLButtonElement;

images.forEach((image) => {
    image.addEventListener("click", () => {
        openModal(image.src);
    });
});

const openModal = (src: string) => {
    const modalImg = document.getElementById("modalImg") as HTMLImageElement;

    if (modalImg) {
        modalImg.src = src;
        modal.showModal();
    }
};

closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    modal.close();
});

// window.addEventListener("orientationchange", () => {
//   if (window.matchMedia("(orientation: landscape)").matches) {
//     // La pantalla está en modo apaisado
//     console.log("La pantalla está en modo apaisado (-)");
//   } else {
//     // La pantalla está en modo vertical
//     console.log("La pantalla está en modo vertical (I)");
//   }
// });