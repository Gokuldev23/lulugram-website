<svelte:head>
    <title>Lulugram Marketing</title>
</svelte:head>

<script>
	import { getAgentStatus } from '$lib/js/marketing/api/auth';
    
	import FullLoading from '$lib/Components/common/FullLoading.svelte';


    const { children } = $props();

    let loading = $state(false)

    const handleGetAgentStatus = async () => {
        loading = true
        let res = await getAgentStatus()
        loading = false
    }

    $effect(()=>{
        handleGetAgentStatus()
    })
</script>


<main class="">

    {#if loading}
        <FullLoading/>
    {:else}
        <div id="slot">
            {@render children()}
        </div>
    {/if}

</main>