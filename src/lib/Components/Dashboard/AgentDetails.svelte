<script>
	import { agentStore } from "$lib/stores/marketing/agentStore";



    let t_agent_details = "Agent Details";
    let t_mobile_number = "Mobile Number : ";
    let t_email = "Email : ";
    let t_aadhar_verified = "Aadhar Verified : ";
    let t_address = "Address : ";
    let t_pin = "Pin : ";
    let t_aadhar_card_number = "Aadhar Number : ";
    let t_pan_card_number = "Pan Number : ";
    let t_bank_details = "Bank Details";
    let t_bank_name = "Bank Name : ";
    let t_account_number = "Account Number : ";
    let t_ifsc_code = "IFSC Code : ";

    $: mobileNumber = $agentStore.phone
    $: email = $agentStore.email
    $: agentAddress = $agentStore.address
    $: aadharVerified = $agentStore.aadharVerified ? "Verified" : "Not Verified"
    
    $: district = agentAddress?.district
    $: city = agentAddress?.city
    $: state = agentAddress?.state
    $: pincode = agentAddress?.pinCode

</script>

<main class="p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center">
    <h1 class="text-3xl md:text-4xl mb-8 text-gray-900 font-extrabold text-center">{t_agent_details}</h1>
    <div class="w-full max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow-2xl">
        <!-- Mobile Number -->
        <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
            <span class="text-gray-600 text-sm font-medium">{t_mobile_number} </span>
            <span class="text-gray-800 font-semibold">{mobileNumber}</span>
        </div>

        <!-- Email -->
        <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
            <span class="text-gray-600 text-sm font-medium">{t_email}</span>
            <span class="text-gray-800 font-semibold">{email}</span>
        </div>

        
        <!-- Address -->
        <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
            <span class="text-gray-600 text-sm font-medium">{t_address}</span>
            <span class="text-gray-800 font-semibold text-right">{district} , {city} , {state}</span>
        </div>
        
        <!-- Pin -->
        <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
            <span class="text-gray-600 text-sm font-medium">{t_pin}</span>
            <span class="text-gray-800 font-semibold text-right">{pincode}</span>
        </div>

        <!-- Aadhar Details -->
        <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
            <span class="text-gray-600 text-sm font-medium">{t_aadhar_verified} </span>
            <span class="text-gray-800 font-semibold">{aadharVerified}</span>
        </div>

         <!-- Pan Card Number -->
         <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
            <span class="text-gray-600 text-sm font-medium">{t_pan_card_number} </span>
            <span class="text-gray-800 font-semibold text-right">BCAPJ0530Q</span>
        </div>

        <!-- Bank Details Section -->
        <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold border-b border-gray-200 pb-3 mt-8">{t_bank_details}</h2>
        <div class="space-y-4">
            <!-- Bank Name -->
            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <span class="text-gray-600 text-sm font-medium">{t_bank_name} </span>
                <span class="text-gray-800 font-semibold">State Bank of India</span>
            </div>

            <!-- Account Number -->
            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <span class="text-gray-600 text-sm font-medium">{t_account_number}</span>
                <span class="text-gray-800 font-semibold">1234567890</span>
            </div>

            <!-- IFSC Code -->
            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <span class="text-gray-600 text-sm font-medium">{t_ifsc_code}</span>
                <span class="text-gray-800 font-semibold">ABCD0123456</span>
            </div>
        </div>
    </div>
</main>