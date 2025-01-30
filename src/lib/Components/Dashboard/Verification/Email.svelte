<script>
    import Icon from '@iconify/svelte';

    import { emailVerify, otpVerifyEmail } from '$lib/Components/JS/emailVerification';
    import { agentStore } from '$lib/stores/marketing/agentStore';
    import { otpStore } from '$lib/stores/marketing/otpStore';
    import { getAgentStatus } from '$lib/js/marketing/api/auth';

    let t_email_verification = "Email Verification";
    let t_enter_email = "Enter your email";
    let t_get_otp = "Get OTP";
    let t_submit_otp = "Submit OTP";
    let t_invalid_email = "Please enter a valid email address.";
    let t_enter_otp = "Enter OTP";
    let t_email_verified = "Email verified successfully!";
    let t_otp_sent = "OTP sent to your email.";
    let t_email_not_verified = "Your email is not verified. Click the button to verify.";

    let email = "";
    let otp = "";
    let otpToken = ""
    let isOtpSent = false;
    let isEmailValid = false;
    let errorMessage = "";

    $: a_token = $agentStore.a_token
    $: isEmailVerified = $agentStore.emailVerified
    $: email = $agentStore.email
    $: console.log(email, a_token, isEmailVerified)
    $: console.log($agentStore.agentId)

    const agentStatus = async() => {
        let result = await getAgentStatus(a_token);
        console.log("result",result);
        // if(result.success){
        //     console.log("result",result.data);
        // } else {
        //     console.log("Error fetching agent status");
        // }
    }
    $: agentStatus(a_token);

    const sendEmailToGetOtp = async() => {
        let result = await emailVerify(a_token, email);

        if(result.success){
            isOtpSent = true;
            otpToken = result.otpToken;

            otpStore.set({
                otpToken
            });
        } else {
            isOtpSent = false;
            console.log("Error sending OTP");
        }
    }

    const submitOtp = async() => {
        let result = await otpVerifyEmail(a_token, email, otp, otpToken);

        if(result.success){
            isEmailVerified = true;
            errorMessage = ""

            agentStore.set({
                agentEmail: email,
                a_token: a_token,
                isEmailVerified: true
            });

        } else {
            errorMessage = result.message;
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isEmailValid = emailRegex.test(email);
    }

    // Function to allow only numeric input in the OTP field
    function allowOnlyNumbers(event) {
        const input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        otp = input.slice(0, 6); // Limit to 6 digits
    }
</script>

<main class="p-4 md:p-8 bg-gray-100 flex flex-col items-center">
    {#if !isEmailVerified}
        <div class="w-full bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
            <h2 class="text-xl md:text-2xl text-center mb-4 md:mb-6 text-gray-800 font-bold border-b border-gray-300 pb-2">
                {t_email_verification}
            </h2>

            <!-- Email Input Field -->
            <div class="mb-3 md:mb-4">
                <div class="flex justify-center items-center">
                    <input type="email" bind:value={email} placeholder={t_enter_email}
                        on:input={(e) => validateEmail(e.target.value)}
                        class="w-full p-1.5 md:p-2 border border-gray-300 rounded max-w-[300px] md:max-w-[400px] text-sm md:text-base" 
                    />
                </div>
                <div class="flex justify-center items-center">
                    {#if !isEmailValid && email}
                        <p class="text-red-500 text-xs md:text-sm mt-1">{t_invalid_email}</p>
                    {/if}
                </div>
            </div>

            <!-- OTP Input Field (Visible after OTP is sent) -->
            {#if isOtpSent}
                <p class="text-green-500 text-xs md:text-sm mt-1 text-center mb-4">{t_otp_sent}</p>
                <div class="mb-3 md:mb-4 flex justify-center items-center">
                    <input type="text" bind:value={otp} placeholder={t_enter_otp} maxlength="6" on:input={allowOnlyNumbers}
                        class="w-full p-1.5 md:p-2 border border-gray-300 rounded max-w-[300px] md:max-w-[400px] text-sm md:text-base text-center"
                    />
                </div>
            {/if}

            {#if errorMessage}
                <p class="text-red-500 text-xs md:text-sm mt-1 text-center mb-4">{errorMessage}</p>
            {/if}

            <!-- Get OTP or Submit OTP Button -->
            <div class="flex justify-center items-center mb-3 md:mb-4">
                {#if !isOtpSent}
                    <button on:click={sendEmailToGetOtp} disabled={!isEmailValid}
                        class="bg-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {t_get_otp}
                    </button>
                {:else}
                    <button on:click={submitOtp} disabled={otp.length !== 6}
                        class="bg-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-sm md:text-base hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {t_submit_otp}
                    </button>
                {/if}
            </div>
        </div>
    {:else}
        <div class="w-full bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">Email</h2>
            <div class="bg-green-50 p-4 md:p-6 rounded-lg border border-green-300 text-green-700 text-sm md:text-base">
                <p class="text-base md:text-lg text-center">{email}</p>
            </div>
        </div>
    {/if}
    
</main>
