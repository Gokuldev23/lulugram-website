<script>
    import { createEventDispatcher } from 'svelte';
    import { editNameAddress } from '$lib/js/marketing/api/auth';
    import { agentStore } from '$lib/stores/marketing/agentStore';

    $: a_token = $agentStore.a_token;

    export let fields = {};

    let t_editInformation = "Edit Information";
    let t_agentName = "Name : ";
    let t_address = "Address : "
    let t_city = "City : ";
    let t_district = "District : ";
    let t_state = "State : ";
    let t_pinCode = "Pin Code : ";
    let t_cancel = "Cancel";
    let t_save = "Save";

    let newFields = {
        agentName: fields.agentName || '',
        address: {
            addressLine: fields.addressLine || '',
            city: fields.city || '',
            district: fields.district || '',
            state: fields.state || '',
            pinCode: fields.pinCode || ''
        }
    };

    let errors = {
        agentName: '',
        addressLine: '',
        city: '',
        district: '',
        state: '',
        pinCode: ''
    };

    const dispatch = createEventDispatcher();

    const validateField = (field, value) => {
        if (field === 'pinCode') {
            if (!/^\d{6}$/.test(value)) {
                errors.pinCode = 'Pin Code must be exactly 6 digits';
            } else {
                errors.pinCode = '';
            }
        } else if (field === 'city' || field === 'district') {
            // Skip validation for city and district if they are empty
            if (value && !/^[A-Za-z]{2,}/.test(value)) {
                errors[field] = 'Must be at least 2 characters and start with alphabets';
            } else {
                errors[field] = '';
            }
        } else {
            if (!/^[A-Za-z]{2,}/.test(value)) {
                errors[field] = 'Must be at least 2 characters and start with alphabets';
            } else {
                errors[field] = '';
            }
        }
    };

    const editDetails = async () => {
        let result = await editNameAddress(a_token, newFields);
        if (result.success) {
            // console.log('Details updated successfully', newFields);
            dispatch('save', { detail: newFields });
        } else {
            console.log('Error updating details');
        }
    };

    function save() {
        if (isFormValid()) {
            // console.log('Saving changes');
            editDetails();
        } else {
            console.log('Form has errors');
        }
    }

    function close() {
        dispatch('close');
    }

    $: isChanged = JSON.stringify(newFields) !== JSON.stringify(fields);

    $: validateField('agentName', newFields.agentName);
    $: validateField('addressLine', newFields.address.addressLine);
    $: validateField('city', newFields.address.city);
    $: validateField('district', newFields.address.district);
    $: validateField('state', newFields.address.state);
    $: validateField('pinCode', newFields.address.pinCode);

    $: isFormValid = () => {
        return !errors.agentName && !errors.addressLine && !errors.city && !errors.district && !errors.state && !errors.pinCode;
    };
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 p-4">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">{t_editInformation}</h3>
        <div class="mb-4">
            <label class="block text-gray-600 text-sm font-medium mb-2">{t_agentName}</label>
            <input
                type="text"
                bind:value={newFields.agentName}
                class="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter new Name"
            />
            {#if errors.agentName}
                <p class="text-red-500 text-sm mt-1">{errors.agentName}</p>
            {/if}
        </div>
        <div class="mb-4">
            <label class="block text-gray-600 text-sm font-medium mb-2">{t_address}</label>
            <input
                type="text"
                bind:value={newFields.address.addressLine}
                class="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter Address"
            />
            {#if errors.addressLine}
                <p class="text-red-500 text-sm mt-1">{errors.addressLine}</p>
            {/if}
        </div>
        <div class="mb-4">
            <label class="block text-gray-600 text-sm font-medium mb-2">{t_city}</label>
            <input
                type="text"
                bind:value={newFields.address.city}
                class="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter new City"
            />
            {#if errors.city}
                <p class="text-red-500 text-sm mt-1">{errors.city}</p>
            {/if}
        </div>
        <div class="mb-4">
            <label class="block text-gray-600 text-sm font-medium mb-2">{t_district}</label>
            <input
                type="text"
                bind:value={newFields.address.district}
                class="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter new District"
            />
            {#if errors.district}
                <p class="text-red-500 text-sm mt-1">{errors.district}</p>
            {/if}
        </div>
        <div class="mb-4">
            <label class="block text-gray-600 text-sm font-medium mb-2">{t_state}</label>
            <input
                type="text"
                bind:value={newFields.address.state}
                class="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter new State"
            />
            {#if errors.state}
                <p class="text-red-500 text-sm mt-1">{errors.state}</p>
            {/if}
        </div>
        <div class="mb-4">
            <label class="block text-gray-600 text-sm font-medium mb-2">{t_pinCode}</label>
            <input
                type="text"
                bind:value={newFields.address.pinCode}
                class="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter new Pin"
            />
            {#if errors.pinCode}
                <p class="text-red-500 text-sm mt-1">{errors.pinCode}</p>
            {/if}
        </div>
        <div class="flex justify-around gap-4">
            <button class="px-4 py-2 bg-gray-300 rounded-lg" on:click={close}>{t_cancel}</button>
            <button class="px-4 py-2 bg-blue-500 text-white rounded-lg" on:click={save} disabled={!isChanged || !isFormValid()}>{t_save}</button>
        </div>
    </div>
</div>

<style>
    /* Add any additional styles here */
</style>
