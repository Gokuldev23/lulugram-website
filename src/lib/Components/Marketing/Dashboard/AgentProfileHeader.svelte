<script>
	import Icon from "@iconify/svelte";
	import { agentStore } from "$lib/stores/marketing/agentStore";

    let t_referral_number = "Referral Number : "

    $: agentName = $agentStore.agentName
    $: referralNumber = $agentStore.referralCode;
    $: profilePicUrl = $agentStore.profilePic

    let copied = false
    const coptToClipboard = () => {
        navigator.clipboard.writeText(referralNumber);
        copied = true
        setTimeout(()=>{
            copied = false
        },2000)
    }
</script>

<main class="bg-gray-100 border-b border-gray-400">
    <div class="flex items-center gap-4 p-4">
        <!-- Profile Image -->
        {#if profilePicUrl}
            <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <img src={profilePicUrl} alt="agent-profile" class="rounded-full object-cover w-full h-full" />
            </div>
        {:else}
            <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <img src="/marketing/avatar.png" alt="agent-profile" class="rounded-full object-cover w-full h-full" />
            </div>
        {/if}

        <!-- User Details -->
        <div class="flex-1">
            <h2 class="text-gray-800 text-lg md:text-xl font-bold">{agentName}</h2>
            <div class="mt-2 text-gray-600">
                <div class="referral-container">
                    <p class="text-md md:text-base">{t_referral_number}</p>
                    <div class="flex items-center bg-gray-600 text-xl rounded-lg gap-x-2 px-4 py-2 text-white max-w-fit">
                        <span class="text-sm md:text-base">{referralNumber}</span>
                        <button
                            on:click={coptToClipboard}
                            class="rounded-md hover:bg-gray-400 transition-colors focus:outline-none"
                            aria-label="Copy to clipboard"
                        >
                            {#if copied}
                                <Icon icon="tabler:copy-check-filled" class="w-6 h-6" />
                            {:else}
                                <Icon icon="tabler:copy" class="w-6 h-6" />
                            {/if}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .referral-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    @media (min-width: 500px) {
        .referral-container {
            flex-direction: row;
            align-items: center;
        }
    }
</style>