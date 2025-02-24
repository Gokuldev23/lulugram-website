<script>
    import { agentStore } from "$lib/stores/marketing/agentStore";
    import { otpStore } from "$lib/stores/marketing/otpStore";
    import { bankVerify, getBankDetails, otpVerifyBankDetails } from "$lib/js/marketing/api/bankVerification";

    import DisplayBankDetail from "./DisplayBankDetail.svelte";

    $: a_token = $agentStore.a_token;   

    let accountNumber = "";
    let reEnterAccountNumber = "";
    let accountHolderName = "";
    let ifscCode = "";
    let branchName = "";
    let bankName = "";

    let accountNumberError = "";
    let reEnterAccountNumberError = "";
    let accountHolderNameError = "";
    let ifscCodeError = "";

    let isFetchingIFSC = false;
    let branchDetailsFetched = false;
    let isBankAdded = false
    let showBankDetailsAddedMessage = false;

    const otpVerification = async() => {
        let result = await otpVerifyBankDetails(a_token)
        if(result.success){
            isOtpSent = true
            otpToken = result.otpToken

            otpStore.set({
                otpToken
            });
        } else {
            isOtpSent = false
            console.log("Error sending OTP");
        }
    }

    const getDetailsOfBank = async(a_token) => {
        let result = await getBankDetails(a_token);
        let dataLength = result.data.length

        if(result.success && dataLength > 0){
            let data = result.data[0];
            status = data.status;

            if(status === "active"){
                isBankAdded = true;
            } else {
                isBankAdded = false;
            }
        } else {
            console.log("Error fetching bank details");
        }
    }

    $: getDetailsOfBank(a_token);

    // Track if fields have been touched
    let accountNumberTouched = false;
    let reEnterAccountNumberTouched = false;
    let accountHolderNameTouched = false;
    let ifscCodeTouched = false;

    let t_bankAdded = "Bank details verified successfully!";
    let t_bank_details = "Bank Details";
    let t_account_holder_name = "Account Holder Name";
    let t_account_number = "Account Number";
    let t_re_enter_account_number = "Re-Enter Account Number";
    let t_ifsc_code = "IFSC Code";
    let t_branch_name = "Branch Name";  
    let t_bank_name = "Bank Name";
    let t_submit = "Submit";
    let t_get_otp = "Get OTP";
    let t_submit_otp = "Submit OTP";
    let t_otp_sent = "OTP sent to your Mobile number.";
    let t_enter_otp = "Enter OTP"

    let otp = "";
    let otpToken = ""
    let isOtpSent = false;
    let errorMessage = ""

    // Validate Account Number
    function validateAccountNumber() {
        if (!accountNumberTouched) return true; // Skip validation if not touched

        if (!accountNumber) {
            accountNumberError = "Account number is required.";
            return false;
        } else if (accountNumber.length < 10 || accountNumber.length > 18) {
            accountNumberError = "Account number must be between 10 and 18 digits.";
            return false;
        } else if (!/^\d+$/.test(accountNumber)) {
            accountNumberError = "Account number must contain only numbers.";
            return false;
        } else {
            accountNumberError = "";
            return true;
        }
    }

    // Validate Re-Entered Account Number
    function validateReEnterAccountNumber() {
        if (!reEnterAccountNumberTouched) return true; // Skip validation if not touched

        if (!reEnterAccountNumber) {
            reEnterAccountNumberError = "Re-entered account number is required.";
            return false;
        } else if (reEnterAccountNumber !== accountNumber) {
            reEnterAccountNumberError = "Account numbers do not match.";
            return false;
        } else if (!/^\d+$/.test(reEnterAccountNumber)) {
            reEnterAccountNumberError = "Account number must contain only numbers.";
            return false;
        } else {
            reEnterAccountNumberError = "";
            return true;
        }
    }

    // Validate Account Holder Name
    function validateAccountHolderName() {
        if (!accountHolderNameTouched) return true; // Skip validation if not touched

        if (!accountHolderName) {
            accountHolderNameError = "Account holder name is required.";
            return false;
        } else if (accountHolderName.length < 2) {
            accountHolderNameError = "Account holder name must be at least 2 characters.";
            return false;
        } else if (!/^[A-Za-z]{2}/.test(accountHolderName)) {
            accountHolderNameError = "First two characters must be alphabets.";
            return false;
        } else {
            accountHolderNameError = "";
            return true;
        }
    }

    // Validate IFSC Code
    function validateIFSCCode() {
        if (!ifscCodeTouched) return true; // Skip validation if not touched

        if (!ifscCode) {
            ifscCodeError = "IFSC code is required.";
            return false;
        } else if (!/^[A-Za-z]{4}\d{7}$/.test(ifscCode)) {
            ifscCodeError = "Invalid IFSC code.";
            return false;
        } else {
            ifscCodeError = "";
            return true;
        }
    }

    // Check if all fields are valid
    function isFormValid() {
        return (
            accountNumberTouched &&
            reEnterAccountNumberTouched &&
            accountHolderNameTouched &&
            ifscCodeTouched &&
            branchDetailsFetched && // Ensure branch details are fetched
            validateAccountNumber() &&
            validateReEnterAccountNumber() &&
            validateAccountHolderName() &&
            validateIFSCCode()
        );
    }

    // Fetch Branch Details from Razorpay IFSC API
    async function fetchBranchDetails() {
        if (!validateIFSCCode()) return;

        isFetchingIFSC = true;
        try {
            const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
            const data = await response.json();
            if (data.BANK && data.BRANCH) {
                bankName = data.BANK;
                branchName = data.BRANCH;
                branchDetailsFetched = true;
            } else {
                ifscCodeError = "Invalid IFSC code or no details found.";
            }
        } catch (error) {
            ifscCodeError = "Failed to fetch branch details. Please try again.";
        } finally {
            isFetchingIFSC = false;
        }
    }

    // Submit Form
    const submitForm = async() => {

        let result = await bankVerify(a_token, accountHolderName, accountNumber, ifscCode, branchName, bankName, otp, otpToken);
        // console.log(result);

        if(result.success){
            isBankAdded = true;
            errorMessage = ""
        } else {
            errorMessage = result.message
            console.log("Error adding bank details");
        }
    }

    // Reset Branch and Bank Name if IFSC code changes
    function resetBranchAndBankName() {
        branchName = "";
        bankName = "";
        branchDetailsFetched = false;
    }

    // Function to allow only numeric input in the OTP field
    function allowOnlyNumbers(event) {
        const input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        otp = input.slice(0, 6); // Limit to 6 digits
    }

</script>

<main class="p-4 md:p-8 bg-gray-100 flex flex-col items-center">
    {#if !isBankAdded}
    <div class="w-full bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
        <h2 class="text-xl md:text-2xl text-center mb-4 md:mb-6 text-gray-800 font-bold border-b border-gray-300 pb-2">
            {t_bank_details}
        </h2>

        <!-- Account Holder Name -->
        <div class="mb-3 md:mb-4">
            <label class="block text-sm md:text-base font-medium text-gray-700 mb-1">{t_account_holder_name}</label>
            <input type="text" class="w-full p-1.5 md:p-2 border border-gray-300 rounded text-sm md:text-base"
                bind:value={accountHolderName} placeholder="Enter account holder name"
                on:input={() => { accountHolderNameTouched = true; validateAccountHolderName(); }}
                on:blur={() => { accountHolderNameTouched = true; validateAccountHolderName(); }}
            />
            {#if accountHolderNameTouched && accountHolderNameError}
                <p class="text-red-500 text-xs md:text-sm mt-1">{accountHolderNameError}</p>
            {/if}
        </div>

        <!-- Account Number -->
        <div class="mb-3 md:mb-4">
            <label class="block text-sm md:text-base font-medium text-gray-700 mb-1">{t_account_number}</label>
            <input type="text" class="w-full p-1.5 md:p-2 border border-gray-300 rounded text-sm md:text-base"
                bind:value={accountNumber} placeholder="Enter your account number"
                on:input={() => { accountNumberTouched = true; validateAccountNumber(); validateReEnterAccountNumber(); }}
                on:blur={() => { accountNumberTouched = true; validateAccountNumber(); }}
            />
            {#if accountNumberTouched && accountNumberError}
                <p class="text-red-500 text-xs md:text-sm mt-1">{accountNumberError}</p>
            {/if}
        </div>

        <!-- Re-Enter Account Number -->
        <div class="mb-3 md:mb-4">
            <label class="block text-sm md:text-base font-medium text-gray-700 mb-1">{t_re_enter_account_number}</label>
            <input type="text" class="w-full p-1.5 md:p-2 border border-gray-300 rounded text-sm md:text-base"
                bind:value={reEnterAccountNumber} placeholder="Re-enter your account number"
                on:input={() => { reEnterAccountNumberTouched = true; validateReEnterAccountNumber(); }}
                on:blur={() => { reEnterAccountNumberTouched = true; validateReEnterAccountNumber(); }}
            />
            {#if reEnterAccountNumberTouched && reEnterAccountNumberError}
                <p class="text-red-500 text-xs md:text-sm mt-1">{reEnterAccountNumberError}</p>
            {/if}
        </div>

        <!-- IFSC Code -->
        <div class="mb-3 md:mb-4">
            <label class="block text-sm md:text-base font-medium text-gray-700 mb-1">{t_ifsc_code}</label>
            <input type="text" class="w-full p-1.5 md:p-2 border border-gray-300 rounded text-sm md:text-base"
                bind:value={ifscCode} placeholder="Enter IFSC code"
                on:input={() => { ifscCodeTouched = true; validateIFSCCode(); resetBranchAndBankName(); }}
                on:blur={() => { ifscCodeTouched = true; validateIFSCCode(); }}
            />
            {#if ifscCodeTouched && ifscCodeError}
                <p class="text-red-500 text-xs md:text-sm mt-1">{ifscCodeError}</p>
            {/if}
            {#if ifscCode && !ifscCodeError}
                <button on:click={fetchBranchDetails}
                    class="mt-2 bg-green-500 text-white px-4 py-1.5 rounded text-sm md:text-base hover:bg-green-700"
                    disabled={isFetchingIFSC}
                >
                    {isFetchingIFSC ? "Fetching..." : "Fetch Details"}
                </button>
            {/if}
        </div>

        <!-- Branch Name -->
        {#if branchDetailsFetched}
            <div class="mb-3 md:mb-4">
                <label class="block text-sm md:text-base font-medium text-gray-700 mb-1">{t_branch_name}</label>
                <input type="text" class="w-full p-1.5 md:p-2 border border-gray-300 rounded text-sm md:text-base"
                    bind:value={branchName} placeholder="Enter branch name" readonly
                />
            </div>
        {/if}

        <!-- Bank Name -->
        {#if branchDetailsFetched}
            <div class="mb-3 md:mb-4">
                <label class="block text-sm md:text-base font-medium text-gray-700 mb-1">{t_bank_name}</label>
                <input type="text" class="w-full p-1.5 md:p-2 border border-gray-300 rounded text-sm md:text-base"
                    bind:value={bankName} placeholder="Enter bank name" readonly
                />
            </div>
        {/if}

        <!-- OTP Input Field (Visible after OTP is sent) -->
        {#if isOtpSent}
            <p class="text-green-500 text-xs md:text-sm mt-1 text-center mb-4">{t_otp_sent}</p>
            <div class="mb-3 md:mb-4 flex justify-center items-center">
                <input type="text" bind:value={otp} placeholder={t_enter_otp} maxlength="6" on:input={allowOnlyNumbers}
                    class="w-full p-1.5 md:p-2 border border-gray-300 rounded max-w-[300px] md:max-w-[400px] text-sm md:text-base text-center"
                />
            </div>
<!-- 
            Submit Button
            <div class="flex justify-center items-center">
                <button
                    on:click={submitForm}
                    class="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!isFormValid()}
                >
                    {t_submit}
                </button>
            </div> -->
        {/if}

        {#if errorMessage}
            <p class="text-red-500 text-xs md:text-sm mt-1 text-center mb-4">{errorMessage}</p>
        {/if}

        <!-- Get OTP or Submit OTP Button -->
        <div class="flex justify-center items-center mb-3 md:mb-4">
            {#if !isOtpSent}
                <button on:click={otpVerification} disabled={!isFormValid()}
                    class="bg-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {t_get_otp}
                </button>
            {:else}
                <button on:click={submitForm} disabled={otp.length !== 6}
                    class="bg-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {t_submit}
                </button>
            {/if}
        </div>

        
    </div>
    {:else}
        <DisplayBankDetail/>
    {/if}
</main>
