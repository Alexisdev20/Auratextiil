import supabase from "../supabase/config";
import { deleteUser } from "./helpers/deleteUser";
import { editUser } from "./helpers/editUser";

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

        if (data.length === 0) {
            const table = document.querySelector(".table");
            if (table) {
                const emptyMessage = document.createElement("div");
                emptyMessage.textContent = "No hay usuarios registrados.";
                emptyMessage.classList.add("empty-message");
                table.appendChild(emptyMessage);
            }
            return;
        }

        const table = document.querySelector(".table");
        if (!table) {
            console.error("No se encontró el elemento con clase 'table'");
            return;
        }

        data.forEach((user) => {
            const row = createUserRow(user);
            table.appendChild(row);
        });
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
    passwordData.value = user.password; // Más seguro
    passwordData.classList.add("users-data", "users-password-input");

    const createdAtData = document.createElement("div");
    createdAtData.classList.add("users-data");
    createdAtData.textContent = new Date(user.created_at).toLocaleString();

    const functionsData = document.createElement("div");
    functionsData.classList.add("users-data");

    const editBtn = document.createElement("button");
    editBtn.addEventListener("click", () => editUser(user.id, { ...user }));
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

init();
