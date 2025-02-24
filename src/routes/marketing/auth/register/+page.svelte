<script>
	import Icon from "@iconify/svelte";
	import { goto } from "$app/navigation";

	import { otpStore } from "$lib/stores/marketing/otpStore";
	import { agentStore } from "$lib/stores/marketing/agentStore";

	import { agentTempRegister } from "$lib/js/marketing/api/auth";
	import { validateAddress, validateMobileNumber, validateName, validatePassword } from "$lib/js/marketing/utils";

    import Card from "$lib/Components/common/Card.svelte";
	import FormTitle from "$lib/Components/Marketing/FormTitle.svelte";
	import InputField from "$lib/Components/common/InputField.svelte";
	import AddressForm from "$lib/Components/Marketing/AddressForm.svelte";
	import AlertModal from "$lib/Components/common/AlertModal.svelte";
	import FullLoading from "$lib/Components/common/FullLoading.svelte";
	import PasswordInput from "$lib/Components/Marketing/PasswordInput.svelte";
	import AgentIdInput from "$lib/Components/Marketing/AgentIdInput.svelte";
	import TermsCheckbox from "$lib/Components/Marketing/TermsCheckbox.svelte";
	import SubmitButton from "$lib/Components/common/SubmitButton.svelte";


    let t_register = "Register"
    let t_already_agent = "Already an Agent?"
    let t_login_here = "Login here!"
    let t_tnc = "Terms and conditions"

    let disabled = $state(false)
    let loading = $state(false)
    let errorSubmit = $state('')

    let form = $state({
		agentName: "",
		agentMobile: null,
		agentPassword: "",
		countryCode: "+91",
		tcAgreed: false,
		address: {
            addressLine : '',
			district: '',
			city: '',
			state: '',
			pinCode: null
		}
	});

    const validations = $derived({
		name: validateName(form.agentName),
		password: validatePassword(form.agentPassword),
		mobile: validateMobileNumber(form.agentMobile),
		address: validateAddress(form.address),
		terms: form.tcAgreed
	});

    const formErrors = $derived({
		name: validations.name ? null : "Name should be at least 3 characters (alphabets)",
		password: validations.password ? null : "Password Should contains 1 Uppercase, 1 Lowercase , 1 Number and 1 Symbol",
		mobile: validations.mobile ? null : "Invalid mobile number"
	});

    const formValid = $derived(
		validations.name &&
		validations.password &&
		validations.mobile &&
		validations.address &&
		validations.terms
	);

    export const snapshot = { // this will capture the form and restore when we coming back this page or reload the page
        capture: () => form,
		restore: (value) => {
            return form = value
        },
        key : ({ url }) => url.pathname
    }

    const closeAlert = () => errorSubmit = ""

    const handleRegisterAgent = async (e) => {
        e.preventDefault();

        let { agentName , agentMobile , agentPassword ,countryCode ,address ,tcAgreed } = form

        loading = true
        let result = await agentTempRegister(agentName,agentPassword,agentMobile,countryCode,address,tcAgreed)
        loading = false

        if(result.success){
            goto('/marketing/auth/otp')
        }
        
        if (result.success === false && result.errors && result.errors.numError > 0) {
            errorSubmit = result.errors.userId
        } 
        else if (result.message){
            errorSubmit = result.message
        }
        else{
            errorSubmit = result.message
        }
    }


</script>


<main class="py-20  overflow-y-auto flex items-center px-4">

    {#if loading}
        <FullLoading/>
    {/if}

    {#if errorSubmit}
        <AlertModal message={errorSubmit} handleOnOk={closeAlert}/>
    {/if}

    <Card class="max-w-lg mx-auto w-full">

        <form onsubmit={handleRegisterAgent}  class="space-y-6">

            <FormTitle title={t_register} />

            <InputField label={"Name"} required={true} bind:value={form.agentName} errorMsg={formErrors.name}/>

            <AgentIdInput bind:mobile={form.agentMobile} bind:countryCode={form.countryCode} mobileErr={formErrors.mobile}/>

            <PasswordInput bind:password={form.agentPassword} errPassword={formErrors.password}/>

            <AddressForm  bind:addressLine={form.address.addressLine} bind:district={form.address.district} 
                bind:city={form.address.city} bind:state={form.address.state} bind:pincode={form.address.pinCode}/>

            <TermsCheckbox bind:checked={form.tcAgreed} t_condition={t_tnc} link={'/marketing/tnc'}/>

            <SubmitButton btnText={t_register} disabled={!formValid}/>

            <p class="mt-4 text-center text-sm md:text-base"> {t_already_agent}
                <a href="/marketing/auth/login" class="text-violet-600 hover:text-violet-800">{t_login_here}</a>
            </p>

        </form>
    </Card>
</main>