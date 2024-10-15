import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";
import { SECRET_JWT_KEY } from "$env/static/private";
import jwt from '@tsndr/cloudflare-worker-jwt';
export const load = async ({ cookies }) => {
    const token = cookies.get("token");
    if(!token) {
        throw redirect(302, "/login");
    }

    const verifiedToken = await jwt.verify(token, SECRET_JWT_KEY);
    const userData = verifiedToken.payload;
    const userID = userData.userID;
    const email = userData.email;

    // const { data, error } = await supabase
    // .from("tasks")
    // .select("*")
    // .eq("userID", userID);


    // if(error) {
    //     console.log(error);
    //     cookies.delete("token", { path: "/" });
    //     throw redirect(302, "/login");
    // }

    const { data, error } = await supabase
    .from("users")
    .select("userID")
    .eq("userID", userID)
    .single();

    if (error || !data) {
        cookies.delete("token", { path: "/" });
        throw redirect(302, "/login"); // Redirect if user is not found
    }

    const { data: tasksData, error: tasksError } = await supabase
    .from("tasks")
    .select("*")
    .eq("userID", userID);

    if (tasksError) {
        console.log(tasksError);
        cookies.delete("token", { path: "/" });
        throw redirect(302, "/login");
    }

    const isUserVar = true;
    const tasksFromServer = tasksData;

    // return {userID, email, isUserVar};
    return {tasksFromServer, email, isUserVar};
}

export const actions = {
    addTask: async ({ request, cookies }) => {
        const formData = await request.formData();
        const content = formData.get("content");

        const token = cookies.get("token");
        const verifiedToken = await jwt.verify(token, SECRET_JWT_KEY);
        const userData = verifiedToken.payload;
        const userID = userData.userID;

        const { data, error } = await supabase
        .from('tasks')
        .insert({ content, userID })
        .select("taskID");

        if(error) {
            // do something, maybe send an error message
            return;
        }

        return data[0].taskID;
    }
}