import { supabase } from "$lib/supabaseClient";
import { SECRET_JWT_KEY } from "$env/static/private";
import jwt from '@tsndr/cloudflare-worker-jwt';
import { redirect } from "@sveltejs/kit";

const generateJWT = async (userID, email) => {
    // return jwt.encode({userID: userID, email: email}, SECRET_JWT_KEY);
    const token = await jwt.sign({
        userID: userID,
        email: email
    }, SECRET_JWT_KEY);
    return token;
}

const insertUser = async (username, email, password) => {
    const { data, error } = await supabase
    .from('users')
    .insert([
        {
            username: username,
            email: email,
            password: password
        }
    ])
    .select("userID");

    if(error) {
        console.error('Error inserting user:', error);
    }

    return data[0].userID;
}

export const actions = {
    signup: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        // Validate all inputs
        const userID = await insertUser(username, email, password);
        // Generate a JWT token then save it in cookies then redirect to the homepage
        const token = await generateJWT(userID, email);
        cookies.set('token', token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7 * 30
        });

        throw redirect(303, "/");
    }
    
}