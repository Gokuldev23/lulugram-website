<script>
    import { writable } from 'svelte/store';
    import AgentRefrerralDetails from './AgentRefrerralDetails.svelte';
    import AgentStatistics from './AgentStatistics.svelte';
    import AgentPaymentDetails from './AgentPaymentDetails.svelte';
    import AgentDetails from './AgentDetails.svelte';

    export let currentPage = writable('Referrals');

    let t_referral = "Referrals";
    let t_agent_statistics = "Agent Statistics";
    let t_payment_information = "Payment Information";
    let t_agent_details = "Agent Details";

    const navigateTo = (page) => {
        currentPage.set(page);
    };

    $: page = $currentPage;
</script>

<nav class="bg-gray-800 p-2 shadow-md">
    <ul class="flex flex-wrap justify-between w-full">
        <li class="flex-1">
            <button
                on:click={() => navigateTo('Referrals')}
                class={`block p-2 rounded text-white text-center text-sm sm:text-base transition-all duration-300 ${page === 'Referrals' ? 'bg-gray-700' : 'hover:bg-gray-600 hover:mx-2'}`}
            >
                {t_referral}
            </button>
        </li>
        <li class="flex-1">
            <button
                on:click={() => navigateTo('Agent Statistics')}
                class={`block p-2 rounded text-white text-center text-sm sm:text-base transition-all duration-300 ${page === 'Agent Statistics' ? 'bg-gray-700' : 'hover:bg-gray-600 hover:mx-2'}`}
            >
               {t_agent_statistics}
            </button>
        </li>
        <li class="flex-1">
            <button
                on:click={() => navigateTo('Payment Information')}
                class={`block p-2 rounded text-white text-center text-sm sm:text-base transition-all duration-300 ${page === 'Payment Information' ? 'bg-gray-700' : 'hover:bg-gray-600 hover:mx-2'}`}
            >
                {t_payment_information}
            </button>
        </li>
        <li class="flex-1">
            <button
                on:click={() => navigateTo('Agent Details')}
                class={`block p-2 rounded text-white text-center text-sm sm:text-base transition-all duration-300 ${page === 'Agent Details' ? 'bg-gray-700' : 'hover:bg-gray-600 hover:mx-2'}`}
            >
                {t_agent_details}
            </button>
        </li>
    </ul>
</nav>

<main class="font-sans mx-auto shadow-md bg-gray-100 rounded-lg">
    {#if page === 'Referrals'}
        <AgentRefrerralDetails />
    {:else if page === 'Agent Statistics'}
        <AgentStatistics />
    {:else if page === 'Payment Information'}
        <AgentPaymentDetails />
    {:else if page === 'Agent Details'}
        <AgentDetails />
    {/if}
</main>
