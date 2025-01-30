<script>

	import { goto } from '$app/navigation';
    
	import { otpStore } from '$lib/stores/marketing/otpStore';
	import { agentStore } from '$lib/stores/marketing/agentStore';

	import {validateOTP} from '$lib/js/marketing/utils';
	import { agentRegisterVerify, resendOtp } from '$lib/js/marketing/api/auth';

    import Card from '$lib/Components/common/Card.svelte';
	import AlertModal from '$lib/Components/common/AlertModal.svelte';
    import InputField from '$lib/Components/common/InputField.svelte';
	import SubmitButton from '$lib/Components/common/SubmitButton.svelte';


    let t_enter_otp = "Enter OTP";
    let t_otp_sent = "OTP has been sent to your Mobile";
    let t_submit = "Submit";
    let t_resend_otp = "Resend OTP?"

    let t_otpErr = $state(null)
    let disabled = $state(true)
    let errorSubmit = $state('')

    let otp = $state(null);
    let resendOtpCount = $state(0)
    let isOtpSentAgain = $state(false)

    let isValidOtp = $derived(validateOTP(otp));

    const closeAlert = () => errorSubmit = ''

    const closeOtpSentMsg = () => isOtpSentAgain = false
 
    $effect(() => {
        t_otpErr = isValidOtp ? null : "OTP is not valid"

        if(!otp || !isValidOtp){
            disabled = true
        }else{
            disabled = false
        }   

    });

    let otpTokenPrev = ''

    const handleResendOtp = async () => {
        let {otpToken,agentUid,agentId} = $otpStore
        resendOtpCount++

        let result = await resendOtp(agentId,agentUid,resendOtpCount)
        isOtpSentAgain = true

        if(result.success){
            otpTokenPrev = otpToken
            $otpStore.otpToken = result.otpToken

        }
    }
    
    const handleOtpSubmit = async () => {
        let {otpToken,agentUid} = $otpStore

        let result = await agentRegisterVerify(otp,otpToken,otpTokenPrev,agentUid)

        if(result.success){
            goto('/marketing/agent-dashboard')
        }else{
            errorSubmit = result.message
        }

    }
</script>

<main class="flex justify-center items-center h-svh px-4">

    {#if errorSubmit}
        <AlertModal message={errorSubmit} msgTextColor={'red'} handleOnOk={closeAlert}/>
    {/if}

    {#if isOtpSentAgain}
        <AlertModal message={"Otp has been resent your Mobile"} msgTextColor={'green'} handleOnOk={closeOtpSentMsg}/>
    {/if}

    <Card class="max-w-sm mx-auto">
        <h1 class="text-2xl font-bold text-center text-violet-600 mb-5">{t_enter_otp}</h1>
        <p class="text-green-500 text-center my-4 font-semibold">{t_otp_sent}</p>

        <form onsubmit={handleOtpSubmit} class="w-full">

            <InputField type="number" required={true} label="Enter OTP" bind:value={otp} errorMsg={t_otpErr}/>

            <button type="button" disabled={resendOtpCount>=1} onclick={handleResendOtp} 
                class="text-sm text-violet-500 font-medium disabled:text-gray-500 disabled:opacity-50">
                {t_resend_otp}
            </button>
            
            <SubmitButton disabled={disabled}/>
        </form>

    </Card>
</main>
