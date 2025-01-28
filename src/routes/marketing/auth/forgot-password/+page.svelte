<script>
	import { goto } from "$app/navigation";

	import { forgotpassword } from "$lib/js/marketing/api/auth";
	import { otpStore } from "$lib/stores/marketing/otpStore";

	import Card from "$lib/Components/common/Card.svelte";
	import InputField from "$lib/Components/common/InputField.svelte";
	import AlertModal from "$lib/Components/common/AlertModal.svelte";
	import FullLoading from "$lib/Components/common/FullLoading.svelte";
	import { validateMobileNumber } from "$lib/js/marketing/utils";



    let userId = $state(null);  
    let countryCode = $state('+91')
    let errorSubmit = $state('')
    let errorNumber = $state(null)
    let disabled = $state(true)
    let loading = $state(false)
    
    let t_forgot_pass = "Forgot Password"
    let t_password = "Password"
    let t_submit = "Submit"
    let t_mobileNumber = "Mobile Number"
    let t_register = "Register"
    let t_login = "Login"
    
    
    let isValidMobile = $derived(validateMobileNumber(userId))

    $effect(()=>{
        errorNumber = isValidMobile ? null : 'Mobile number is not valid'
        disabled = userId && isValidMobile ? false : true
    })

    const handleForgotPass = async (e) => {
        e.preventDefault();
        
        console.log("comes")
        goto('/marketing/auth/forgot-password-change');
        return            
        // loading = true
        let result = await forgotpassword(userId, countryCode, selectedCountry.countryName)
        loading = false
        if(result.success){
            userIdType = result.userIdType

            let otpToken = result.otpToken
            let userUid = result.userUid
            let userId = result.userId
            let id_type = result.userIdType

            otpStore.set({
                userUid,
                userId,
                id_type,
                otp:'',
                otpToken
            })

            // otpStore.set({...result})
            goto(`/marketing/auth/forgot-password-change`);            
        }else{
            errorSubmit = result.message
        }
    }



    const closeAlert = () => errorSubmit = ''



</script>
  
<main class="flex items-center h-[80vh]">

    {#if loading}
        <FullLoading/>
    {/if}

    {#if errorSubmit}
        <AlertModal message={errorSubmit} msgTextColor={'red'} handleOnOk={closeAlert}/>
    {/if}

    <Card class="max-w-lg mx-auto">
        <form onsubmit={handleForgotPass}  class="">
            <h1 class="text-center md:text-2xl text-xl uppercase text-slate-700 font-bold mb-6">{t_forgot_pass}</h1>
    
            <div class="space-y-5">
    
                <div class="flex gap-1">
                    <select bind:value={countryCode} class="rounded-l-lg" name="" id="">
                        <option value="+91">+91</option>
                        </select>
                    <InputField bind:value={userId} errorMsg={errorNumber} label={t_mobileNumber} type={'number'} disabled={loading}/>
                </div>
    
                <button 
                    type="submit"
                    disabled={disabled}
                    class="px-4 block w-full py-2 bg-violet-500 disabled:bg-gray-500 disabled:opacity-35 text-white rounded hover:bg-blue-600">
                    {t_submit}
                </button>
    
                <div class="flex justify-between px-4">
                    <a href="/marketing/auth/register">{t_register}</a>
                    <a href="/marketing/auth/login">{t_login}</a>
                </div>
            </div>
        </form>
    </Card>
</main>

