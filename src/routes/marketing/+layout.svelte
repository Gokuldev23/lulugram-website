<svelte:head>
    <title>Lulugram Marketing</title>
</svelte:head>

<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

    import { agentStatusLoading } from '$lib/stores/marketing/agentStore';
	import { getAgentStatus } from '$lib/js/marketing/api/auth';
    
	import FullLoading from '$lib/Components/common/FullLoading.svelte';
	import Footer from '$lib/Components/lulugram/Footer.svelte';


    const { children } = $props();


    const handleGetAgentStatus = async () => {
        agentStatusLoading.set(true)
        let res = await getAgentStatus()
        if(!res.success){
            goto('/marketing')
        }
        agentStatusLoading.set(false)
    }

    onMount(()=>{
        handleGetAgentStatus()
    })
</script>


<main class="">

    {#if $agentStatusLoading}
        <FullLoading/>
    {:else}
        <div id="slot" class="">
            {@render children()}
        </div>
    {/if}

</main>