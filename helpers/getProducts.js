import supabase from "../supabase/config"

export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select()
    if(error) {
        return {
            ok: false,
            errorMessage: "Server Errir"
        }
    }
    return {
        ok: true,
        data
    }
}

