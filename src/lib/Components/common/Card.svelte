<script>

    let props = $props();

</script>


<main class="p-4 rounded-lg shadow shadow-violet-600 w-full {props.class}">
    {@render props.children?.()}
</main>