<script>
	import { agentStore } from "$lib/stores/marketing/agentStore";
    import { getBankDetails } from "$lib/js/marketing/api/bankVerification";

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
    let t_branch_name = "Branch Name : ";

    $: a_token = $agentStore.a_token
    $: mobileNumber = $agentStore.agentPhone
    $: email = $agentStore.email
    $: agentAddress = $agentStore.address
    $: aadharVerified = $agentStore.aadharVerified ? "Verified" : "Not Verified"
    
    $: addressLine = agentAddress?.addressLine
    $: district = agentAddress?.district
    $: city = agentAddress?.city
    $: state = agentAddress?.state
    $: pincode = agentAddress?.pinCode

    let bankAddedStatus = false
    let bankName = ""
    let accountNumber = ""
    let ifscCode = ""
    let branchName = ""

    const getDetailsOfBank = async(a_token) => {
        let result = await getBankDetails(a_token);
        if(result.success){
            let data = result.data[0];
            bankAddedStatus = data.status;
            bankName = data.bank_name;
            accountNumber = data.account_number;
            ifscCode = data.ifsc_code;
            branchName = data.branch_name;
        } else {
            // console.log("Error fetching bank details");
        }
    }

    $: getDetailsOfBank(a_token);

</script>

<main class="p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center">
    <h1 class="text-3xl md:text-4xl mb-8 text-gray-900 font-extrabold text-center">{t_agent_details}</h1>
    <div class="w-full max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow-2xl">
        <!-- Mobile Number -->
        <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4 gap-2">
            <span class="text-gray-600 text-sm font-medium no-break">{t_mobile_number} </span>
            <span class="text-gray-800 font-semibold custom-break">{mobileNumber}</span>
        </div>

        <!-- Email -->
        <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4 gap-2">
            <span class="text-gray-600 text-sm font-medium no-break">{t_email}</span>
            <span class="text-gray-800 font-semibold custom-break">{email}</span>
        </div>

        <!-- Aadhar Details -->
        <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4 gap-2">
            <span class="text-gray-600 text-sm font-medium no-break">{t_aadhar_verified} </span>
            <span class="text-gray-800 font-semibold custom-break">{aadharVerified}</span>
        </div>

        {#if bankAddedStatus}
            <!-- Bank Details Section -->
            <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold border-b border-gray-200 pb-3 mt-8 text-center">{t_bank_details}</h2>
            <div class="space-y-4">
                <!-- Bank Name -->
                <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg gap-2">
                    <span class="text-gray-600 text-sm font-medium no-break">{t_bank_name} </span>
                    <span class="text-gray-800 font-semibold custom-break">{bankName}</span>
                </div>

                <!-- Account Number -->
                <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg gap-2">
                    <span class="text-gray-600 text-sm font-medium no-break">{t_account_number}</span>
                    <span class="text-gray-800 font-semibold custom-break">{accountNumber}</span>
                </div>

                <!-- IFSC Code -->
                <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg gap-2">
                    <span class="text-gray-600 text-sm font-medium no-break">{t_ifsc_code}</span>
                    <span class="text-gray-800 font-semibold custom-break">{ifscCode}</span>
                </div>

                <!-- Branch Name -->
                <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg gap-2">
                    <span class="text-gray-600 text-sm font-medium no-break">{t_branch_name}</span>
                    <span class="text-gray-800 font-semibold custom-break">{branchName}</span>
                </div>
            </div>
        {/if}
    </div>
</main>

<style>
    @media (max-width: 499px) {
        .custom-break {
            white-space: pre-line;
            text-align: right;
        }
        .no-break {
            white-space: nowrap;
        }
    }
</style>