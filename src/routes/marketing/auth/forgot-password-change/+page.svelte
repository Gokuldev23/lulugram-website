<script>
	import { goto } from "$app/navigation";

	import { otpStore } from "$lib/stores/marketing/otpStore";

	import { validateOTP, validatePassword } from "$lib/js/marketing/utils";
	import { changeForgotPassword } from "$lib/js/marketing/api/auth";

	import Card from "$lib/Components/common/Card.svelte";
	import AlertModal from "$lib/Components/common/AlertModal.svelte";
	import InputField from "$lib/Components/common/InputField.svelte";
	import PasswordInput from "$lib/Components/marketing/PasswordInput.svelte";
	import FullLoading from "$lib/Components/common/FullLoading.svelte";
	import SubmitButton from "$lib/Components/common/SubmitButton.svelte";




    let t_successMobile = "OTP sent to your Mobile number Successfully"
    let t_successEmail = "OTP sent to your Email Successfully"
    let t_enterOtp = "Enter OTP"
    let t_submitOtp = "Submit OTP"
    let t_submitSuccess = "OTP Submitted Successfully!"
    let t_enterSixDigitsOtp = "Enter 6-digit OTP"
    let t_new_password = "New Password"
    let t_resend_otp = "Resend Otp?"
    let t_forgot_pass_change = "Forgot password Change"


    let loading = $state(false)
    let errorSubmit = $state('')
    let otpTokenPrev = null
    let resendOtpCount = $state(0)
    let isOtpSentAgain = $state(false)
    let showPassword = $state(false)

    let form = $state({
		otp: null,
		newPassword: "",
        countryCode:"+91"
	});

    const validations = $derived({
        otp : validateOTP(form.otp),
		password: validatePassword(form.newPassword)
	});

    const formErrors = $derived({
		otp: validations.otp ? null : "Invalid OTP",
		password: validations.password ? null : "Password Should contains 1 Uppercase, 1 Lowercase , 1 Number and 1 Symbol",
	})

    const formValid = $derived(
		(form.otp && validations.otp ) &&
		(form.newPassword && validations.password)
	);
    

    const closeAlert = () => errorSubmit = ''

    const toggleSeekPassword = () => showPassword = !showPassword

    const handleOtpSubmit = async () => {
        if (!form.otp) 
            return otpError = 'Please enter a valid 6-digit OTP.';
        
        let {otpToken,agentUid} = $otpStore
        let { otp , newPassword } = form

        loading = true
        let result = await changeForgotPassword(agentUid,newPassword,otp,otpToken,otpTokenPrev)
        loading = false

        if(result.success){
            let data = result.data
            goto('/marketing/auth/login',{ replaceState : true })
        }else{
            errorSubmit = result.message
        }
        
    }


    const handleResendOtp = async () => {
        let {otpToken,agentUid,agentId} = $otpStore
        resendOtpCount++
        let result = await resendOtp(agentId,agentUid,resendOtpCount)
        if(result.success){
            otpTokenPrev = otpToken
            $otpStore.otpToken = result.otpToken
        }else{
            errorSubmit = result.message
        }

    }


</script>

<main class="px-4 py-20">

    {#if loading}
        <FullLoading/>
    {/if}

    {#if errorSubmit}
        <AlertModal message={errorSubmit} msgTextColor={'red'} handleOnOk={closeAlert}/>
    {/if}

    <Card class="max-w-lg mx-auto">
        <form onsubmit={handleOtpSubmit} class="">

            <h1 class="text-center md:text-2xl text-xl uppercase text-slate-700 font-bold mb-6">{t_forgot_pass_change}</h1>

            <div class="space-y-5">
                <InputField required={true} bind:value={form.otp} label={t_enterOtp} type={'number'} errorMsg={formErrors.otp}/>

                <PasswordInput bind:password={form.newPassword} errPassword={formErrors.password} {showPassword} toggleSeekPassword={toggleSeekPassword}/>
    
                <button type="button" disabled={resendOtpCount>=1} onclick={handleResendOtp} 
                    class="text-sm text-violet-500 font-medium disabled:text-gray-500 disabled:opacity-50">
                    {t_resend_otp}
                </button>
                
                <SubmitButton disabled={!formValid} />
    
            </div>
        </form>
    </Card>

</main>

