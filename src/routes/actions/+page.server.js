export const actions = {
    login: async ({ request }) => {
        const formData = await request.formData();
        console.log(formData.get("name"));
        return {name: formData.get("name"), password: formData.get("password")}
    }
};