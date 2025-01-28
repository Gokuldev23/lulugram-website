<script>
	import { goto } from "$app/navigation";

	import { otpStore } from "$lib/stores/marketing/otpStore";

	import { validateOTP, validatePassword } from "$lib/js/marketing/utils";
	import { changeForgotPassword } from "$lib/js/marketing/api/auth";

	import Card from "$lib/Components/common/Card.svelte";
	import AlertModal from "$lib/Components/common/AlertModal.svelte";
	import InputField from "$lib/Components/common/InputField.svelte";




    let t_successMobile = "OTP sent to your Mobile number Successfully"
    let t_successEmail = "OTP sent to your Email Successfully"
    let t_enterOtp = "Enter OTP"
    let t_submitOtp = "Submit OTP"
    let t_submitSuccess = "OTP Submitted Successfully!"
    let t_enterSixDigitsOtp = "Enter 6-digit OTP"
    let t_new_password = "New Password"
    let t_resend_otp = "Resend Otp?"
    let t_forgot_pass_change = "Forgot password Change"


    let otp = $state(null);
    let newPassword = $state('')
    let loading = $state(false)
    let errorSubmit = $state('')
    let otpTokenPrev = null
    let count = 0
    let disabled = $state(false)
    
    let errNewPass = $state(null)
    let otpError = $state('');

    let isValidPassword = $derived(validatePassword(newPassword))
    let isValidOtp = $derived(validateOTP(otp))

    $effect(()=>{
        errNewPass = isValidPassword ? null : "Password should contain atleast 1 Uppercase, 1 lowercase , 1 Number and 1 symbol"
        otpError = isValidOtp ? null : "OTP is invalid"

        if(!otp || !newPassword || !isValidOtp || !isValidPassword){
            disabled = true
        }else{
            disabled = false
        }
    })

    const closeAlert = () => errorSubmit = ''


    const handleOtpSubmit = async () => {
        if (!otp) 
            return otpError = 'Please enter a valid 6-digit OTP.';
        
        let {otpToken,userUid} = $otpStore

        let result = await changeForgotPassword(userUid,newPassword,otp,otpToken,otpTokenPrev)
        if(result.success){
            otpError = '';
            let data = result.data
            await goto('/marketing/auth/login',{ replaceState : true })
        }else{
            errNewPass = "Invalid inputs!"
        }
        
    }


    const handleResendOtp = async () => {
        let {otpToken,userUid,userId,id_type, countryName} = $otpStore
        count++
        let result = await resendOtp(userId,userUid,id_type,count, countryName)
        if(result.success){
            otpTokenPrev = otpToken
            $otpStore.otpToken = result.otpToken
        }

    }


</script>

<main class="px-4 py-20">

    {#if errorSubmit}
        <AlertModal message={errorSubmit} msgTextColor={'red'} handleOnOk={closeAlert}/>
    {/if}

    <Card class="max-w-lg mx-auto">
        <form onsubmit={handleOtpSubmit} class="">

            <h1 class="text-center md:text-2xl text-xl uppercase text-slate-700 font-bold mb-6">{t_forgot_pass_change}</h1>

            <div class="space-y-5">
                <InputField bind:value={otp} label={t_enterOtp} type={'number'} errorMsg={otpError}/>

                <InputField bind:value={newPassword} errorMsg={errNewPass} label={t_new_password} type={'password'} disabled={loading}/>
    
                <button class="" onclick={handleResendOtp}>{t_resend_otp}</button>
                
                <button 
                    type="submit" 
                    disabled={disabled}
                    class="px-4 block w-full py-2 bg-violet-500 disabled:bg-gray-500 disabled:opacity-35 text-white rounded hover:bg-blue-600">
                    {t_submitOtp}
                </button>
    
            </div>
        </form>
    </Card>

</main>

