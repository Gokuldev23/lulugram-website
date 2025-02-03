<script>
    let t_nextDueDate = "Next Due";
    let t_amountToBeReimbursed = "Amount pending";
    let t_date = "Date (dd/mm/yyyy)";
    let t_amount = "Amount (₹)";
    let t_previousPayments = "Previous Payments";


    export let paymentInfo = []
</script>

<section class="mb-8 border border-slate-500 rounded-md p-1">
    <h2 class="text-xl md:text-2xl  py-2 mb-4 rounded bg-gray-600 text-white pl-6 font-bold border-b border-gray-200">{t_previousPayments}</h2>
    <div class="">
            <table class="table-auto w-full">
                <thead class="bg-gray-200 pb-4 text-gray-700 uppercase">
                    <tr class="text-center text-sm md:text-base">
                        <th scope="col" class="px-6 py-3">{t_date} </th>
                        <th scope="col" class="px-6 py-3">{t_amount} </th>
                    </tr>
                </thead>
                <tbody class="text-sm md:text-base">
                    {#each paymentInfo as payment}
                        <tr class="text-center my-4 border border-gray-200">
                            <td class="px-6 py-4">
                                {payment.date}
                            </td>
                            <td class="px-6 py-4">
                                {payment.amount}
                            </td>
                        </tr>
                    {:else}
                        <tr>
                            <td colspan="2" class="text-center py-10  font-medium">No data found</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
    </div>
</section>