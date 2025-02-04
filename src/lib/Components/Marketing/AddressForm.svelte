<script>
	import { validateAddressLine, validateSixDigitNo } from "$lib/js/marketing/utils";
	import InputField from "../common/InputField.svelte";
	import TextAreaField from "../common/TextAreaField.svelte";


    let t_address = "Address"

    let { addressLine = $bindable("") , district = $bindable(),city = $bindable() ,state = $bindable() ,pincode = $bindable()} = $props()

    const validations = $derived({
		addressLine : validateAddressLine(addressLine),
        pincode : validateSixDigitNo(pincode)
	});

    const formErrors = $derived({
		addressLine : validations.addressLine ? null : "Address must be at least 10 characters long.",
        pincode : validations.pincode ? null : "Enter 6 digit pincode"
	});

</script>


<main>
    <div id="address" class="border border-violet-500 rounded-lg px-2 py-8   relative">
        <p class="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 font-semibold text-violet-600 text-lg">{t_address}</p>
        <div class="grid grid-cols-2 gap-4">
            <div class=" col-span-2">
                <TextAreaField required={true} label={"Address Line"} bind:value={addressLine} errorMsg={formErrors.addressLine} />
            </div>
            <InputField label={"District (Optional)"} bind:value={district}/>
            <InputField label={"City (Optional)"} bind:value={city}/>
            <InputField required={true} label={"State"} bind:value={state}/>
            <InputField required={true} label={"Pincode"} type="number" bind:value={pincode} errorMsg={formErrors.pincode}/>
        </div>
    </div>
</main>