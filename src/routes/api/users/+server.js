import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

export const GET = async () => {
    const { data } = await supabase
    .from("users")
    .select("*");
    return json(data);
}