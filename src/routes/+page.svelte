<script>
    export let data;
    const { userID, email } = data;
</script>

<main>
    <p>ID: {userID}</p>
    <p>Email: {email}</p>
</main>

<style>
    main {
        padding: .5rem;
    }
</style>