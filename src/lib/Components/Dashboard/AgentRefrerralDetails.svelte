<script>
    import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	import { getReferralsDetails } from '$lib/js/marketing/api/agentDashborad';
	import { agentStore } from '$lib/stores/marketing/agentStore';

	import Loading from '../common/Loading.svelte';
	import AlertModal from '../common/AlertModal.svelte';


    
    let t_referral = "Referrals";
    let t_srNo = "Sr. No";
    let t_name = "Name";
    let t_appName = "App Name";
    let t_platform = "Platform";
    let t_subscriptionStatus = "Subscription Status";
    let t_amountPaid = "Amount Paid (₹)";
    let t_commissionAmount = "Commission Amount (₹)";
    let t_subscribed = "Subscribed";
    let t_not_subscribed = "Not Subscribed";


    $: a_token =  $agentStore.a_token

    let referralData = []
    let loading = false
    let errorMsg = ''

    const closeErrAlert = () => errorMsg = ''

    const handleGetReferralsDetails = async () => {

        loading = true
        let result = await getReferralsDetails(a_token)
        loading = false

        if(result.success){
            referralData = result.data
        }else{
            errorMsg = result.message
        }
    }

    onMount(()=> {
        handleGetReferralsDetails()
    })


</script>

<main class="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col items-center">

    {#if errorMsg}
        <AlertModal message={errorMsg} msgTextColor={'red'} handleOnOk={closeErrAlert}/>
    {/if}

    <h1 class="text-3xl md:text-4xl mb-4 text-gray-900 font-extrabold">{t_referral}</h1>
    <div class="w-full bg-white p-4 md:p-5 rounded-lg shadow-lg overflow-x-auto">
        <div class="hidden md:block">
            <table class="w-full border-collapse bg-white">
                <thead>
                    <tr>
                        <th class="p-2 md:p-4 text-left bg-gray-200 font-bold text-gray-700 text-sm md:text-base">{t_srNo}</th>
                        <th class="p-2 md:p-4 text-left bg-gray-200 font-bold text-gray-700 text-sm md:text-base">{t_name}</th>
                        <th class="p-2 md:p-4 text-left bg-gray-200 font-bold text-gray-700 text-sm md:text-base">{t_appName}</th>
                        <th class="p-2 md:p-4 text-left bg-gray-200 font-bold text-gray-700 text-sm md:text-base">{t_platform}</th>
                        <th class="p-2 md:p-4 text-left bg-gray-200 font-bold text-gray-700 text-sm md:text-base">{t_subscriptionStatus}</th>
                        <th class="p-2 md:p-4 text-left bg-gray-200 font-bold text-gray-700 text-sm md:text-base">{t_amountPaid}</th>
                        <th class="p-2 md:p-4 text-left bg-gray-200 font-bold text-gray-700 text-sm md:text-base">{t_commissionAmount}</th>
                    </tr>
                </thead>
                <tbody>
                    {#each referralData as item,i}
                        <tr class="hover:bg-gray-100">
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{i+1}</td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{item.username}</td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{item.productName}</td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{item.platform}</td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50 text-center">
                                <div class="flex items-center">
                                    {#if item.is_subscribed}
                                        <Icon icon="fa:check-circle" class="text-green-500" />
                                        <p class="ml-2 hidden sm:block">{t_subscribed}</p>
                                    {:else}
                                        <Icon icon="fa:times-circle" class="text-red-500" />
                                        <p class="ml-2 hidden sm:block">{t_not_subscribed}</p>
                                    {/if}
                                </div>
                            </td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{item.amount}</td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{item.commssion_percentage}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            {#if loading}
                <div class="w-20 mx-auto py-10">
                    <Loading width={"40px"}/>
                </div>
            {:else if referralData.length == 0}
                <div class="py-20 text-center md:text-lg text-sm ">
                    <p class="">No Referral Found!</p>
                    <p class="">Start Referring using your <span class="font-semibold text-xl"> Referral number </span></p>
                </div>
            {/if}
        </div>
        <div class="block md:hidden">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {#each referralData as item}
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <div class="flex items-center mb-2">
                            <h2 class="text-lg font-bold text-gray-900">{item.username}</h2>
                            {#if item.is_subscribed}
                                <Icon icon="fa:check-circle" class="text-green-500 ml-2" />
                            {:else}
                                <Icon icon="fa:times-circle" class="text-red-500 ml-2" />
                            {/if}
                        </div>
                        <p class="text-gray-600">{t_appName} : <strong> {item.productName} </strong></p>
                        <p class="text-gray-600">{t_platform} : <strong> {item.platform} </strong></p>
                        <p class="text-gray-600">{t_subscriptionStatus} : <strong> {item.is_subscribed? t_subscribed : t_not_subscribed} </strong></p>
                        <p class="text-gray-600">{t_amountPaid} : <strong> {item.amount} </strong></p>
                        <p class="text-gray-600">{t_commissionAmount} : <strong> {item.commssion_percentage}</strong></p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</main>

<style>
    /* Ensure the table is responsive up to 350px */
    @media (max-width: 350px) {
        table, thead, tbody, th, td, tr {
            display: block; /* Force table elements to behave like block elements */
            width: 100%; /* Ensure full width */
        }

        thead tr {
            display: none; /* Hide the table header */
        }

        tr {
            border: 1px solid #ddd;
            margin-bottom: 1rem;
        }

        td {
            border: none;
            border-bottom: 1px solid #ddd;
            position: relative;
            padding-left: 50%;
            text-align: right;
        }

        td::before {
            content: attr(data-label);
            position: absolute;
            left: 0;
            width: 50%;
            padding-left: 1rem;
            font-weight: bold;
            text-align: left;
        }
    }
</style>
