function start() {

    const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || []
    const container = document.querySelector(".catalog")
    purchaseHistory.forEach((item) => {
        const product = document.createElement("div")
        const date = new Date(item.created_at)
        product.classList.add("product")
        product.innerHTML = `
        <a href="/purchase/item/index.html?q=${item.id}">
            <h3>${item.name}</h3>
            <h4>${item.id}</h4>
            <p>fecha: ${date.toLocaleDateString()} / ${date.toLocaleTimeString()}</p>
            <p>${item.products.length} productos</p>
            <p>total: S/.${item.total.toFixed(2)} PEN</p>
        </a>
        `
        container.appendChild(product)
    })
}
start()