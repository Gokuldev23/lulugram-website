<script>
	import { goto } from "$app/navigation";

	import { otpStore } from "$lib/stores/marketing/otpStore";

	import { agentTempRegister } from "$lib/js/marketing/api/auth";
	import { checkFields, validateMobileNumber, validateName, validatePassword } from "$lib/js/marketing/utils";

    import Card from "$lib/Components/common/Card.svelte";
	import InputField from "$lib/Components/common/InputField.svelte";
	import AddressForm from "$lib/Components/marketing/AddressForm.svelte";
	import AlertModal from "$lib/Components/common/AlertModal.svelte";



    let t_register = "Register"
    let t_already_agent = "Already an Agent?"
    let t_login_here = "Login here!"
    let t_agree_to = "I agree to the"
    let t_tnc = "Terms and conditions"

    let address = {}

    let agentName = $state("")
    let agentMobile = $state("")
    let agentPassword = $state("")
    let countryCode = $state("+91")
    let tcAgreed = $state(false)
    let disabled = $state(true)

    let district = $state('')
    let city = $state('')
    let state = $state('')
    let pincode = $state(null)

    let t_nameErr = $state(null)
    let t_passwordErr = $state(null)
    let t_mobileErr = $state(null)
    let errorSubmit = $state('')


    //////// $derived rune will reasign the variables when the inside state changes//////////////////////
    let isValidName = $derived(validateName(agentName))
    let isValidPassword = $derived(validatePassword(agentPassword))
    let isValidMobileNo = $derived(validateMobileNumber(agentMobile))

    
    ////////////////// this $effect block will run when the inside variables state changes ///////////////////////
    $effect(()=>{
        t_nameErr = isValidName ? null : "Name should atleast 3 character"
        t_passwordErr = isValidPassword ? null : "Password should contain atleast 1 Uppercase, 1 lowercase , 1 Number and 1 symbol"
        t_mobileErr = isValidMobileNo ? null : "Mobile is not valid"

        address = {
            district,
            city,
            state,
            pin:pincode
        }

        let isFormFilled = checkFields(agentName,agentMobile,agentPassword,address)

        if( !isValidMobileNo || !isValidPassword || !isValidName || !isFormFilled || !tcAgreed){
            disabled = true
        }else{
            disabled = false
        }

    })
 
    const closeAlert = () => errorSubmit = ""

    const handleRegisterAgent = async () => {

        let result = await agentTempRegister(agentName,agentPassword,agentMobile,countryCode,address,tcAgreed)

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


<main class="py-20 flex items-center px-4">

    {#if errorSubmit}
        <AlertModal message={errorSubmit} handleOnOk={closeAlert}/>
    {/if}

    <Card class="max-w-lg mx-auto w-full">
        <form onsubmit={handleRegisterAgent}  class=" space-y-6">
            <h1 class="text-center md:text-3xl text-xl uppercase text-slate-700 font-bold mb-6">{t_register}</h1>

            <InputField label={"Name"} required={true} bind:value={agentName} errorMsg={t_nameErr}/>

            <div id="mobile-input" class="flex gap-1">
                <select bind:value={countryCode} class="rounded-l-lg" name="" id="">
                    <option value="+91">+91</option>
                </select>
                <InputField required={true} label={"Mobile No"}    type={"number"} bind:value={agentMobile}/>
            </div>

            <div id="password-input">
                <InputField label={"Password"} required={true} type={"password"} bind:value={agentPassword} errorMsg={t_passwordErr}/>
            </div>

            <AddressForm bind:district={district} bind:city={city} bind:state={state} bind:pincode={pincode}/>

            <div class="">

                <div id="checkbox-input" class="my-4">
                    <input bind:checked={tcAgreed} type="checkbox" name="tc" id="tc">
                    <label for="tc"> {t_agree_to} <a class="text-violet-500 font-medium" href="/marketing/tnc">{t_tnc}</a> </label>
                </div>

                <button 
                    type="submit"
                    disabled={disabled}
                    class="px-4 block w-full py-2 bg-violet-500 disabled:bg-gray-500 disabled:opacity-35 text-white rounded hover:bg-blue-600">
                    {t_register}
                </button>

                <p class="mt-4 text-center text-sm md:text-base"> {t_already_agent}
                    <a href="/marketing/auth/login" class="text-violet-600 hover:text-violet-800">{t_login_here}</a>
                </p>
            </div>
        </form>
    </Card>
</main>