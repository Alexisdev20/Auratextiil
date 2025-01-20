// import { updateIconCount } from "../components/addToCarFunction";

import { updateIconCount } from "../helpers/updateIconCount";

const cartItemsString = localStorage.getItem("cartItems");
let cartItems = JSON.parse(cartItemsString) || []
let cartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;
const container = document.querySelector(".container1");
const totalPrice = document.querySelector("#total-price");
function increseProduct(product) {
    // if ( === 0) {
    //     removeProduct(product)
    // }
    const newItems = cartItems.map(item => {
        if (item.id === product.id) {
            item.quantity += 1;
        }
        return item;
    })
    const newCount = newItems.reduce((acc, item) => acc + item.quantity, 0)
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    localStorage.setItem("cartCount", JSON.stringify(newCount));
    loadCart();
}
function decreaseProduct(product) {
    if (product.quantity === 1) {
        removeProduct(product)
        console.log("REMOVED")
    }
    const newItems = cartItems.map(item => {
        if (item.id === product.id) {
            item.quantity -= 1;
        }
        return item;
    })
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    loadCart();
}
function removeProduct(product) {
    const newItems = cartItems.filter(item => item.id !== product.id);
    const newCount = newItems.reduce((acc, item) => acc + item.quantity, 0)
    cartCount = newCount
    cartItems = newItems
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    localStorage.setItem("cartCount", JSON.stringify(newCount));
    loadCart();
}
function loadCart() {
    container.innerHTML = "";
    cartItems.forEach(item => {
        const row = document.createElement("tr");
        // TD
        const tableDataProduct = document.createElement("td");
        const tableDataPrice = document.createElement("td");
        const tableDataQuantity = document.createElement("td");
        const tableDataPriceTotal = document.createElement("td");
        const tableDataAction = document.createElement("td");
        //! items
        // -- product
        const productImage = document.createElement("img");
        productImage.src = item.image_url;
        productImage.alt = item.name;
        productImage.width = "50";
        const productName = document.createElement("p");
        productName.innerHTML = item.name;
        tableDataProduct.appendChild(productImage);
        tableDataProduct.appendChild(productName);
        row.appendChild(tableDataProduct);
        // -- price
        const price = document.createElement("p")
        price.innerHTML = `S/. ${item.price}`;
        tableDataPrice.appendChild(price);
        row.appendChild(tableDataPrice);
        // -- quantity
        const increaseButton = document.createElement("button");
        increaseButton.classList.add("quantity-btn");
        increaseButton.addEventListener("click", () => { increseProduct(item) });
        increaseButton.innerText = "+";
        const decreaseButton = document.createElement("button");
        decreaseButton.classList.add("quantity-btn");
        decreaseButton.addEventListener("click", () => { decreaseProduct(item) });
        decreaseButton.innerText = "-";
        const quantitySpan = document.createElement("h4");
        quantitySpan.innerHTML = item.quantity;
        tableDataQuantity.appendChild(increaseButton);
        tableDataQuantity.appendChild(quantitySpan);
        tableDataQuantity.appendChild(decreaseButton);
        row.appendChild(tableDataQuantity);

        // -- price total
        const priceTotal = document.createElement("p");
        priceTotal.innerHTML = `S/. ${(item.price * item.quantity).toFixed(2)}`;
        tableDataPriceTotal.appendChild(priceTotal);
        row.appendChild(tableDataPriceTotal);
        // -- action
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-item");
        removeButton.addEventListener("click", () => () => { removeProduct(item) });
        removeButton.innerText = "Eliminar";
        removeButton.addEventListener("click", () => { removeProduct(item) });
        tableDataAction.appendChild(removeButton);
        row.appendChild(tableDataAction);
        container.appendChild(row);
    })
    totalPrice.textContent = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

}
loadCart();
updateIconCount()
// updateIconCount()

