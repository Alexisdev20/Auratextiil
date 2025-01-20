import supabase from "../../supabase/config";

export default async function deleteUser(id) {
    const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", id)
        .select("*");
    return data
}
