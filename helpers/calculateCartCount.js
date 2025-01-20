import { updateIconCount } from "./updateIconCount";
export function calculateCartCount(cartItems, cartCount) {
    cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    localStorage.setItem('cartCount', cartCount)
    updateIconCount()
}