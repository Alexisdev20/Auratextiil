import supabase from "../supabase/config.js";
import Swal from 'sweetalert2';

let datosProductos = [];
let elementosPorPagina = 10;
let paginaActual = 1;

async function init() {
    try {
        const { data, error } = await supabase.from('products').select().order("id", { ascending: true });
        if (error) {
            console.error("Error al obtener los productos:", error);
            return;
        }

        datosProductos = data;
        mostrarPagina(paginaActual);
        actualizarPaginacion();

    } catch (err) {
        console.error("Error inesperado:", err);
    }
}

function mostrarPagina(pagina) {
    const table = document.querySelector('.table');
    if (!table) return;

    while (table.children.length > 1) {
        table.removeChild(table.lastChild);
    }

    const inicio = (pagina - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const productosPagina = datosProductos.slice(inicio, fin);

    if (productosPagina.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.textContent = "No hay productos en esta página.";
        emptyMessage.classList.add("empty-message");
        table.appendChild(emptyMessage);
        return;
    }

    productosPagina.forEach(product => {
        const productRow = createProductRow(product);
        table.appendChild(productRow);
    });

    document.getElementById("numero-pagina").textContent = pagina;
    paginaActual = pagina;
}

function actualizarPaginacion() {
    const totalPaginas = Math.ceil(datosProductos.length / elementosPorPagina);
    const paginaAnteriorBtn = document.getElementById("pagina-anterior");
    const paginaSiguienteBtn = document.getElementById("pagina-siguiente");

    paginaAnteriorBtn.disabled = paginaActual <= 1;
    paginaSiguienteBtn.disabled = paginaActual >= totalPaginas;
}

document.getElementById("pagina-anterior").addEventListener("click", () => {
    if (paginaActual > 1) {
        mostrarPagina(paginaActual - 1);
        actualizarPaginacion();
    }
});

document.getElementById("pagina-siguiente").addEventListener("click", () => {
    const totalPaginas = Math.ceil(datosProductos.length / elementosPorPagina);
    if (paginaActual < totalPaginas) {
        mostrarPagina(paginaActual + 1);
        actualizarPaginacion();
    }
});

function createProductRow(product) {
    const productRow = document.createElement('div');
    productRow.classList.add('product-row');

    const productId = document.createElement('div');
    productId.textContent = product.id;
    productId.classList.add('product-id', 'data');

    const productCategory = document.createElement('div');
    productCategory.textContent = product.category;
    productCategory.classList.add('product-category', 'data');

    const productImage = document.createElement('img');
    productImage.src = product.image_url;
    productImage.alt = product.name;
    productImage.classList.add('image', 'data');

    const productName = document.createElement('div');
    productName.textContent = product.name;
    productName.classList.add('product-name', 'data');

    const productPrice = document.createElement('div');
    productPrice.textContent = `${product.price}`;
    productPrice.classList.add('product-price', 'data');

    const productActions = document.createElement('div');
    productActions.classList.add('product-actions', 'data');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.classList.add('btn-primary', 'btn');
    editBtn.addEventListener('click', () => {
        editProduct(product);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('btn-danger', 'btn');
    deleteBtn.addEventListener('click', () => {
        deleteProduct(product.id);
    });

    productActions.appendChild(editBtn);
    productActions.appendChild(deleteBtn);

    productRow.appendChild(productId);
    productRow.appendChild(productImage);
    productRow.appendChild(productName);
    productRow.appendChild(productCategory);
    productRow.appendChild(productPrice);
    productRow.appendChild(productActions);

    return productRow;
}

const inputImage = document.querySelector('#product-modal-edit-image_url');
const inputName = document.querySelector('#product-modal-edit-name');
const inputCategory = document.querySelector('#product-modal-edit-category');
const inputPrice = document.querySelector('#product-modal-edit-price');
const editButton = document.querySelector('#product-modal-edit-btn-save');
const cancelButton = document.querySelector('#product-modal-edit-btn-cancel');
let currentId = 0;

function handleCancelButtonClick() {
    const modal = document.querySelector('#product-modal-edit');
    modal.close();
}

const addProductBtn = document.getElementById('add-product-btn');
const addProductModal = document.getElementById('add-product-modal');
const addProductImage = document.getElementById('add-product-image_url');
const addProductName = document.getElementById('add-product-name');
const addProductCategory = document.getElementById('add-product-category');
const addProductPrice = document.getElementById('add-product-price');
const addProductBtnSave = document.getElementById('add-product-btn-save');
const addProductBtnCancel = document.getElementById('add-product-btn-cancel');

addProductBtn.addEventListener('click', () => {
    clearAddProductModal(); // Limpia el modal antes de abrirlo
    addProductModal.showModal();
});

addProductBtnCancel.addEventListener('click', () => {
    addProductModal.close();
});

async function handleEditButtonClick(id) {
    // Limpiar mensajes de error
    document.getElementById('image-error').textContent = '';
    document.getElementById('name-error').textContent = '';
    document.getElementById('category-error').textContent = '';
    document.getElementById('price-error').textContent = '';

    // Limpiar clases de error
    inputImage.classList.remove('error');
    inputName.classList.remove('error');
    inputCategory.classList.remove('error');
    inputPrice.classList.remove('error');

    let hasErrors = false;

    // Validación de campos vacíos
    if (inputName.value.trim() === "") {
        document.getElementById('name-error').textContent = 'Por favor complete el campo.';
        inputName.classList.add('error');
        hasErrors = true;
    }
    if (inputImage.value.trim() === "") {
        document.getElementById('image-error').textContent = 'Por favor complete el campo.';
        inputImage.classList.add('error');
        hasErrors = true;
    }

    if (inputPrice.value.trim() === "") {
        document.getElementById('price-error').textContent = 'Por favor complete el campo.';
        inputPrice.classList.add('error');
        hasErrors = true;
    }

    // Validación de URL de imagen
    if (!isValidUrl(inputImage.value)) {
        document.getElementById('image-error').textContent = 'Por favor ingrese una URL válida.';
        inputImage.classList.add('error');
        hasErrors = true;
    }

    // Validación de precio
    const price = parseFloat(inputPrice.value);
    if (isNaN(price) || price < 0 || !/^\d+(\.\d{1,2})?$/.test(inputPrice.value)) {
        document.getElementById('price-error').textContent = 'Por favor ingrese un precio válido (número positivo con hasta 2 decimales).';
        inputPrice.classList.add('error');
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    const obj = {
        id: id,
        image_url: inputImage.value,
        name: inputName.value,
        category: document.querySelector('#product-modal-edit-category').value, // Obtén el valor seleccionado
        price: price
    };

    const { error } = await supabase
        .from('products')
        .update(obj)
        .eq('id', id);

    if (error) {
        console.error(error);
        handleCancelButtonClick();
        return;
    }

    handleCancelButtonClick();
    Swal.fire({
        title: 'Producto actualizado',
        text: 'El producto ha sido actualizado exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    }).then(() => {
        window.location.reload();
    });
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

async function deleteProduct(productId) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarlo!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) {
                console.error(error);
                Swal.fire(
                    'Error!',
                    'No se pudo eliminar el producto.',
                    'error'
                );
            } else {
                Swal.fire(
                    'Eliminado!',
                    'El producto ha sido eliminado.',
                    'success'
                ).then(() => {
                    window.location.reload();
                });
            }
        }
    });
}

async function handleAddProduct() {
    // Limpiar mensajes de error
    document.getElementById('add-image-error').textContent = '';
    document.getElementById('add-name-error').textContent = '';
    document.getElementById('add-category-error').textContent = '';
    document.getElementById('add-price-error').textContent = '';

    // Limpiar clases de error
    addProductImage.classList.remove('error');
    addProductName.classList.remove('error');
    addProductCategory.classList.remove('error');
    addProductPrice.classList.remove('error');

    let hasErrors = false;

    // Validación de campos vacíos
    if (addProductName.value.trim() === "") {
        document.getElementById('add-name-error').textContent = 'Por favor complete el campo.';
        addProductName.classList.add('error');
        hasErrors = true;
    }
    if (addProductImage.value.trim() === "") {
        document.getElementById('add-image-error').textContent = 'Por favor complete el campo.';
        addProductImage.classList.add('error');
        hasErrors = true;
    }
    if (addProductPrice.value.trim() === "") {
        document.getElementById('add-price-error').textContent = 'Por favor complete el campo.';
        addProductPrice.classList.add('error');
        hasErrors = true;
    }

    // Validación de URL de imagen
    if (!isValidUrl(addProductImage.value)) {
        document.getElementById('add-image-error').textContent = 'Por favor ingrese una URL válida.';
        addProductImage.classList.add('error');
        hasErrors = true;
    }

    // Validación de precio
    const price = parseFloat(addProductPrice.value);
    if (isNaN(price) || price < 0 || !/^\d+(\.\d{1,2})?$/.test(addProductPrice.value)) {
        document.getElementById('add-price-error').textContent = 'Por favor ingrese un precio válido (número positivo con hasta 2 decimales).';
        addProductPrice.classList.add('error');
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    const newProduct = {
        image_url: addProductImage.value,
        name: addProductName.value,
        category: addProductCategory.value,
        price: price
    };
    console.log("down")
    const { error } = await supabase.from('products').insert(newProduct);

    if (error) {
        console.error(error);
        Swal.fire('Error!', 'No se pudo agregar el producto.', 'error');
        return;
    }

    addProductModal.close();
    Swal.fire('Producto agregado', 'El producto ha sido agregado exitosamente', 'success').then(() => {
        window.location.reload();
    });
}

addProductBtnSave.addEventListener('click', handleAddProduct);
editButton.addEventListener('click', () => handleEditButtonClick(currentId));
cancelButton.addEventListener('click', handleCancelButtonClick);

function editProduct(product) {
    currentId = product.id;
    const modal = document.querySelector('#product-modal-edit');
    modal.showModal();
    inputName.value = product.name;
    inputPrice.value = product.price;
    inputImage.value = product.image_url;
    document.querySelector('#product-modal-edit-category').value = product.category; // Selecciona la opción correcta
}

function clearAddProductModal() {
    addProductImage.value = '';
    addProductName.value = '';
    addProductCategory.value = 'female'; // Puedes establecer un valor predeterminado
    addProductPrice.value = '';

    document.getElementById('add-image-error').textContent = '';
    document.getElementById('add-name-error').textContent = '';
    document.getElementById('add-category-error').textContent = '';
    document.getElementById('add-price-error').textContent = '';

    addProductImage.classList.remove('error');
    addProductName.classList.remove('error');
    addProductCategory.classList.remove('error');
    addProductPrice.classList.remove('error');
}

init();