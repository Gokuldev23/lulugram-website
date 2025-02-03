<script>
    import CurrentPayInfo from "./CurrentPayInfo.svelte";
    import GrossPayInfo from "./GrossPayInfo.svelte";
    import PreviousPayInfo from "./PreviousPayInfo.svelte";

    let t_payment_information = "Payment Information";

    // Sample data for payment information
    let paymentInfo = {
        amountPaid: '',
        amountDue: '',
        nextPaymentDate: '',
        previousPaymentDate: '',
        previousPayments: []
    };

    // Calculate total amount paid till date
    let totalAmountPaid = paymentInfo.previousPayments.reduce((total, payment) => total + payment.amount, 0) + paymentInfo.amountPaid;

</script>

<main class="p-1 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center">
    <h1 class="text-3xl md:text-4xl mb-8 text-gray-900 font-extrabold text-center">{t_payment_information}</h1>
    <div class="w-full max-w-4xl bg-white p-2 md:p-4 rounded-xl shadow-2xl mb-8">

        <GrossPayInfo totalAmountPaid={paymentInfo.totalAmountPaid} amountDue={paymentInfo.amountDue} nextPaymentDate={paymentInfo.nextPaymentDate} />

        <CurrentPayInfo amountDue={paymentInfo.amountDue} amountPaid={paymentInfo.amountPaid} previousPaymentDate={paymentInfo.previousPaymentDate}/>

        <PreviousPayInfo/>
        
    </div>
</main>
