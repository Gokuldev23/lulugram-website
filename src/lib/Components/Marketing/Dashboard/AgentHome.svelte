<script>
    import { activePage } from "$lib/stores/marketing/utilStore";
    
    import Navbar from "./Navbar.svelte";
    import AgentProfileHeader from "./AgentProfileHeader.svelte";
    import AgentNavbar from "./AgentNavbar.svelte";
    import Profile from "./Profile/Profile.svelte";
    import Verification from "./Verification/Verification.svelte";
    
</script>

<main class="bg-gray-100 min-h-screen">
    <Navbar {activePage} />
    {#if $activePage === "home"}
        <AgentProfileHeader />
        <AgentNavbar />
    {:else if $activePage === "verification"}
        <Verification />
    {:else if $activePage === "profile"}
        <Profile />
    {/if}
</main>

<style>
    /* Add any additional styles if needed */
</style>
