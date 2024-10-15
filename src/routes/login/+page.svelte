<script>
    import { enhance } from "$app/forms";
    export let data;
    const { isUserVar } = data;
    import { isUser } from "$lib/stores";
    $isUser = isUserVar;
</script>

<main>
    <form action="?/login" method="post" use:enhance>
        <h2>Login</h2>
        <!-- <p>Username</p>
        <input type="text" name="username" placeholder="Enter your username"> -->
        <p>Email</p>
        <input type="email" name="email" placeholder="example@gmail.com">
        <p>Password</p>
        <input type="password" name="password" placeholder="Enter your password">
        <div>
            <button>Login</button>
        </div>
    </form>
    <p>Don't have an account?</p>
    <a href="/signup">Signup</a>
</main>

<style>
    main {
        min-height: 100vh;
        min-height: 100svh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        width: 200px;
        margin-bottom: .5rem;
    }

    form {
        padding: .5rem;
    }
</style>