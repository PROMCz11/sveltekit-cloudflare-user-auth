<script>
    export let data;
    const { email } = data;
</script>

<main>
    <p>Email: {email}</p>
</main>

<style>
    main {
        min-height: 100vh;
        min-height: 100svh;
        padding: .5rem;
        display: grid;
        place-content: center;
    }
</style>