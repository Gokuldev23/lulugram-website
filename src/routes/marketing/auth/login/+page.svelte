<script>
	import { goto } from "$app/navigation";
    
	import { agentStore } from "$lib/stores/marketing/agentStore";

	import { agentLogin } from "$lib/js/marketing/api/auth";
	import { validateMobileNumber, validatePassword } from "$lib/js/marketing/utils";

    import Card from "$lib/Components/common/Card.svelte";
	import AgentIdInput from "$lib/Components/Marketing/AgentIdInput.svelte";
	import PasswordInput from "$lib/Components/Marketing/PasswordInput.svelte";
	import FullLoading from "$lib/Components/common/FullLoading.svelte";
	import AlertModal from "$lib/Components/common/AlertModal.svelte";
	import SubmitButton from "$lib/Components/common/SubmitButton.svelte";
	import FormTitle from "$lib/Components/Marketing/FormTitle.svelte";


    let t_login = "Login"
    let t_register_here = "Register here!"
    let t_not_agent = "Not an Agent?"
    let t_forgotpassword = "Forgot password?"

    let loading = $state(false)
    let errorSubmit = $state('')

    export const snapshot = {
        capture: () => form,
		restore: (value) => {
            return form = value
        },
        key : ({ url }) => url.pathname
    }

    let form = $state({
		agentMobile: null,
		agentPassword: "",
        countryCode:"+91"
	});

    const validations = $derived({
		mobile: validateMobileNumber(form.agentMobile),
		password: validatePassword(form.agentPassword)
	});

    const formErrors = $derived({
		mobile: validations.mobile ? null : "Invalid mobile number",
		password: validations.password ? null : "Password is not valid"
	})

    const formValid = $derived(
		(form.agentMobile && validations.mobile) &&
		(form.agentPassword && validations.password )
	);

 


    const closeAlert = () => errorSubmit = ''

    const handleLoginAgent = async (e) => {
        e.preventDefault();
        
        let {agentMobile , agentPassword ,countryCode } = form

        loading = true
        let result = await agentLogin(agentMobile,agentPassword,countryCode)
        loading = false
        
        if(result.success){
            goto('/marketing/agent-dashboard',{replaceState:true})
        }else{
            errorSubmit = result.message
        }
    }

    $effect.pre(()=>{
        if($agentStore.signedIn){
            goto('/marketing/agent-dashboard',{replaceState:true})
        }
    })

</script>


<main class="py-20 flex items-center px-4">

    {#if loading}
        <FullLoading/>
    {/if}

    {#if errorSubmit}
        <AlertModal message={errorSubmit} msgTextColor={'red'} handleOnOk={closeAlert}/>
    {/if}

    <Card class=" max-w-lg mx-auto w-full">
        <form onsubmit={handleLoginAgent}  class="space-y-6">
            
            <FormTitle title={t_login}/>

            <AgentIdInput bind:mobile={form.agentMobile} bind:countryCode={form.countryCode} mobileErr={formErrors.mobile} />

            <PasswordInput bind:password={form.agentPassword}  errPassword={formErrors.password}/>

            <a class="text-sm  block text-violet-500" href="/marketing/auth/forgot-password">{t_forgotpassword}</a>

            <div class="space-y-3">
                <SubmitButton btnText={t_login} disabled={!formValid}/> 

                <p class="text-sm md:text-base text-center">
                    {t_not_agent}
                    <a href="/marketing/auth/register" class="text-violet-600 hover:text-violet-800">
                        {t_register_here}
                    </a>
                </p>
            </div>

        </form>
    </Card>
    
</main>