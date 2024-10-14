import { supabase } from "$lib/supabaseClient";

export const load = async () => {
    const { data } = await supabase
    .from("tasks")
    .select("*")
    const tasks = data
    return {tasks}
}