export const load = async ({ fetch }) => {
    const res = await fetch("/api/users");
    const users = await res.json();
    return {users};
}