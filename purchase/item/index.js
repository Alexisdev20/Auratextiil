function start() {
    const container = document.querySelector(".catalog")
    const queryParams = new URLSearchParams(window.location.search).get("q")
    const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || []
    if (purchaseHistory.length === 0) {
        window.location.href = "/"
    }
    const item = purchaseHistory.find(item => item.id === Number(queryParams))
    container.innerHTML = ` <div class="compras-realizadas">
        <h1>COMPRAS REALIZADAS</h1>
        <div class="items-container">
            <div class="item-header">
                <div class="item-header__producto">Producto</div>
                <div class="item-header__precio">Precio</div>
                <div class="item-header__cantidad">Cantidad</div>
                <div class="item-header__total">Subtotal</div>
            </div>
            ${item.products.map((item, index) => {
        return `<div class="item-row">
                        <div class="item-row__producto">
                            <img src="${item.image_url}" width="60" class="item-row__image"/>
                            <p class="item-row__name">${item.name}</p>
                        </div>
                        <div class="item-row__precio">S/.
                            ${item.price}
                        </div>
                        <div class="item-row__cantidad">
                            ${item.quantity}
                        </div>
                        <div class="item-row__total">S/.
                            ${(item.price * item.quantity).toFixed(2)} 
                        </div>
                    </div>`
    }).join('')}
            <div class="total-row">
                <div class="total-row__label" colspan="3">Total</div>
                <div class="total-row__value" colspan="1">S/.${item.total.toFixed(2)}</div>
            </div>
        </div>
    </div> `
}
start()
