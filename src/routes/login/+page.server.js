import { supabase } from "$lib/supabaseClient";
import { SECRET_JWT_KEY } from "$env/static/private";
import jwt from '@tsndr/cloudflare-worker-jwt';
import { redirect } from "@sveltejs/kit";
import { verifyPassword } from "$lib/auth";

const generateJWT = async (userID, email) => {
    const token = await jwt.sign({
        userID: userID,
        email: email
    }, SECRET_JWT_KEY);
    return token;
}

const checkUserCredentials = async (email, password) => {
    const { data: user, error } = await supabase
    .from('users')
    .select('userID, password')
    .eq('email', email)
    .single();

    if(error) {
        console.log(error);
        return;
    }

    // if(user.password === password) {
    //     return user.userID;
    // }

    const isValidPassword = await verifyPassword(user.password, password);
    if(isValidPassword) {
        return user.userID;
    }
}

export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        // const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        // Validate all inputs
        if(!email || !password) {
            return {
                message: 'Error, Provide valid credentials.'
            };
        }
        const userID = await checkUserCredentials(email, password);
        if(!userID) {
            return {
                message: 'Loggin in failed. Please try again.'
            };
        }
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