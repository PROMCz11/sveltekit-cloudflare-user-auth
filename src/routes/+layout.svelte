<script>
    import "../../src/global.css";
    import { page } from "$app/stores";
    $: home = $page.url.pathname === "/";
    $: users = $page.url.pathname === "/users";
    $: login = $page.url.pathname === "/login";
    $: signup = $page.url.pathname === "/signup";
    import { isUser } from "$lib/stores";
</script>

<nav>
    <ul>
        <li><a class:active={home} href="/">Home</a></li>
        <li><a class:active={users} href="users">Users</a></li>
        {#if signup}
            <li><a class:active={signup} href="signup">Signup</a></li>
        {:else}
            <li><a class:active={login} href="login">Login</a></li>
        {/if}
    </ul>
    {#if $isUser}
        <a href="/logout"><button>Logout</button></a>
    {/if}
</nav>

<slot></slot>

<style>
    nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        font-size: 1.1rem;
        padding: 1rem;
        background-color: #1a1a1a;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 5rem;
    }

    a {
        padding: .2rem;
    }

    a.active {
        background-color: white;
        color: black;
    }
</style>