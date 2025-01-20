// import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite"
// import { FirebaseDB } from "../firebase/config"

import supabase from "../supabase/config"

export async function validateUser(user) {
    const { data, errorConection } = await supabase
        .from("users")
        .select()
        .eq("username", user.username)
        .eq("password", user.password)
    if(data.length === 0) {
        return {
            ok: false,
            errorMessage: "Invalid username or password",
        }
    }
    return {
        ok: true,
        userData: data[0],
    }
}