import { supabase } from "$lib/supabaseClient";
import { SECRET_JWT_KEY } from "$env/static/private";
import jwt from '@tsndr/cloudflare-worker-jwt';
import { redirect } from "@sveltejs/kit";
import { hashPassword } from "$lib/auth";

const generateJWT = async (userID, email) => {
    const token = await jwt.sign({
        userID: userID,
        email: email
    }, SECRET_JWT_KEY);
    return token;
}

const insertUser = async (username, email, password) => {
    if(!username || !email || !password) {
        return;
    }
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
        return;
    }

    return data[0].userID;
}

export const actions = {
    signup: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const email = formData.get("email");
        const unhashedPassword = formData.get("password");
        const password = await hashPassword(unhashedPassword);
        // Validate all inputs
        const userID = await insertUser(username, email, password);
        if(!userID) {
            return {
                message: 'Account creation failed. Please try again.'
            };
        }
        // Generate a JWT token then save it in cookies then redirect to the homepage
        const token = await generateJWT(userID, email);
        cookies.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 * 30
        });

        throw redirect(303, "/");
    }
    
}

export const load = ({ cookies }) => {
    const token = cookies.get("token");

    if(token) {
        throw redirect(303, "/");
    }

    return {isUserVar: false}
}