import supabase from "../supabase/config";
import { deleteUser } from "./helpers/deleteUser";
import { editUser } from "./helpers/editUser";
import Swal from 'sweetalert2';

let datosUsuarios = [];
let elementosPorPagina = 10;
let paginaActual = 1;

async function init() {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
        const user = JSON.parse(userJSON);
        if (!user.admin) {
            window.location.replace("/");
        }
    }

    try {
        const { data, error } = await supabase.from("users").select();
        if (error) {
            console.error("Error al obtener los usuarios:", error);
            return;
        }

        datosUsuarios = data;

        const table = document.querySelector(".table");
        if (!table) {
            console.error("No se encontró el elemento con clase 'table'");
            return;
        }

        if (data.length === 0) {
            const emptyMessage = document.createElement("div");
            emptyMessage.classList.add("empty-message");
            table.appendChild(emptyMessage);
            return;
        }

        mostrarPagina(paginaActual);
        actualizarPaginacion();

    } catch (err) {
        console.error("Error inesperado:", err);
    }
}

function createUserRow(user) {
    const row = document.createElement("div");
    row.classList.add("users-row");

    const idData = document.createElement("div");
    idData.classList.add("users-data");
    idData.textContent = user.id;

    const usernameData = document.createElement("div");
    usernameData.classList.add("users-data");
    usernameData.textContent = user.username;

    const passwordData = document.createElement("input");
    passwordData.type = "password";
    passwordData.readOnly = true;
    passwordData.value = user.password;
    passwordData.classList.add("users-data", "users-password-input");

    const createdAtData = document.createElement("div");
    createdAtData.classList.add("users-data");
    createdAtData.textContent = new Date(user.created_at).toLocaleString();

    const functionsData = document.createElement("div");
    functionsData.classList.add("users-data");

    const editBtn = document.createElement("button");
    editBtn.addEventListener("click", () => editUserWithValidation(user.id, { ...user })); // Llama a la nueva función
    editBtn.classList.add("users-edit-btn");
    editBtn.textContent = "Editar";

    const deleteBtn = document.createElement("button");
    deleteBtn.addEventListener("click", () => deleteUser(user.id));
    deleteBtn.classList.add("users-delete-btn");
    deleteBtn.textContent = "Eliminar";

    functionsData.append(editBtn, deleteBtn);

    row.append(idData, usernameData, passwordData, createdAtData, functionsData);
    return row;
}

// Nueva función editUserWithValidation
async function editUserWithValidation(userId, user) {
    await editUser(userId, user); // Abre el modal de edición

    const usernameInput = document.getElementById('users-modal-edit-username');
    const passwordInput = document.getElementById('users-modal-edit-password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');

    const saveButton = document.getElementById('users-modal-edit-btn-save');
    saveButton.addEventListener('click', async () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        usernameInput.classList.remove('error');
        passwordInput.classList.remove('error');
        usernameError.textContent = '';
        passwordError.textContent = '';

        let hasErrors = false;

        if (!username) {
            usernameInput.classList.add('error');
            usernameError.textContent = 'Por favor, ingrese el nombre de usuario.';
            hasErrors = true;
        }

        if (!password) {
            passwordInput.classList.add('error');
            passwordError.textContent = 'Por favor, ingrese la contraseña.';
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        // ... (Tu código para guardar los cambios en la base de datos usando editUser(userId, user))
        // Puedes llamar a editUser con los valores actualizados aquí.
    });
}

function mostrarPagina(pagina) {
    const table = document.querySelector(".table");
    if (!table) {
        console.error("No se encontró el elemento con clase 'table'");
        return;
    }

    while (table.children.length > 1) {
        table.removeChild(table.lastChild);
    }

    const inicio = (pagina - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const usuariosPagina = datosUsuarios.slice(inicio, fin);

    if (usuariosPagina.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.textContent = "No hay usuarios en esta página.";
        emptyMessage.classList.add("empty-message");
        table.appendChild(emptyMessage);
        return;
    }

    usuariosPagina.forEach((user) => {
        const row = createUserRow(user);
        table.appendChild(row);
    });

    document.getElementById("numero-pagina").textContent = pagina;
    paginaActual = pagina;
}

function actualizarPaginacion() {
    const totalPaginas = Math.ceil(datosUsuarios.length / elementosPorPagina);
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
    const totalPaginas = Math.ceil(datosUsuarios.length / elementosPorPagina);
    if (paginaActual < totalPaginas) {
        mostrarPagina(paginaActual + 1);
        actualizarPaginacion();
    }
});

init();
