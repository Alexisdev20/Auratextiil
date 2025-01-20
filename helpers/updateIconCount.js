export function updateIconCount() {
    const iconCount = document.querySelector('.cart-count')
    iconCount.innerText = localStorage.getItem('cartCount')
}