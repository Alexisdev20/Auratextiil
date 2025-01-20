import { addToCar } from "./addToCar"

const container = document.querySelector(".catalog")
export function setProducts(products) {
    products.forEach(product => {
        const productElement = document.createElement("div")
        const imgElement = document.createElement("img")
        imgElement.src = product.image_url
        const h3Element = document.createElement("h3")
        const pElement = document.createElement("p")
        const buttonElement = document.createElement("button")
        productElement.classList.add("product")
        h3Element.innerText = product.name
        pElement.innerText = `S/. ${product.price}`
        buttonElement.classList.add("add-to-cart")
        buttonElement.innerText = "Añadir al carrito"
        buttonElement.addEventListener("click", () => { addToCar(product) })

        productElement.appendChild(imgElement)
        productElement.appendChild(h3Element)
        productElement.appendChild(pElement)
        productElement.appendChild(buttonElement)
        container.appendChild(productElement)
    })
}