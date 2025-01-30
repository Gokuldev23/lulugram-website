<script>
    import { createEventDispatcher } from 'svelte';

    export let field; // Field being edited (e.g., 'name', 'email')
    export let value; // Current value of the field

    const dispatch = createEventDispatcher();

    let newValue = value; // Local state for the input field

    function closeModal() {
        dispatch('close');
    }

    function handleSave() {
        dispatch('save', newValue); // Emit the new value to the parent
    }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold border-b border-gray-300 pb-2">Edit {field}</h2>
        <div class="mb-6">
            <label class="block text-gray-700 mb-2">{field}</label>
            <input
                type="text"
                class="w-full p-2 border border-gray-300 rounded"
                bind:value={newValue}
            />
        </div>
        <div class="flex justify-end">
            <button class="bg-red-500 text-white px-4 py-2 rounded mr-2" on:click={closeModal}>Cancel</button>
            <button class="bg-green-500 text-white px-4 py-2 rounded" on:click={handleSave}>Save</button>
        </div>
    </div>
</div>