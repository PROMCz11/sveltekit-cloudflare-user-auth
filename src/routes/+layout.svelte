<script>
    import "../../src/global.css";
    import { page } from "$app/stores";
    $: home = $page.url.pathname === "/";
    $: users = $page.url.pathname === "/users";
    $: signup = $page.url.pathname === "/signup";
</script>

<nav>
    <ul>
        <li><a class:active={home} href="/">Home</a></li>
        <li><a class:active={users} href="users">Users</a></li>
        <li><a class:active={signup} href="signup">Signup</a></li>
    </ul>
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