<script>
    import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';

    import { agentStore } from '$lib/stores/marketing/agentStore';
    import { logoutAgent } from '$lib/js/marketing/api/auth';

    const dispatch = createEventDispatcher();

    let t_are_you_sure = "Are you sure you want to log out?"
    let t_cancel = "Cancel"
    let t_logout = "Logout"

    async function confirmLogout() {
        const response = await logoutAgent();
        if (response.success) {
            // Clear the agentStore
            agentStore.set({
                agentName: '',
                address: {
                    city: '',
                    district: '',
                    state: '',
                    pinCode: ''
                }
            });
            dispatch('confirm');
            goto('/',{replaceState:true})
        } else {
            console.error('Logout failed:', response.message);
        }
    }

    function cancelLogout() {
        dispatch('cancel');
    }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20 p-4">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 text-center">{t_are_you_sure}</h2>
        <div class="flex justify-around gap-10 mt-8">
            <button
                class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg transition-colors duration-300 hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                on:click={cancelLogout}
            >
                {t_cancel}
            </button>
            <button
                class="px-4 py-2 bg-red-500 text-white rounded-lg transition-colors duration-300 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                on:click={confirmLogout}
            >
                {t_logout}
            </button>
        </div>
    </div>
</div>

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
