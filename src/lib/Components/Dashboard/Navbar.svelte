<script>
    import { writable } from 'svelte/store';

    export let activePage = writable('home');

    let t_dashboard = "Dashboard";
    let t_home = "Home";
    let t_verification = "Verification";
    let t_profile = "Profile";

    function navigateTo(page) {
        activePage.set(page);
    }
</script>

<nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
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
