<script>
    import { getBankDetails } from "$lib/js/marketing/api/bankVerification";
    import { agentStore } from "$lib/stores/marketing/agentStore";

    let bankDetails = {};
    let accountHolderName = "";
    let accountNumber = "";
    let ifscCode = "";
    let bankName = "";
    let branchName = "";
    let isBankAdded = false;
    let bankStatus = "";

    $: a_token = $agentStore.a_token;

    let t_bank_details = "Bank Details";
    let t_account_holder_name = "Account Holder Name : ";
    let t_account_number = "Account Number : ";
    let t_ifsc_code = "IFSC Code : ";
    let t_bank_name = "Bank Name : ";
    let t_branch_name = "Branch Name : ";
    let t_loading_bank_details = "Loading bank details...";

    const getDetailsOfBank = async (a_token) => {
        let result = await getBankDetails(a_token);
        if (result.success) {
            let data = result.data[0];
            bankDetails = {
                account_holder_name: data.account_holder_name,
                account_number: `XXXXXXXX${data.account_number.slice(-4)}`,
                ifsc_code: data.ifsc_code,
                bank_name: data.bank_name,
                branch_name: data.branch_name
            };

            bankStatus = data.status;

            if(bankStatus === "active"){
                isBankAdded = true;
            } else {
                isBankAdded = false;
            }

            // Extract fields into separate variables
            accountHolderName = bankDetails.account_holder_name;
            accountNumber = bankDetails.account_number;
            ifscCode = bankDetails.ifsc_code;
            bankName = bankDetails.bank_name;
            branchName = bankDetails.branch_name;
        } else {
            console.log("Error fetching bank details");
        }
    };

    $: getDetailsOfBank(a_token);
</script>

<main class="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] bg-gray-100 flex flex-col items-center">
    {#if bankStatus === "active"}
        <div class="w-full bg-white p-4 md:p-6 rounded-lg shadow-lg">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">{t_bank_details}</h2>
            <div class="bg-green-50 p-4 md:p-6 rounded-lg border border-green-300 text-green-700 text-sm md:text-base">
                <table class="w-full table-auto">
                    <tbody>
                        <tr>
                            <td class="text-sm md:text-base">{t_account_holder_name}</td>
                            <td class="font-bold text-sm md:text-base">{accountHolderName}</td>
                        </tr>
                        <tr>
                            <td class="text-sm md:text-base">{t_account_number}</td>
                            <td class="font-bold text-sm md:text-base">{accountNumber}</td>
                        </tr>
                        <tr>
                            <td class="text-sm md:text-base">{t_ifsc_code}</td>
                            <td class="font-bold text-sm md:text-base">{ifscCode}</td>
                        </tr>
                        <tr>
                            <td class="text-sm md:text-base">{t_bank_name}</td>
                            <td class="font-bold text-sm md:text-base">{bankName}</td>
                        </tr>
                        <tr>
                            <td class="text-sm md:text-base">{t_branch_name}</td>
                            <td class="font-bold text-sm md:text-base">{branchName}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    {:else}
        <p class="text-gray-600">{t_loading_bank_details}</p>
    {/if}
</main>
