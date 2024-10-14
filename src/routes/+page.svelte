<script>
    export let data;
    let { tasks } = data;
</script>

<main>
    {#each tasks as { content }}
        <div class="task">{content}</div>
    {/each}
</main>

<style>
    main {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        padding: .5rem;
    }

    .task {
        padding: .5rem;
        border: 1px solid #a1a1a166;
        background-color: black;
    }
</style>