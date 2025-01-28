<script>

	import {validateOTP} from '$lib/js/marketing/utils';

	import { userRegisterVerify } from '$lib/js/marketing/api/auth';

    import Card from '$lib/Components/common/Card.svelte';
    import InputField from '$lib/Components/common/InputField.svelte';


    let t_enter_otp = "Enter OTP";
    let t_otp_sent = "OTP has been sent to your Mobile";
    let t_submit = "Submit";
    let t_resend_otp = "Resend OTP?"

    let t_otpErr = $state(null)
    let disabled = $state(true)

    let otp = $state(null);
    let resendOtpCount = 0

    let isValidOtp = $derived(validateOTP(otp));

    $effect(() => {
        t_otpErr = isValidOtp ? null : "OTP is not valid"

        if(!otp || !isValidOtp){
            disabled = true
        }else{
            disabled = false
        }   
    });

    const resendOtp = async () => {
        
    }
    
    const handleOtpSubmit = async () => {

        let result = await userRegisterVerify()
    }
</script>

<main class="flex justify-center items-center h-svh px-4">
    <Card class="max-w-sm mx-auto">
        <h1 class="text-2xl font-bold text-center text-violet-600 mb-5">{t_enter_otp}</h1>
        <p class="text-green-500 text-center my-4 font-semibold">{t_otp_sent}</p>

        <form onsubmit={handleOtpSubmit} class="w-full">

            <InputField type="number" required={true} label="Enter OTP" bind:value={otp} errorMsg={t_otpErr}/>

            <button type="button" class="text-sm text-violet-500 font-medium">{t_resend_otp}</button>
            
            <button
                class="bg-violet-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:opacity-35 w-full text-white font-bold py-2 px-4 rounded mt-4"
                type="submit"
                disabled={disabled}
            >
                {t_submit}
            </button>
        </form>

    </Card>
</main>
