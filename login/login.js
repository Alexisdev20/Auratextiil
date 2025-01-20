import supabase from "../supabase/config";
import { validateUser } from "./validateUser";

const username = document.querySelector("#username");
const password = document.getElementById("password");
const login_btn = document.getElementById("login_btn");
if (localStorage.getItem("user")) {
    window.location.href = "/";
}
async function validateForm() {

    const user = {
        username: username.value.trim(),
        password: password.value.trim(),
    };
    if (user.username === "" || user.password === "") {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, ingrese un usuario y una contraseña válidos.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
        return;
    }
    //* SUPABASE CONNECTION
    const userObject = await validateUser(user);
    if (!userObject.ok) {
        Swal.fire({
            title: 'Error',
            text: 'Usuario o contraseña inválidos.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
        return; 
    }

    localStorage.setItem("user", JSON.stringify(userObject.userData));
    const {data:validatePurchaseHistory, error} = await supabase
    .from("purchase_history")
    .select()
    .eq("userId", userObject.userData.id)

    localStorage.setItem("purchaseHistory", JSON.stringify(validatePurchaseHistory))
    Swal.fire({
        title: '¡Bienvenido!',
        text: `Hola, ${user.username}. Has iniciado sesión correctamente.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        window.location.replace("/");
    });
}

login_btn.addEventListener("click", validateForm);