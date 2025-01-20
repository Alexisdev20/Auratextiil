import { calculateCartCount } from "./calculateCartCount";
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let cartCount = JSON.parse(localStorage.getItem('cartCount')) || 0;
const isUserLogin = !!JSON.parse(localStorage.getItem("user"))
export async function addToCar(product) {
    if (!isUserLogin) { return window.location.href = "/login/index.html" }
    const existingProduct = cartItems.some(item => item.id === product.id);
    if (existingProduct) {
        cartItems = cartItems.map(item => {
            if (item.id === product.id) {
                item.quantity += 1
            }
            return item
        })
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        calculateCartCount(cartItems, cartCount)
        return
    }
    cartItems.push({ ...product, quantity: 1 })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    Swal.fire({
        title: '¡Producto añadido al carrito!',
        text: 'El producto ha sido agregado a tu carrito.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        position: 'top',
        timer: 1500,
        showConfirmButton: false,
        customClass: {
            popup: 'custom-popup'
        },
        background: '#28a745',
        color: '#ffffff',
        timerProgressBar: true,
        imageUrl: product.image, // Mostrar la imagen del producto en la alerta
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: product.name
    });
    calculateCartCount(cartItems, cartCount)
}