<script>
    import Icon from '@iconify/svelte';
    import EditFieldModal from './EditFieldModal.svelte';

    // Example data for settings
    let t_userProfile = "User Settings";
    let t_name = "Name : ";
    let t_email = "Email : ";
    let t_mobile_number = "Mobile Number : ";
    let t_address = "Address : ";
    let t_pin = "Pin : ";

    let userProfile = {
        name: "Cristiano Ronaldo",
        email: "cristiano.ronaldo@example.com",
        mobile: 7774926789,
        address: "123, Main Street, Trivandrum, Kerala",
        pin: 560001,
        profilePicture: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
    };

    let isEditModalOpen = false;
    let currentField = ""; // Track which field is being edited
    let currentValue = ""; // Track the current value of the field

    // Open the edit modal for a specific field
    function openEditModal(field, value) {
        currentField = field;
        currentValue = value;
        isEditModalOpen = true;
    }

    // Close the edit modal
    function handleCloseModal() {
        isEditModalOpen = false;
    }

    // Save changes to the user profile
    function saveChanges(field, newValue) {
        userProfile[field] = newValue;
        console.log(`Updated ${field}:`, newValue);
        handleCloseModal();
    }
</script>

<main class="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col items-center">
    {#if isEditModalOpen}
        <EditFieldModal field={currentField} value={currentValue} on:close={handleCloseModal}
            on:save={({ detail }) => saveChanges(currentField, detail)}
        />
    {/if}

    <div class="w-full max-w-3xl bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8">
        <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold border-b border-gray-300 pb-2">{t_userProfile}</h2>
        <div class="mb-6">
            <img src={userProfile.profilePicture} alt="Profile Picture" class="w-24 h-24 rounded-full mb-4"/>
            
            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
                <span class="text-gray-600 text-sm font-medium">{t_name} </span>
                <span class="text-gray-800 font-semibold"><strong>{userProfile.name}</strong></span>
                <Icon icon="mdi:pencil" class="text-gray-500 ml-2 cursor-pointer" onclick={() => openEditModal('name', userProfile.name)} />
            </div>

            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
                <span class="text-gray-600 text-sm font-medium">{t_mobile_number} </span>
                <span class="text-gray-800 font-semibold"><strong>{userProfile.mobile}</strong></span>
            </div>

            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
                <span class="text-gray-600 text-sm font-medium">{t_email} </span>
                <span class="text-gray-800 font-semibold"><strong>{userProfile.email}</strong></span>
                <Icon icon="mdi:pencil" class="text-gray-500 ml-2 cursor-pointer" onclick={() => openEditModal('email', userProfile.email)} />
            </div>

            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
                <span class="text-gray-600 text-sm font-medium">{t_address} </span>
                <span class="text-gray-800 font-semibold"><strong>{userProfile.address}</strong></span>
                <Icon icon="mdi:pencil" class="text-gray-500 ml-2 cursor-pointer" onclick={() => openEditModal('address', userProfile.address)} />
            </div>

            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
                <span class="text-gray-600 text-sm font-medium">{t_pin} </span>
                <span class="text-gray-800 font-semibold"><strong>{userProfile.pin}</strong></span>
                <Icon icon="mdi:pencil" class="text-gray-500 ml-2 cursor-pointer" onclick={() => openEditModal('pin', userProfile.pin)} />
            </div>

        </div>
    </div>
</main>