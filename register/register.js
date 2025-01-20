import Swal from "sweetalert2";
import supabase from "../supabase/config";

if (localStorage.getItem("user")) {
    window.location.href = "/"
}
const username = document.querySelector("#username");
const password_1 = document.getElementById("password_1");
const password_2 = document.getElementById("password_2");
const register_btn = document.getElementById("register-btn");

async function validateForm() {
    const user = {
        username: username.value.trim(),
        password_1: password_1.value.trim(),
        password_2: password_2.value.trim(),
    }
    if (user.username === "" || user.password_1 === "" || user.password_2 === "") return
    if (user.password_1 !== user.password_2) return

    // * SUPABASE CONECTION
    const { data, errorConection } = await supabase
        .from("users")
        .select()
    if (data.some(userSome => user.username === userSome.username)) {
        Swal.fire({
            title: '¡Error!',
            text: `al parecer el usuario ${user.username} ya existe.`,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
        return
    }
    // !start create a new user

    const newUser = {
        admin: false,
        username: user.username,
        password: user.password_1,
        id: user.username,
        purchase_history: [
        ]
    }
    const { data: dataForHistoryPurchase, error } = await supabase
        .from("users")
        .insert({
            username: newUser.username,
            password: newUser.password,
        })
        .select()
    if (error) {
        console.error(error)
        return
    }
    localStorage.setItem("user", JSON.stringify(dataForHistoryPurchase[0]))
    localStorage.setItem("purchaseHistory", JSON.stringify([]))

    Swal.fire({
        title: '¡Bienvenido!',
        text: `Hola, ${user.username}. Has creado tu cuenta correctamente.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        window.location.replace("/");
    });
}

register_btn.addEventListener("click", validateForm);