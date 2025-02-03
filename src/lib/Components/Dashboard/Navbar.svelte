<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { activePage, sideBarOpen } from '$lib/stores/marketing/utilStore';


    let t_dashboard = "Dashboard";
    let t_home = "Home";
    let t_verification = "Verification";
    let t_profile = "Profile";

    function navigateTo(page) {
        activePage.set(page);
    }

    function toggleSideBar() {
        $sideBarOpen = !$sideBarOpen 
    }

    const navigateToLulugram = () => {
        goto('/marketing')
    }
</script>

<nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <button class="flex items-center gap-2" on:click={navigateToLulugram}>
        <Icon icon="eva:arrow-back-outline" width="24" height="24" />
    </button>
    <div class="text-lg font-bold sm:text-xl md:text-2xl ">
        {t_dashboard}
    </div>
    <ul class="md:flex gap-8 hidden">
        <li><a href="#" class="hover:underline text-sm sm:text-base" on:click={() => navigateTo('home')}>{t_home}</a></li>
        <li><a href="#" class="hover:underline text-sm sm:text-base" on:click={() => navigateTo('verification')}>{t_verification}</a></li>
        <li><a href="#" class="hover:underline text-sm sm:text-base" on:click={() => navigateTo('profile')}>{t_profile}</a></li>
    </ul>
    <button class="block md:hidden" on:click={toggleSideBar}>
        {#if $sideBarOpen}
            <Icon icon="mingcute:close-fill" width="24" height="24" />
        {:else}
            <Icon icon="lucide:menu" width="24" height="24" />
        {/if}
    </button>
</nav>

<style>
    @media (max-width: 350px) {
        .flex {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
