import supabase from "../../supabase/config";

export default async function edit(userId, userData) {
    const { data, error } = await supabase
        .from("users")
        .update({
            username: userData.username,
            password: userData.password
        })
        .eq("id", userId)
        .select()
    return data
}