<script>
	import Icon from "@iconify/svelte";
    import { agentStore } from "$lib/stores/marketing/agentStore";


    let t_become_marketer = "🚀 Become a Marketing Partner Today"

    let t_join_marketing_program = "Join our Marketing Partner Program"
    let t_work_anywhere = "Work from Anywhere"
    let t_no_investment = "No Investment"
    let t_start_earning = "Start earning hansdsome"
    let t_commision = "Comission"
    let t_description_line = `by referring our apps—Gramlok, 
        Crossword, Vidyavart, and more! For every user you refer who purchases a subscription, you’ll receive`
    
    let t_login = "Login"
    let t_register = "Register"


</script>

<main class="max-w-5xl py-20 mx-auto px-4">
    <h1 class="md:text-4xl text-2xl  text-center mb-10 font-semibold text-violet-600">{t_become_marketer}</h1>
    <img class="md:max-w-sm max-w-xs mx-auto" src="/marketing/landing.svg" alt="">
    <ul class="text-center md:text-2xl/8 text-xl bg-gradient-to-r from-blue-200 to-violet-200 rounded-xl border py-4 space-y-3 font-bold text-orange-500  max-w-2xl  my-5 mx-auto ">
        <li>{t_join_marketing_program}</li>
        <li>{t_work_anywhere}</li>
        <li>{t_no_investment}</li>
        <li><strong class="text-violet-600 md:text-2xl text-xl"> {t_commision}.</strong> </li>
    </ul>

    <p class="text-justify md:text-lg/8  max-w-2xl my-10 mx-auto">
       {t_description_line}
        <strong class="text-violet-600 text-xl">{t_commision}.</strong> 
        <strong>  No investment </strong>, no risk—just share and earn!
        <a href="/marketing/tnc" class="text-blue-500">For more Information , click here</a>
    </p>

    {#if $agentStore.signedIn}
        <div>
            <a href="/marketing/agent-dashboard" class="bg-blue-500 py-1 px-4  md:text-2xl text-xl text-white font-medium  max-w-xs w-full mx-auto rounded-2xl flex gap-2 justify-center items-center">
                <Icon icon="nimbus:marketing"  />
                Start Referring
            </a>
        </div>
    {:else}
        <div class="md:mt-10 mt-5">
            <h1 class="text-center w-fit mx-auto px-6  md:text-xl text-lg rounded-lg text-slate-800 py-2 font-semibold">To Get started</h1>
            <div class="flex items-center justify-center md:gap-10 gap-4 md:my-10 my-4  max-w-lg mx-auto  md:text-2xl text-xl text-white font-medium ">
                <a href="/marketing/auth/login" class="bg-blue-500 py-1 px-4 max-w-xs w-full rounded-2xl flex gap-2 justify-center items-center">
                    <Icon icon="material-symbols:login-rounded" width="24" height="24" />
                    Login
                </a>
                <a href="/marketing/auth/register" 
                class="bg-orange-500 py-1 px-4 max-w-xs w-full rounded-2xl  text-white font-medium flex gap-2 justify-center items-center">
                    <Icon icon="mdi:register" width="24" height="24" />
                    Register
                </a>
            </div>
        </div>
    {/if}
</main>