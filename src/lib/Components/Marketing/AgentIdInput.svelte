<script>
	import InputField from "../common/InputField.svelte";


    let { countryCode = $bindable() , mobile = $bindable() , mobileErr } = $props()

</script>


<div id="mobile-input" class="flex gap-1">
    <select bind:value={countryCode} class="rounded-l-lg" name="" id="">
        <option value={countryCode}>{countryCode}</option>
    </select>
    <InputField required={true} label={"Mobile No"} type={"number"} bind:value={mobile} errorMsg={mobileErr}/>
</div>