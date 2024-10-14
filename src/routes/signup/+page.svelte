<script>
    import { enhance } from "$app/forms";
</script>

<main>
    <form action="?/signup" method="post" use:enhance>
        <h2>Create an account</h2>
        <p>Username</p>
        <input type="text" name="username" placeholder="Enter your username">
        <p>Email</p>
        <input type="email" name="email" placeholder="example@gmail.com">
        <p>Password</p>
        <input type="password" name="password" placeholder="Enter a strong password">
        <div>
            <button>Signup</button>
        </div>
    </form>
</main>

<style>
    main {
        min-height: 100vh;
        min-height: 100svh;
        display: flex;
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