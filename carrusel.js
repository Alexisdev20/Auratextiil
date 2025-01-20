// let currentIndex = 0;
// const items = document.querySelectorAll('.carousel-item');
// const totalItems = items.length;
// const prevButton = document.getElementById('prev');
// const nextButton = document.getElementById('next');

// function updateCarousel() {
//     const offset = -currentIndex * 100; // Desplazamiento horizontal basado en el índice
//     const carousel = document.querySelector('.carousel-images')
//     carousel.style.transform = `translateX(${offset}%)`;
// }
// // ->
// nextButton.addEventListener('click', () => {
//     if (currentIndex === totalItems - 1) {
//         currentIndex = 0; // Si estamos en el último elemento, volvemos al primero
//     } else {
//         currentIndex = currentIndex + 1; // De lo contrario, avanzamos al siguiente elemento
//     }
//     updateCarousel();
// });
// // <--
// prevButton.addEventListener('click', () => {
//     if (currentIndex === 0) {
//         currentIndex = totalItems - 1; // Si estamos en el primer elemento, volvemos al último
//     } else {
//         currentIndex = currentIndex - 1; // De lo contrario, retrocedemos al elemento anterior
//     }
//     updateCarousel();
// });


