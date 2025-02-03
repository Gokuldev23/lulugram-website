<script>
	import Icon from "@iconify/svelte";


    let { title = "Title" , disableBackBtn = false  } = $props()

    const goBack = () => {
        history.back()
    }
</script>


<div class="relative">
    {#if !disableBackBtn}
        <button  onclick={goBack} class="absolute left-4 top-1">
            <Icon icon="eva:arrow-back-outline" width="24" height="24" />
        </button>
    {/if}
     <h1 class="text-center md:text-3xl text-2xl  uppercase text-slate-700 font-bold mb-6">{title}</h1>
</div>