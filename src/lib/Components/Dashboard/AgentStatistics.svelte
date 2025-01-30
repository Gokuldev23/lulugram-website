<script>
	import { onMount } from "svelte";
    
	import { agentStore } from "$lib/stores/marketing/agentStore";
	import { getUsersCountForEachProduct } from "$lib/js/marketing/api/agentDashborad";

	import Loading from "../common/Loading.svelte";


    let t_agent_statistics = "Agent Statistics";
    let t_platform_statistics = "Platform Statistics";
    let t_referred_users = "Referred Users";    
    let t_not_subscribed_users = "Not Subscribed Users";
    let t_subscribed_users = "Subscribed Users";
    // Sample data for agent statistics
    $: a_token =  $agentStore.a_token


    let agentStats = []
    let loading = false
    let errorMsg = ''

    const closeErrAlert = () => errorMsg = ''

    const handleGetReferralsDetails = async () => {

        loading = true
        let result = await getUsersCountForEachProduct(a_token)
        loading = false

        if(result.success){
            let sortBySubCount = result.data.sort((a,b)=> b.subscribed_count - a.subscribed_count )
            agentStats = sortBySubCount
        }else{
            errorMsg = result.message
        }
    }

    onMount(()=>{
        handleGetReferralsDetails()
    })
</script>

<main class="flex flex-col items-center p-5 md:p-8 bg-gray-100 min-h-screen">

    {#if errorMsg}
        <AlertModal message={errorMsg} msgTextColor={'red'} handleOnOk={closeErrAlert}/>
    {/if}

    <h1 class="text-3xl md:text-4xl mb-6 text-gray-900 font-extrabold">{t_agent_statistics}</h1>
    <div class="w-full max-w-3xl bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8">
        <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold">{t_platform_statistics}</h2>
        <hr class="my-6 border-gray-300" />
        {#each agentStats as {product_name,total_count,subscribed_count,not_subscribed_count}}
            <div class="border-b border-gray-300 pb-6 mb-6">
                <h3 class="text-xl md:text-2xl mb-4 text-gray-700 font-semibold capitalize">{product_name}</h3>
                <div class="mb-6">
                    <p class="mb-2 font-bold text-gray-800">{t_referred_users}</p>
                    <div class="relative bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div class="h-full bg-green-500" style="width: {(total_count) * 100}%;"></div>
                        <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 font-bold">{total_count}</span>
                    </div>
                </div>
              
                <div class="mb-6">
                    <p class="mb-2 font-bold text-gray-800">{t_subscribed_users}</p>
                    <div class="relative bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div class="h-full bg-green-500 inline-block" style="width: {(subscribed_count / total_count) * 100}%;"></div>
                        <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 font-bold">{subscribed_count}</span>
                    </div>
                </div>

                <div class="mb-6">
                    <p class="mb-2 font-bold text-gray-800">{t_not_subscribed_users}</p>
                    <div class="relative bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div class="h-full bg-green-500 inline-block" style="width: {(not_subscribed_count / total_count) * 100}%;"></div>
                        <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 font-bold">{not_subscribed_count}</span>
                    </div>
                </div>
            </div>
        {:else}
            {#if loading}
                <div class="w-20 mx-auto py-10">
                    <Loading width={"40px"}/>
                </div>
            {:else}
                <div class="py-10">
                    <p class="text-center text-xl font-semibold w-full">No data Found</p>
                </div>
            {/if}
        {/each}
    </div>
</main>

<style>
    /* Add hover effects for better interactivity */
    .border-b:hover {
        background-color: #f9f9f9;
        transition: background-color 0.3s ease;
    }
</style>
