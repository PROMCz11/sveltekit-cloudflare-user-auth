import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

export const DELETE = async ({ request }) => {
    const { userID } = await request.json();
    const { data } = await supabase
    .from('users')
    .delete()
    .eq('userID', userID);
    return json(userID);
}