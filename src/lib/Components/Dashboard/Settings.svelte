<script>
    import Icon from '@iconify/svelte';
    import EditFieldModal from './EditFieldModal.svelte';
    import { agentStore } from '$lib/stores/marketing/agentStore';

    $: agentName = $agentStore.agentName;
    $: city = $agentStore.address.city;
    $: district = $agentStore.address.district;
    $: state = $agentStore.address.state;
    $: pinCode = $agentStore.address.pinCode;

    let isEditModalOpen = false;

    let t_agentInformation = "Agent Information";   
    let t_agentName = "Name : ";
    let t_city = "City : ";
    let t_district = "District : "; 
    let t_state = "State : ";
    let t_pinCode  = "Pin Code : ";

    // Open the edit modal
    function openEditModal() {
        isEditModalOpen = true;
    }

    // Close the edit modal
    function handleCloseModal() {
        isEditModalOpen = false;
    }

    // Save changes to the user profile
    function saveChanges(newFields) {
        // console.log(`Updated fields:`, newFields);
        handleCloseModal();
    }
</script>

<main class="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col items-center">
    {#if isEditModalOpen}
        <EditFieldModal
            fields={{ agentName, city, district, state, pinCode }}
            on:close={handleCloseModal}
            on:save={saveChanges}
        />
    {/if}

    <div class="w-full max-w-3xl bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8 relative transform transition-transform duration-300 hover:scale-105">
        <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold border-b border-gray-300 pb-2">{t_agentInformation}</h2>
        <button
            class="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center gap-2"
            on:click={openEditModal}
        >
            <Icon icon="mdi:pencil" class="w-5 h-5" /> <!-- Edit Icon -->        </button>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                <span class="text-gray-600 text-sm font-medium">{t_agentName}</span>
                <span class="text-gray-800 font-semibold"><strong>{agentName}</strong></span>
            </div>
            <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                <span class="text-gray-600 text-sm font-medium">{t_city}</span>
                <span class="text-gray-800 font-semibold"><strong>{city}</strong></span>
            </div>
            <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                <span class="text-gray-600 text-sm font-medium">{t_district}</span>
                <span class="text-gray-800 font-semibold"><strong>{district}</strong></span>
            </div>
            <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                <span class="text-gray-600 text-sm font-medium">{t_state}</span>
                <span class="text-gray-800 font-semibold"><strong>{state}</strong></span>
            </div>
            <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                <span class="text-gray-600 text-sm font-medium">{t_pinCode}</span>
                <span class="text-gray-800 font-semibold"><strong>{pinCode}</strong></span>
            </div>
        </div>
    </div>
</main>

<style>
    .relative {
        position: relative;
    }
    .absolute {
        position: absolute;
    }
    .top-4 {
        top: 1rem; /* 16px */
    }
    .right-4 {
        right: 1rem; /* 16px */
    }
    .transform {
        transform: scale(1);
    }
    .transition-transform {
        transition-property: transform;
    }
    .duration-300 {
        transition-duration: 300ms;
    }
    .hover\:scale-105:hover {
        transform: scale(1.05);
    }
    .transition-colors {
        transition-property: background-color, border-color, color, fill, stroke;
    }
    .hover\:bg-blue-600:hover {
        background-color: #2563eb;
    }
    .active\:bg-blue-700:active {
        background-color: #1d4ed8;
    }
    .focus\:outline-none:focus {
        outline: none;
    }
    .focus\:ring-2:focus {
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }
    .focus\:ring-blue-500:focus {
        --tw-ring-color: rgba(59, 130, 246, 0.5);
    }
    .focus\:ring-opacity-50:focus {
        --tw-ring-opacity: 0.5;
    }
    .shadow-sm {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
</style>
