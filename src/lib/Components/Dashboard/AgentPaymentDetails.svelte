<script>
    let t_payment_information = "Payment Information";
    let t_current_payment = "Current Payment";  
    let t_amountDue = "Amount Due";
    let t_nextPaymentDate = "Next Payment Date";
    let t_previousAmountPaid = "Previous Amount Paid";
    let t_previousPaymentDate = "Previous Payment Date";
    let t_previousPayments = "Previous Payments";
    let t_totalPaymentInformation = "Total Payment Information";
    let t_totalAmountPaidTillDate = "Total Amount Paid Till Date";
    let t_nextDueDate = "Next Due Date";
    let t_amountToBeReimbursed = "Amount to be Reimbursed";
    let t_date = "Date :";
    let t_amount = "Amount :";

    // Sample data for payment information
    let paymentInfo = {
        amountPaid: 500,
        amountDue: 200,
        nextPaymentDate: '2023-12-01',
        previousPaymentDate: '2023-11-01',
        previousPayments: [
            { date: '2023-10-01', amount: 300 },
            { date: '2023-09-01', amount: 250 },
            { date: '2023-08-01', amount: 200 }
        ]
    };

    // Calculate total amount paid till date
    let totalAmountPaid = paymentInfo.previousPayments.reduce((total, payment) => total + payment.amount, 0) + paymentInfo.amountPaid;

</script>

<main class="p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center">
    <h1 class="text-3xl md:text-4xl mb-8 text-gray-900 font-extrabold text-center">{t_payment_information}</h1>
    <div class="w-full max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow-2xl mb-8">

        <!-- Total Payment Information Section -->

        <section class="mb-8">
            <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold border-b border-gray-200 pb-3">{t_totalPaymentInformation}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-gray-600 text-sm">{t_totalAmountPaidTillDate}</p>
                    <p class="text-xl font-semibold text-gray-800">₹ {totalAmountPaid}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-gray-600 text-sm">{t_nextDueDate}</p>
                    <p class="text-xl font-semibold text-gray-800">{paymentInfo.nextPaymentDate}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-gray-600 text-sm">{t_amountToBeReimbursed}</p>
                    <p class="text-xl font-semibold text-gray-800">₹ {paymentInfo.amountDue}</p>
                </div>
            </div>
        </section>

        <!-- Current Payment Section -->
        <section class="mb-8">
            <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold border-b border-gray-200 pb-3">{t_current_payment}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-gray-600 text-sm">{t_amountDue}</p>
                    <p class="text-xl font-semibold text-gray-800">₹ {paymentInfo.amountDue}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-gray-600 text-sm">{t_nextPaymentDate}</p>
                    <p class="text-xl font-semibold text-gray-800">{paymentInfo.nextPaymentDate}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-gray-600 text-sm">{t_previousAmountPaid}</p>
                    <p class="text-xl font-semibold text-gray-800">₹ {paymentInfo.amountPaid}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-gray-600 text-sm">{t_previousPaymentDate}</p>
                    <p class="text-xl font-semibold text-gray-800">{paymentInfo.previousPaymentDate}</p>
                </div>
            </div>
        </section>

        <!-- Previous Payments Section -->
        <section class="mb-8">
            <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold border-b border-gray-200 pb-3">{t_previousPayments}</h2>
            <div class="space-y-4">
                {#each paymentInfo.previousPayments as payment}
                    <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                        <p class="text-gray-700">{t_date} <strong>{payment.date}</strong></p>
                        <p class="text-gray-700">{t_amount} <strong> ₹ {payment.amount}</strong></p>
                    </div>
                {/each}
            </div>
        </section>

        
    </div>
</main>

<style>
    /* Ensure the component is responsive */
    @media (max-width: 640px) {
        .text-xl {
            font-size: 18px;
        }
        .text-2xl {
            font-size: 20px;
        }
        .text-3xl {
            font-size: 22px;
        }
    }
</style>