<script>
    let t_current_payment = "Current Payment";  
    let t_amountDue = "Amount Due";
    let t_nextPaymentDate = "Next Payment Date";
    let t_previousAmountPaid = "Previous Amount Paid";
    let t_previousPaymentDate = "Previous Payment Date";

    export let amountDue = "Nil"
    export let nextPaymentDate = "Nil"
    export let amountPaid = "Nil"
    export let previousPaymentDate = "Nil"
  
</script>


<section class="mb-8 border border-slate-500 rounded-md p-1">
    <h2 class="text-xl md:text-2xl  py-2 mb-4 rounded bg-gray-600 text-white pl-6 font-bold border-b border-gray-200">{t_current_payment}</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-1">
        <div class="bg-gray-50  rounded-lg">
            <p class="text-gray-700 font-semibold text-sm md:text-base lg:text-lg bg-gray-200 text-center py-1  ">{t_amountDue}</p>
            <p class="text-sm md:text-base  font-semibold text-gray-800 text-center my-2">₹ {amountDue}</p>
        </div>
        <div class="bg-gray-50  rounded-lg">
            <p class="text-gray-700 font-semibold text-sm md:text-base lg:text-lg bg-gray-200 text-center py-1 ">{t_nextPaymentDate}</p>
            <p class="text-sm md:text-base  font-semibold text-gray-800 text-center my-2">{nextPaymentDate}</p>
        </div>
        <div class="bg-gray-50  rounded-lg">
            <p class="text-gray-700 font-semibold text-sm md:text-base lg:text-lg bg-gray-200 text-center py-1 ">{t_previousAmountPaid}</p>
            <p class="text-sm md:text-base  font-semibold text-gray-800 text-center my-2">₹ {amountPaid}</p>
        </div>
        <div class="bg-gray-50  rounded-lg">
            <p class="text-gray-700 font-semibold text-sm md:text-base lg:text-lg bg-gray-200 text-center py-1 ">{t_previousPaymentDate}</p>
            <p class="text-sm md:text-base  font-semibold text-gray-800 text-center my-2">{previousPaymentDate}</p>
        </div>
    </div>
</section>