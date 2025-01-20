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
// import { describe, it, vi, expect } from 'vitest';
// import edit from '../../users/helpers/edit';

// describe('editUser', async () => {
//   it('debería llamar a la función edit con los parámetros correctos', async () => {
//     const userId = 10;
//     const userData = {
//       username: 'daniray6',
//       password: '1234567',
//     };

//     const responseMuck = await edit(userId, userData);
//     const data = responseMuck[0]
//     expect(data.username).toBe(userData.username);
//     expect(data.password).toBe(userData.password);
//   });
// });
