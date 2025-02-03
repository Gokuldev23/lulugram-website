<script>
	import InputField from "../common/InputField.svelte";


    let t_address = "Address"

    let { district = $bindable(),city = $bindable() ,state = $bindable() ,pincode = $bindable()} = $props()

</script>


<main>
    <div id="address" class="border border-violet-500 rounded-lg px-2 py-8   relative">
        <p class="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 font-semibold text-violet-600 text-lg">{t_address}</p>
        <div class="grid grid-cols-2 gap-5">
            <InputField required={true} label={"district"} bind:value={district}/>
            <InputField required={true} label={"city"} bind:value={city}/>
            <InputField required={true} label={"state"} bind:value={state}/>
            <InputField required={true} label={"pincode"} type="number" bind:value={pincode}/>
        </div>
    </div>
</main>