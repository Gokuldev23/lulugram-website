<script>
	import { goto } from "$app/navigation";

	import { otpStore } from "$lib/stores/marketing/otpStore";
    
	import { forgotpassword } from "$lib/js/marketing/api/auth";
	import { validateMobileNumber } from "$lib/js/marketing/utils";

	import Card from "$lib/Components/common/Card.svelte";
	import InputField from "$lib/Components/common/InputField.svelte";
	import AlertModal from "$lib/Components/common/AlertModal.svelte";
	import FullLoading from "$lib/Components/common/FullLoading.svelte";
	import AgentIdInput from "$lib/Components/marketing/AgentIdInput.svelte";
	import SubmitButton from "$lib/Components/common/SubmitButton.svelte";



    let form = $state({
		agentMobile: null,
        countryCode:"+91"
	});

    const validations = $derived({
		mobile: validateMobileNumber(form.agentMobile),
	});

    const formErrors = $derived({
		mobile: validations.mobile ? null : "Invalid mobile number",
	})

    const formValid = $derived(validations.mobile && form.agentMobile);

    let errorSubmit = $state(false)
    let loading = $state(false)
    
    let t_forgot_pass = "Forgot Password"
    let t_password = "Password"
    let t_submit = "Submit"
    let t_mobileNumber = "Mobile Number"
    let t_register = "Register"
    let t_login = "Login"
    
    
    let isValidMobile = $derived(validateMobileNumber(userId))


    const handleForgotPass = async (e) => {
        e.preventDefault();

        let {agentMobile , countryCode } = form
        
        loading = true
        let result = await forgotpassword(agentMobile, countryCode)
        loading = false

        if(result.success){
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
    
                <AgentIdInput bind:mobile={form.agentMobile} bind:countryCode={form.countryCode} mobileErr={formErrors.mobile}/>
    
                <SubmitButton disabled={!formValid}/>
    
                <div class="flex justify-between px-4">
                    <a href="/marketing/auth/register">{t_register}</a>
                    <a href="/marketing/auth/login">{t_login}</a>
                </div>
            </div>
        </form>
    </Card>
</main>

