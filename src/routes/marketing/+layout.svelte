<svelte:head>
    <title>Lulugram Marketing</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';

    import { agentStatusLoading } from '$lib/stores/marketing/agentStore';
	import { getAgentStatus } from '$lib/js/marketing/api/auth';
    
	import FullLoading from '$lib/Components/common/FullLoading.svelte';
	import Footer from '$lib/Components/lulugram/Footer.svelte';
	import { goto } from '$app/navigation';


    const { children } = $props();


    const handleGetAgentStatus = async () => {
        agentStatusLoading.set(true)
        let res = await getAgentStatus()
        if(!res.success){
            goto('/marketing/auth/login')
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
        <div id="slot" class="min-h-screen">
            {@render children()}
        </div>
        <Footer/>
    {/if}

</main>