<script>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	import { agentStore } from "$lib/stores/marketing/agentStore";
    import UserHome from "$lib/Components/Dashboard/UserHome.svelte";


    onMount(()=>{
        if(!$agentStore.signedIn){
            goto('/marketing/auth/login')
        }
    })
</script>

<main>
    <UserHome />
</main>
