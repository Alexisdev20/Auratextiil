import supabase from "../supabase/config";
import { deleteUser } from "./helpers/deleteUser";
import { editUser } from "./helpers/editUser";

async function fetchDataAndInitialize() {
    // Verifica si el usuario está en el localStorage
    if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.admin === false) {
            window.location.replace("/");
            return; // Termina la ejecución si no es admin
        }
    }

    // Obtén los datos de los usuarios
    const { data, error } = await supabase.from("users").select();

    // Si hay un error al obtener los datos, puedes manejarlo aquí
    if (error) {
        console.error("Error al obtener los datos", error);
        return;
    }

    // Si hay datos, continúa con la lógica
    if (data.length > 0) {
        const table = document.querySelector(".table");

        data.forEach(user => {
            const createdAt = new Date(user.created_at);
            const times = createdAt.toLocaleString();

            // Crear la fila principal
            const row = document.createElement("div");
            row.classList.add("users-row");

            // Crear las columnas de datos
            const idData = document.createElement("div");
            idData.classList.add("users-data");
            idData.textContent = user.id;

            const usernameData = document.createElement("div");
            usernameData.classList.add("users-data");
            usernameData.textContent = user.username;

            const passwordData = document.createElement("input");
            passwordData.type = "password";
            passwordData.value = user.password;
            passwordData.classList.add("users-data", "users-password-input");

            const createdAtData = document.createElement("div");
            createdAtData.classList.add("users-data");
            createdAtData.textContent = times;

            const functionsData = document.createElement("div");
            functionsData.classList.add("users-data");

            // Botón para editar
            const editBtn = document.createElement("button");
            editBtn.addEventListener("click", () => {
                editUser(user.id, user);
            });
            editBtn.classList.add("users-edit-btn");
            editBtn.textContent = "Editar";
            functionsData.appendChild(editBtn);

            // Botón para eliminar
            const deleteBtn = document.createElement("button");
            deleteBtn.addEventListener("click", () => {
                deleteUser(user.id);
            });
            deleteBtn.classList.add("users-delete-btn");
            deleteBtn.textContent = "Eliminar";
            functionsData.appendChild(deleteBtn);

            // Añadir las columnas a la fila
            row.appendChild(idData);
            row.appendChild(usernameData);
            row.appendChild(passwordData);
            row.appendChild(createdAtData);
            row.appendChild(functionsData);

            // Añadir la fila a la tabla
            table.appendChild(row);
        });
    }
}

// Llamada a la función para iniciar
fetchDataAndInitialize();
