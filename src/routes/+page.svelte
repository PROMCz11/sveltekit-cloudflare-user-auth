<script>
    export let data;
    const { tasksFromServer, email, isUserVar } = data;
    import { isUser } from "$lib/stores";
    import { enhance } from "$app/forms";
    $isUser = isUserVar;

    let tasks = [];
    tasks = tasksFromServer;

    const deleteTask = (taskID) => {
        fetch("/api/tasks/delete", {
            method: "DELETE",
            body: JSON.stringify({taskID: taskID}),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(json => {
            if(json.status) {
                tasks = tasks.filter(task => task.taskID != taskID);
            }
        })
        .catch(err => console.log(err));
    }
</script>

<main>
    <div class="controls">
        <p>Account: {email}</p>
        <form action="?/addTask" method="POST" use:enhance={({ formData }) => {
            const content = formData.get("content");
            return async ({ result, update }) => {
                if(result.data) {
                    const newTask = {
                        content: content,
                        taskID: result.data
                    }

                    tasks = [...tasks, newTask];
                }
                update();
            }
        }}>
            <!-- svelte-ignore a11y-autofocus -->
            <input autofocus name="content" type="text" placeholder="Enter task">
        </form>
    </div>
    <div class="task-container">
        {#each tasks as { content, taskID }}
            <div class="task" id={taskID}><p>{content}</p><button on:click={e => {
                deleteTask(e.target.parentElement.id);
            }}>Done</button></div>
        {/each}
    </div>
</main>

<style>
    main {
        padding: .5rem;
        padding-top: 5rem;
        display: flex;
    }

    .controls {
        position: sticky;
        top: 5rem;
        max-height: calc(100vh - 5rem - .5rem);
    }

    .controls input {
        width: 100%;
    }

    .task-container {
        flex: 1;
        padding-left: .5rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .task {
        padding: .5rem;
        border: 1px solid #a1a1a166;
        max-width: 500px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: .5rem;
    }
</style>