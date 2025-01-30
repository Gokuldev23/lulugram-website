<script>
    let aadharNumber = "";
    let aadharNumberError = "";
    let aadharNumberTouched = false;
    let isAadharValid = false;
    let otp = "";
    let isOtpSent = false;
    let otpError = "";
    let isAadharVerified = false;
    let showAadharVerifyMessage = false;

    let t_aadharVerification = "Aadhar Verified Successfully!";

    // Validate Aadhar Number
    export function validateAadharNumber() {
        if (!aadharNumberTouched) return false; // Skip validation if not touched

        const cleanedNumber = aadharNumber.replace(/-/g, ''); // Remove hyphens

        if (cleanedNumber.length !== 12) {
            isAadharValid = false;
            aadharNumberError = "Aadhar number must be exactly 12 digits.";
            console.log("Validation Error: Length", cleanedNumber.length);
            return false;
        } else if (!/^\d+$/.test(cleanedNumber)) {
            isAadharValid = false;
            aadharNumberError = "Aadhar number must contain only numbers.";
            console.log("Validation Error: Non-digit characters");
            return false;
        } else {
            aadharNumberError = "";
            isAadharValid = true;
            console.log("Validation Success");
            return true;
        }
    }

    // Format Aadhar Number
    function formatAadharNumber(value) {
        // Remove all non-digit characters
        const cleaned = value.replace(/\D/g, '');
        // Format the number as 6969-6268-5858
        if (cleaned.length > 4) {
            value = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
        }
        if (cleaned.length > 8) {
            value = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8, 12)}`;
        }
        return value;
    }

    // Function to handle form submission
    export function handleSubmit() {
        if (validateAadharNumber()) {
            isOtpSent = true;
            // Add your form submission logic here
        } else {
            alert("Please fix the errors before submitting.");
        }
    }

    // Function to handle OTP submission
    function handleOtpSubmit() {
        if (otp.length === 6) {
            setTimeout(() => {
                isAadharVerified = true;
                showAadharVerifyMessage = true; // Show the OTP sent message
                console.log("Aadhar verified successfully!");

                // Hide the OTP sent message after 5 seconds
                setTimeout(() => {
                    showAadharVerifyMessage = false;
                }, 5000);
            }, 2000); // Simulate a 2-second delay for verification
            // Add your OTP verification logic here
        } else {
            otpError = "Please enter a valid 6-digit OTP.";
        }
    }

    // Function to allow only numeric input in the OTP field
    function allowOnlyNumbers(event) {
        const input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        otp = input.slice(0, 6); // Limit to 6 digits
    }

    // Function to allow only numeric input in the Aadhar number field
    function allowOnlyNumbersForAadhar(event) {
        const input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        aadharNumber = formatAadharNumber(input); // Format the number
    }

    let t_aadhar_details = "Aadhar Details";
    let t_submit = "Submit";
    let t_otp_sent = "OTP sent to your mobile.";
    let t_submit_otp = "Submit OTP";
</script>

<main class="p-4 md:p-8 bg-gray-100 flex flex-col items-center">
    {#if !isAadharVerified}
        <div class="w-full bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
            <h2 class="text-xl md:text-2xl text-center mb-4 md:mb-6 text-gray-800 font-bold border-b border-gray-300 pb-2">
                {t_aadhar_details}
            </h2>            
            <input
                id="aadharNumber"
                type="text"
                class="w-full p-2 border border-gray-300 rounded text-sm md:text-base focus:border-blue-500 focus:ring-blue-500 text-center"
                bind:value={aadharNumber}
                placeholder="Enter your Aadhar number"
                on:input={(e) => {
                    aadharNumberTouched = true;
                    allowOnlyNumbersForAadhar(e);
                    validateAadharNumber();
                }}
                on:blur={() => { aadharNumberTouched = true; validateAadharNumber(); }}
            />
            {#if aadharNumberTouched && aadharNumberError}
                <p class="text-red-500 text-xs md:text-sm mt-1">{aadharNumberError}</p>
            {/if}

            <!-- Submit Button -->
            {#if !isOtpSent}
                <div class="flex justify-center items-center mt-4">
                    <button
                        on:click={handleSubmit}
                        class="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!isAadharValid}
                    >
                        {t_submit}
                    </button>
                </div>
            {/if}

            <!-- OTP Input Field (Visible after OTP is sent) -->
            {#if isOtpSent}
                <div class="mt-4">
                    <p class="text-green-500 text-xs md:text-sm mt-1 text-center mb-4">{t_otp_sent}</p>
                    <input
                        id="otp"
                        type="text"
                        class="w-full p-2 border border-gray-300 rounded text-sm md:text-base focus:border-blue-500 focus:ring-blue-500 text-center"
                        bind:value={otp}
                        placeholder="Enter OTP"
                        maxlength="6"
                        on:input={allowOnlyNumbers}
                    />
                    {#if otpError}
                        <p class="text-red-500 text-xs md:text-sm mt-1">{otpError}</p>
                    {/if}
                    <div class="flex justify-center items-center mt-4">
                        <button
                            on:click={handleOtpSubmit}
                            class="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={otp.length !== 6}
                        >
                            {t_submit_otp}
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    {:else if showAadharVerifyMessage}
        <div class="w-full bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
            <div class="bg-green-50 p-2 md:p-3 rounded-lg text-green-700 text-sm md:text-base">
                {t_aadharVerification}
            </div>
        </div>
    {/if}
</main>
