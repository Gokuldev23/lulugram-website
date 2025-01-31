<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';

    export let activePage = writable('home');

    let t_dashboard = "Dashboard";
    let t_home = "Home";
    let t_verification = "Verification";
    let t_profile = "Profile";

    function navigateTo(page) {
        activePage.set(page);
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
    <div class="text-lg font-bold sm:text-xl md:text-2xl">{t_dashboard}</div>
    <ul class="flex gap-8">
        <li><a href="#" class="hover:underline text-sm sm:text-base" on:click={() => navigateTo('home')}>{t_home}</a></li>
        <li><a href="#" class="hover:underline text-sm sm:text-base" on:click={() => navigateTo('verification')}>{t_verification}</a></li>
        <li><a href="#" class="hover:underline text-sm sm:text-base" on:click={() => navigateTo('profile')}>{t_profile}</a></li>
    </ul>
</nav>

<style>
    @media (max-width: 350px) {
        .flex {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
