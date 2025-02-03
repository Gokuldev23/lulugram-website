<script>
    import { activePage } from "$lib/stores/marketing/utilStore";
    
    import Navbar from "./Navbar.svelte";
    import UserProfile from "./UserProfile.svelte";
    import UserNavbar from "./UserNavbar.svelte";
    import Profile from "./Profile/Profile.svelte";
    import Verification from "./Verification/Verification.svelte";

 
</script>

<main class="bg-gray-100 min-h-screen">
    <Navbar {activePage} />
    {#if $activePage === "home"}
        <UserProfile />
        <UserNavbar />
    {:else if $activePage === "verification"}
        <Verification />
    {:else if $activePage === "profile"}
        <Profile />
    {/if}
</main>

<style>
    /* Add any additional styles if needed */
</style>
