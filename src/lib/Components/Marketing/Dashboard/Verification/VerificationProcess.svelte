<script>
    import AgentProfileHeader from "../AgentProfileHeader.svelte";
    import Email from "./Email.svelte";
    import BankDetails from "./BankDetails.svelte";
    // import AadharDetails from "./AadharDetails.svelte";

    let t_verify_details = "Verification Details";
</script>

<main>
    <AgentProfileHeader />
    <h1 class="text-3xl md:text-4xl text-center mt-6 font-bold text-gray-800 mb-4">{t_verify_details}</h1>
    <Email />
    <BankDetails />
    <!-- <AadharDetails />    -->
</main>

<style>

</style>