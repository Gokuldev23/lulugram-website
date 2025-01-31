<script>
	import { goto } from "$app/navigation";
	import { agentStore } from "$lib/stores/marketing/agentStore";
    
    import UserHome from "$lib/Components/Dashboard/UserHome.svelte";


    $effect(()=>{
        if(!$agentStore.signedIn){
            goto('/marketing/auth/login')
        }
    })
</script>

<main>
    <UserHome />
</main>
