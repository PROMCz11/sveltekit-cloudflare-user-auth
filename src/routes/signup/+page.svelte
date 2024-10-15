<script>
    import { enhance } from "$app/forms";
    export let data;
    const { isUserVar } = data;
    import { isUser } from "$lib/stores";
    $isUser = isUserVar;
    let errorMessage;
    let showLoading = false;
</script>

<main>
    <form action="?/signup" method="post" use:enhance={() => {
        showLoading = true;
        return async ({ result, update }) => {
            if(result.data) {
                errorMessage = result.data.message;
            }
            showLoading = false;
            update();
        }
    }}>
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
    {#if errorMessage}
        <p class="warning">{errorMessage}</p>
    {/if}
    <p>Already have an account?</p>
    <a href="/login">Login</a>

    <!-- Loading -->
    {#if showLoading}
        <div class="loading">
            <p>Loading...</p>
        </div>
    {/if}
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

    .warning {
        color: red;
    }

    .loading {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
    }
</style>