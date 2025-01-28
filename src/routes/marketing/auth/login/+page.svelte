<script>
    import Card from "$lib/Components/common/Card.svelte";
	import InputField from "$lib/Components/common/InputField.svelte";
	import { validateMobileNumber, validatePassword } from "$lib/js/marketing/utils";


    let t_login = "Login"
    let t_register_here = "Register here!"
    let t_not_agent = "Not an Agent?"
    let t_forgotpassword = "Forgot password?"


    let t_mobileErr = $state(null)
    let t_passwordErr = $state(null)

    let agentMobile = $state(null)
    let agentPassword = $state("")
    let disabled = $state(true)

    let isValidMobile = $derived(validateMobileNumber(agentMobile))
    let isValidPassword = $derived(validatePassword(agentPassword))

    $effect(()=>{
        t_mobileErr = isValidMobile ? null : "Mobile is not valid"
        t_passwordErr = isValidPassword ? null : "Password is not valid"

        if( !isValidMobile || !isValidPassword || agentMobile == null || !agentPassword ){
            disabled = true
        }else{
            disabled = false
        }
    })

    const handleLoginAgent = async (e) => {
        e.preventDefault();
        
        console.log("login")
    }

</script>


<main class="py-20 flex items-center px-4">
    <Card class=" max-w-lg mx-auto w-full">
        <form onsubmit={handleLoginAgent}  class="space-y-6">
            <h1 class="text-center md:text-3xl text-2xl  uppercase text-slate-700 font-bold mb-6">{t_login}</h1>

            <InputField label={"Mobile No"} required={true} type={"number"} bind:value={agentMobile} errorMsg={t_mobileErr}/>

            <InputField label={"Password"} required={true} type={"password"} bind:value={agentPassword} errorMsg={t_passwordErr}/>

            <a class="text-xs  block text-violet-500" href="/marketing/auth/forgot-password">{t_forgotpassword}</a>

            <div class="">
                <button type="submit" disabled={disabled} class="px-4 block w-full py-2 bg-violet-500 disabled:bg-gray-500 disabled:opacity-40 text-white 
                        rounded hover:bg-blue-600">
                    {t_login}
                </button>
                <p class="mt-4 text-sm md:text-base text-center">{t_not_agent}
                    <a href="/marketing/auth/register" class="text-violet-600 hover:text-violet-800">{t_register_here}</a>
                </p>
            </div>

        </form>
    </Card>
    
</main>