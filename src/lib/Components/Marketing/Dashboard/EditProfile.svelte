<script>
    import { createEventDispatcher } from 'svelte';

    export let isOpen = false;
    export let userProfile;

    const dispatch = createEventDispatcher();

    function closeModal() {
        isOpen = false;
        dispatch('close');
    }

    function saveChanges() {
        // Implement the logic to save changes
        console.log("Save changes clicked");
        closeModal();
    }
</script>

<div class={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}>
    <div class="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold border-b border-gray-300 pb-2">Edit Profile</h2>
        <div class="mb-6">
            <label class="block text-gray-700 mb-2">Name</label>
            <input type="text" class="w-full p-2 border border-gray-300 rounded" bind:value={userProfile.name} />
        </div>
        <!-- <div class="mb-6">
            <label class="block text-gray-700 mb-2">Mobile Number</label>
            <input type="text" class="w-full p-2 border border-gray-300 rounded" bind:value={userProfile.mobile} />
        </div> -->
        <div class="mb-6">
            <label class="block text-gray-700 mb-2">Email</label>
            <input type="email" class="w-full p-2 border border-gray-300 rounded" bind:value={userProfile.email} />
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 mb-2">Address</label>
            <input type="email" class="w-full p-2 border border-gray-300 rounded" bind:value={userProfile.address} />
        </div><div class="mb-6">
            <label class="block text-gray-700 mb-2">Pin</label>
            <input type="email" class="w-full p-2 border border-gray-300 rounded" bind:value={userProfile.pin} />
        </div>
        <div class="flex justify-end">
            <button class="bg-red-500 text-white px-4 py-2 rounded mr-2" on:click={closeModal}>Cancel</button>
            <button class="bg-green-500 text-white px-4 py-2 rounded" on:click={saveChanges}>Save</button>
        </div>
    </div>
</div>

<style>
    /* Ensure the modal is responsive */
    @media (max-width: 640px) {
        .payment-box p {
            font-size: 14px;
        }
    }
</style>
