<script>
    export let data;
    let { users } = data;

    const deleteUser = (userID) => {
        fetch("/api/users/delete", {
            method: "DELETE",
            body: JSON.stringify({
                userID: userID
            }),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(json => {
            const deletedUserID = json;
            users = users.filter(user => user.userID != deletedUserID);
        })
        .catch(err => console.log(err));
    }
</script>

<main>
    <p>Click on a user to delete</p>
    <div class="users-container">
        {#each users as { userID, username, email }}
        <button on:click={e => {
            if(e.target.classList.contains("user")) {
                deleteUser(e.target.id);
            }
            else if(e.target.parentElement.classList.contains("user")) {
                deleteUser(e.target.parentElement.id);
            }
        }} class="user" id={userID}>
            <p>ID: {userID}</p>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
        </button>
        {:else}
            <p>No users at the moment</p>
        {/each}
    </div>
</main>

<style>
    main {
        min-height: 100vh;
        min-height: 100svh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: .5rem;
    }

    .users-container {
        max-width: max-content;
    }

    .user {
        padding: .5rem;
        border: 1px solid;
        margin-bottom: .5rem;
        display: block;
        width: 100%;
    }

    .user p {
        text-align: left;
    }
</style>