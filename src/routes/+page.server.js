import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";
import { SECRET_JWT_KEY } from "$env/static/private";
import jwt from '@tsndr/cloudflare-worker-jwt';
export const load = async ({ cookies }) => {
    const token = cookies.get("token");
    if(!token) {
        throw redirect(302, "/signup");
    }

    const verifiedToken = await jwt.verify(token, SECRET_JWT_KEY);
    const userData = verifiedToken.payload;
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

    return {userID, email};
}