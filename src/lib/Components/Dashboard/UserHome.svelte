<script>
    import Navbar from "./Navbar.svelte";
    import UserProfile from "./UserProfile.svelte";
    import UserNavbar from "./UserNavbar.svelte";
    import Settings from "./Settings.svelte";
    import Verification from "./Verification.svelte";

    import { writable } from 'svelte/store';

    // Reactive variable to manage the active page
    let activePage = writable('home');
</script>

<main class="bg-gray-100 min-h-screen">
    <Navbar {activePage} />
    {#if $activePage === "home"}
        <UserProfile />
        <UserNavbar />
    {:else if $activePage === "verification"}
        <Verification />
    {:else if $activePage === "settings"}
        <Settings />
    {/if}
</main>

<style>
    /* Add any additional styles if needed */
</style>
