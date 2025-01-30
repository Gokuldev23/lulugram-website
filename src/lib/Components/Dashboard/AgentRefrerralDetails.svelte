<script>
    import Icon from '@iconify/svelte';

    let t_referral = "Referrals";
    let t_srNo = "Sr. No";
    let t_name = "Name";
    let t_appName = "App Name";
    let t_platform = "Platform";
    let t_subscriptionStatus = "Subscription Status";
    let t_amountPaid = "Amount Paid";
    let t_commissionPercentage = "Commission Percentage";
    let t_subscribed = "Subscribed";
    let t_not_subscribed = "Not Subscribed";

    // Example: Dynamic referral data
    let referralData = [
        { srNo: 1, name: "John Doe", appName: "Crossword", platform: "Android", subscriptionStatus: "Subscribed", amountPaid: 1000, commissionPercentage: 30 },
        { srNo: 2, name: "Jane Smith", appName: "Gramlok", platform: "iOS", subscriptionStatus: "Subscribed", amountPaid: 500, commissionPercentage: 15 },
        { srNo: 3, name: "Alice Johnson", appName: "Vidyavart", platform: "Web", subscriptionStatus: "Subscribed", amountPaid: 1000, commissionPercentage: 25 },
        { srNo: 4, name: "Bob Brown", appName: "Crossword", platform: "Web", subscriptionStatus: "Subscribed", amountPaid: 1000, commissionPercentage: 30 },
        { srNo: 5, name: "Charlie Davis", appName: "Gramlok", platform: "Android", subscriptionStatus: "Subscribed", amountPaid: 500, commissionPercentage: 15 },
    ];
</script>

<main class="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col items-center">
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
                        <th class="p-2 md:p-4 text-left bg-gray-200 font-bold text-gray-700 text-sm md:text-base">{t_commissionPercentage}</th>
                    </tr>
                </thead>
                <tbody>
                    {#each referralData as item}
                        <tr class="hover:bg-gray-100">
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{item.srNo}</td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{item.name}</td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{item.appName}</td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{item.platform}</td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50 text-center">
                                <div class="flex items-center justify-center">
                                    {#if item.subscriptionStatus === "Subscribed"}
                                        <Icon icon="fa:check-circle" class="text-green-500" />
                                        <p class="ml-2 hidden sm:block">{t_subscribed}</p>
                                    {:else}
                                        <Icon icon="fa:times-circle" class="text-red-500" />
                                        <p class="ml-2 hidden sm:block">{t_not_subscribed}</p>
                                    {/if}
                                </div>
                            </td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{item.amountPaid}</td>
                            <td class="p-2 md:p-4 border-b border-gray-300 text-sm md:text-base bg-gray-50">{item.commissionPercentage}%</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="block md:hidden">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {#each referralData as item}
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <div class="flex items-center mb-2">
                            <h2 class="text-lg font-bold text-gray-900">{item.name}</h2>
                            {#if item.subscriptionStatus === "Subscribed"}
                                <Icon icon="fa:check-circle" class="text-green-500 ml-2" />
                            {:else}
                                <Icon icon="fa:times-circle" class="text-red-500 ml-2" />
                            {/if}
                        </div>
                        <p class="text-gray-600">{t_appName} : <strong> {item.appName} </strong></p>
                        <p class="text-gray-600">{t_platform} : <strong> {item.platform} </strong></p>
                        <p class="text-gray-600">{t_subscriptionStatus} : <strong> {item.subscriptionStatus} </strong></p>
                        <p class="text-gray-600">{t_amountPaid} : <strong> {item.amountPaid} </strong></p>
                        <p class="text-gray-600">{t_commissionPercentage} : <strong> {item.commissionPercentage}% </strong></p>
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
