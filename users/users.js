import supabase from "../supabase/config";
import { deleteUser } from "./helpers/deleteUser";
import { editUser } from "./helpers/editUser";

async function init() {
    if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user.admin === false) {
            window.location.replace("/")
        }
    }
    const { data } = await supabase
        .from("users")
        .select()
    // console.log(data)
    if (data.length > 0) {
        const table = document.querySelector(".table");
        data.forEach(user => {
            const data = new Date(user.created_at);
            const times = data.toLocaleString()
            // Crear la fila principal
            const row = document.createElement("div");
            row.classList.add("users-row");
            //crea el id table 
            const idData = document.createElement("div");
            idData.classList.add("users-data");
            idData.textContent = user.id;
            // Crear las columnas de datos
            const usernameData = document.createElement("div");
            usernameData.classList.add("users-data");
            usernameData.textContent = user.username;

            const passwordData = document.createElement("input");
            passwordData.type = "password";
            passwordData.value = user.password;
            passwordData.classList.add("users-data");
            passwordData.classList.add("users-password-input");
            // passwordData.textContent = user.password;

            const createdAtData = document.createElement("div");
            createdAtData.classList.add("users-data");
            createdAtData.textContent = times;

            // const adminData = document.createElement("div");
            // adminData.classList.add("users-data");
            // adminData.textContent = user.admin;

            const functionsData = document.createElement("div");
            functionsData.classList.add("users-data");
            const editBtn = document.createElement("button");
            editBtn.addEventListener("click", () => {
                editUser(user.id, user)
            })
            editBtn.classList.add("users-edit-btn");
            editBtn.textContent = "Editar";
            functionsData.appendChild(editBtn);
            const deleteBtn = document.createElement("button");
            deleteBtn.addEventListener("click", () => {
                // deleteUser(user.id)
                deleteUser(user.id)
            })
            deleteBtn.classList.add("users-delete-btn");
            deleteBtn.textContent = "Eliminar";
            functionsData.appendChild(deleteBtn);

            // Añadir las columnas a la fila
            row.appendChild(idData)
            row.appendChild(usernameData);
            row.appendChild(passwordData);
            row.appendChild(createdAtData);
            // row.appendChild(adminData);
            row.appendChild(functionsData);

            // Añadir la fila a la tabla
            table.appendChild(row);
        });

    }
}
init()