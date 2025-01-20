import Swal from "sweetalert2"
import supabase from "../../supabase/config"

const modalUsersDelete = document.getElementById("users-modal-delete")
const deleteConfirmBtn = document.getElementById("users-delete-confirm")
const deleteCancelBtn = document.getElementById("users-delete-cancel")
async function deleteUserSupabase(id) {
    modalUsersDelete.close()
    const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", id)
    const { data: validatePurchaseHistory, error: errorPurchaseHistory } = await supabase
        .from("purchase_history")
        .delete()
        .eq("userId", id)
        
    Swal.fire({
        title: '¡Eliminado!',
        text: 'El usuario se ha eliminado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        window.location.reload();
    });
}
export function deleteUser(id) {
    modalUsersDelete.showModal()
    deleteCancelBtn.addEventListener("click", () => {
        modalUsersDelete.close()
    })
    deleteConfirmBtn.addEventListener("click", () => {
        deleteUserSupabase(id)
    })
}