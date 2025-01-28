import supabase from "../supabase/config.js";

async function init() {
    const { data } = await supabase.from('products').select().order("id", { ascending: true })

    const inputImage = document.querySelector('#product-modal-edit-image_url')
    const inputName = document.querySelector('#product-modal-edit-name')
    const inputCategory = document.querySelector('#product-modal-edit-category')
    const inputPrice = document.querySelector('#product-modal-edit-price')
    const editButton = document.querySelector('#product-modal-edit-btn-save')
    const cancelButton = document.querySelector('#product-modal-edit-btn-cancel')
    let currentId = 0
    function handleCancelButtonClick() {
        const modal = document.querySelector('#product-modal-edit')
        modal.close()
    }
    async function handleEditButtonClick(id) {
        const obj = {
            id: currentId,
            image_url: inputImage.value,
            name: inputName.value,
            category: inputCategory.value,
            price: Number(inputPrice.value)

        }
        const { error } = await supabase
            .from('products')
            .update(obj)
            .eq('id', currentId)
        if (error) {
            console.error(error)
            handleCancelButtonClick()
            return
        }
        handleCancelButtonClick()
        Swal.fire({
            title: 'Producto actualizado',
            text: 'El producto ha sido actualizado exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
        }).then(() => {
            window.location.reload()
        })
    }
    editButton.addEventListener('click', handleEditButtonClick)
    cancelButton.addEventListener('click', handleCancelButtonClick)

    function editProduct(product) {
        currentId = product.id
        console.log(product)
        const modal = document.querySelector('#product-modal-edit')
        modal.showModal()
        inputName.value = product.name
        inputCategory.value = product.category
        inputPrice.value = product.price
        inputImage.value = product.image_url

    }
    data.forEach(product => {
        const productRow = document.createElement('div')
        productRow.classList.add('product-row')

        const productId = document.createElement('div')
        productId.textContent = product.id
        productId.classList.add('product-id')
        productId.classList.add('data')

        const productCategory = document.createElement('div')
        productCategory.textContent = product.category
        productCategory.classList.add('product-category')
        productCategory.classList.add('data')

        const productImage = document.createElement('img')
        productImage.src = product.image_url
        productImage.alt = product.name
        productImage.classList.add('image')
        productImage.classList.add('data')

        const productName = document.createElement('div')
        productName.textContent = product.name
        productName.classList.add('product-name')
        productName.classList.add('data')

        const productPrice = document.createElement('div')
        productPrice.textContent = `${product.price}`
        productPrice.classList.add('product-price')
        productPrice.classList.add('data')

        const productActions = document.createElement('div')
        productActions.classList.add('product-actions')
        productActions.classList.add('data')
        
        const editBtn = document.createElement('button')
        editBtn.textContent = 'Editar'
        editBtn.classList.add('btn-primary')
        editBtn.classList.add('btn')
        editBtn.addEventListener('click', () => {
            editProduct(product)
        })

        productActions.appendChild(editBtn)

        // Append children to the productRow
        productRow.appendChild(productId)
        productRow.appendChild(productImage)
        productRow.appendChild(productName)
        productRow.appendChild(productCategory)
        productRow.appendChild(productPrice)
        productRow.appendChild(productActions)

        document.querySelector('.table').appendChild(productRow)
    })
}
init()