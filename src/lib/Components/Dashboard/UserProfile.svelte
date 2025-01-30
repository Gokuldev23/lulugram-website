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

<main>
    <div class="relative flex items-center gap-6 p-8 bg-gray-100 border-b border-gray-300">
        {#if profilePicUrl}
            <div class="user-image">
                <img src={profilePicUrl} alt="agent-profile" class="w-24 h-24 rounded-full object-cover" />
            </div>
        {:else}
            <div class="user-image">
                <img src="/marketing/avatar.png" alt="agent-profile" class="w-24 h-24 rounded-full object-cover" />
            </div>
        {/if}
        <div class="user-details">
            <h2 class="text-xl text-gray-800">{agentName}</h2>
            <div class="mt-2 text-gray-600 flex gap-x-1 items-center">
                <p> {t_referral_number} </p> 

                <div class="flex bg-gray-500 rounded gap-x-2 px-4 py-1 text-white">
                    {referralNumber}
                    <span on:click={coptToClipboard}  class="relative" role="button" tabindex="0" on:keypress>
                        {#if copied}
                            <Icon icon="tabler:copy-check-filled" width="24" height="24" />
                        {:else}
                            <Icon icon="tabler:copy" width="24" height="24" />
                        {/if}
                    </span>
                </div>
        
            </div>
        </div>
    </div>
</main>
