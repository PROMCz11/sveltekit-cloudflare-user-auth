// import { supabase } from "$lib/supabaseClient";

// export const load = async () => {
//     const { data } = await supabase
//     .from("tasks")
//     .select("*")
//     const tasks = data
//     return {tasks}
// }

import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';
export const load = async ({ cookies }) => {
    const token = cookies.get("token");
    if(!token) {
        throw redirect(302, "/signup");
    }

    const userData = jwt.decode(token);
    const userID = userData.userID;
    const email = userData.email;
    const { data } = await supabase
    .from("users")
    .select("userID")
    .eq("userID", userID)
    .limit(1);
    
    if(!data.length) {
        throw redirect(302, "/signup");
    }
}