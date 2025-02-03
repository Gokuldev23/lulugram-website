<script>
        let t_totalPaymentInformation = "Gross Payment Information";
        let t_totalAmountPaidTillDate = "Total Commision Paid";
        let t_nextDueDate = "Next Due";
        let t_amountToBeReimbursed = "Amount pending";
        let t_date = "Date (dd/mm/yyyy)";
        let t_amount = "Amount (₹)";

        export let totalAmountPaid = "Nil"
        export let nextPaymentDate = "Nil"
        export let amountDue = "Nil"

</script>




<section class="mb-8 border border-slate-500 rounded-md p-1">
    <h2 class="text-xl md:text-2xl  py-2 mb-4 rounded bg-gray-600 text-white pl-6 font-bold border-b border-gray-200">{t_totalPaymentInformation}</h2>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-1 ">
        <div class="bg-gray-50  rounded-lg">
            <p class="text-gray-700 font-semibold text-sm md:text-base lg:text-lg bg-gray-200 text-center py-1  px-4 ">{t_totalAmountPaidTillDate}</p>
            <p class="text-lg md:text-xl  font-semibold {totalAmountPaid != "Nil"?"text-green-600":"text-gray-600"} text-center my-2">{totalAmountPaid}</p>
        </div>
        <div class="bg-gray-50  rounded-lg">
            <p class="text-gray-700 font-semibold text-sm md:text-base lg:text-lg bg-gray-200 text-center py-1 ">{t_nextDueDate}</p>
            <p class="text-sm md:text-base  font-semibold text-gray-800 text-center my-2">{nextPaymentDate}</p>
        </div>
        <div class="bg-gray-50  rounded-lg">
            <p class="text-gray-700 font-semibold text-sm md:text-base lg:text-lg bg-gray-200 text-center py-1 ">{t_amountToBeReimbursed}</p>
            <p class="text-sm md:text-base  font-semibold text-gray-800 text-center my-2">{amountDue}</p>
        </div>
    </div>
</section>