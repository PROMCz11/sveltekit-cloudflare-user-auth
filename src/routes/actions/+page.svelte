<script>
    import { enhance } from "$app/forms";
</script>

<main>
    <form action="?/login" method="post" use:enhance>
        <input type="text" name="name" placeholder="name">
        <input type="text" name="password" placeholder="password">
        <button>Login</button>
    </form>
</main>

<style>
    main {
        padding: .5rem;
    }
</style>