import { json } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

export const DELETE = async ({ request }) => {
    const requestJSON = await request.json();
    const taskID = requestJSON.taskID;
    const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("taskID", taskID);

    if(error) {
        console.log(error);
        return;
    }

    return json({status: true});
}