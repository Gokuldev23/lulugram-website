<script>
    import Icon from '@iconify/svelte';

    import { agentStore } from '$lib/stores/marketing/agentStore';

    import EditFieldModal from './EditFieldModal.svelte';
    import ContactUs from './ContactUs.svelte';
    import LogoutButton from "../Logout/Logout.svelte"
    import LogoutModal from '../Logout/LogoutModal.svelte';
    import AgentProfileHeader from '../AgentProfileHeader.svelte';

    $: agentName = $agentStore.agentName;
    $: city = $agentStore.address.city;
    $: district = $agentStore.address.district;
    $: state = $agentStore.address.state;
    $: pinCode = $agentStore.address.pinCode;
    $: mobileNumber = $agentStore.agentPhone
    $: email = $agentStore.email
    $: isEmailVerified = $agentStore.emailVerified

    let isEditModalOpen = false;
    let isLogoutModalOpen = false;

    let t_agentInformation = "Agent Information";
    let t_agentName = "Name : ";
    let t_city = "City : ";
    let t_district = "District : ";
    let t_state = "State : ";
    let t_pinCode  = "Pin Code : ";
    let t_mobileNumber = "Mobile Number : "
    let t_email = "Email : "
    let t_emailVerified = "Verified"
    let t_emailNotVerified = "Not Verified"

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

    // Handle logout button click
    function handleLogout() {
        isLogoutModalOpen = true;
    }

    // Handle logout confirmation
    function handleConfirmLogout() {
        isLogoutModalOpen = false;
    }

    // Handle logout cancellation
    function handleCancelLogout() {
        isLogoutModalOpen = false;
    }
</script>

<main>
    <AgentProfileHeader />
    
    <div class="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col items-center">
        {#if isEditModalOpen}
            <EditFieldModal
                fields={{ agentName, city, district, state, pinCode }}
                on:close={handleCloseModal}
                on:save={saveChanges}
            />
        {/if}
    
        {#if isLogoutModalOpen}
            <LogoutModal on:confirm={handleConfirmLogout} on:cancel={handleCancelLogout} />
        {/if}
    
    
        <div class="w-full max-w-xs bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8 relative">
            <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold border-b border-gray-300 pb-2">{t_agentInformation}</h2>
            <button
                class="absolute top-5 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center gap-2"
                on:click={openEditModal}
            >
                <Icon icon="mdi:pencil" class="w-5 h-5" /> <!-- Edit Icon -->
            </button>
            <div class="space-y-4">
                <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                    <span class="text-gray-600 text-sm font-medium">{t_agentName}</span>
                    <span class="text-gray-800 font-800"><strong>{agentName}</strong></span>
                </div>
                <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                    <span class="text-gray-600 text-sm font-medium">{t_city}</span>
                    <span class="text-gray-800 font-800"><strong>{city}</strong></span>
                </div>
                <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                    <span class="text-gray-600 text-sm font-medium">{t_district}</span>
                    <span class="text-gray-800 font-800"><strong>{district}</strong></span>
                </div>
                <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                    <span class="text-gray-600 text-sm font-medium">{t_state}</span>
                    <span class="text-gray-800 font-800"><strong>{state}</strong></span>
                </div>
                <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                    <span class="text-gray-600 text-sm font-medium">{t_pinCode}</span>
                    <span class="text-gray-800 font-800"><strong>{pinCode}</strong></span>
                </div>
                <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                    <span class="text-gray-600 text-sm font-medium">{t_mobileNumber}</span>
                    <span class="text-gray-800 font-800"><strong>{mobileNumber}</strong></span>
                </div>
                {#if !isEmailVerified}
                    <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                        <span class="text-gray-600 text-sm font-medium">{t_email}</span>
                        <span class="text-gray-800 font-700 flex gap-3">{t_emailNotVerified}<Icon icon="fa:times-circle" class="text-red-500 mt-1" /></span>
                    </div>
                {:else}
                    <div class="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100">
                        <span class="text-gray-600 text-sm font-medium">{t_email}</span>
                        <span class="text-gray-800 font-semibold flex gap-3"><strong>{email}</strong><Icon icon="fa:check-circle" class="text-green-500 mt-1" /></span>
                    </div>
                {/if}
            </div>
        </div>
    
        <ContactUs />
    
        <LogoutButton on:logout={handleLogout} />
    </div>
</main>

<style>
    .relative {
        position: relative;
    }
    .absolute {
        position: absolute;
    }
    .right-4 {
        right: 1rem; /* 16px */
    }
    .max-w-xs {
        max-width: 600px;
    }
</style>