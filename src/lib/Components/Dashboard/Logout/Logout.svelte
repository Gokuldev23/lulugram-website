<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let t_logout = "Logout"

    function handleLogout() {
        dispatch('logout');
    }
</script>

<button
    class="px-4 py-2 bg-red-500 text-white rounded-lg transition-colors duration-300 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-10"
    on:click={handleLogout}
>
    {t_logout}
</button>

<style>
    .transition-colors {
        transition-property: background-color, border-color, color, fill, stroke;
    }
    .duration-300 {
        transition-duration: 300ms;
    }
    .hover\:bg-red-600:hover {
        background-color: #e53e3e;
    }
    .active\:bg-red-700:active {
        background-color: #c53030;
    }
    .focus\:outline-none:focus {
        outline: none;
    }
    .focus\:ring-2:focus {
        box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
    }
    .focus\:ring-red-500:focus {
        --tw-ring-color: rgba(239, 68, 68, 0.5);
    }
    .focus\:ring-opacity-50:focus {
        --tw-ring-opacity: 0.5;
    }
</style>
