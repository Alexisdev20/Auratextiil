import supabase from "../../supabase/config";
const modalUsersEdit = document.getElementById("users-modal-edit")
const usersModalEditCloseBtn = document.querySelector(".users-modal-close-btn");

const saveBtn = document.getElementById("users-modal-edit-btn-save")
const modalInputUsername = document.getElementById("users-modal-edit-username")
const modalInputPassword = document.getElementById("users-modal-edit-password")

function closeModal() {
    modalUsersEdit.close()
}
usersModalEditCloseBtn.addEventListener("click", closeModal)
async function validateForm(id) {
    const { data, error } = await supabase
        .from("users")
        .update({
            username: modalInputUsername.value,
            password: modalInputPassword.value
        })
        .eq("id", id)
    closeModal()
    Swal.fire({
        title: '¡Datos actualizados!',
        text: 'Los cambios se han guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        window.location.reload();
    });
}
export async function editUser(userId, userData) {
    modalInputUsername.value = userData.username
    modalInputPassword.value = userData.password
    modalUsersEdit.showModal()
    saveBtn.addEventListener("click", () => {
        validateForm(userId)
    })

}

