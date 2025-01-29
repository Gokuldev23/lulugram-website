<script>
	import Icon from "@iconify/svelte";
	import InputField from "../common/InputField.svelte";


    let { showPassword ,password = $bindable() , errPassword ,toggleSeekPassword = () => {}  } = $props()

</script>




<div id="password-input" class="relative pb-2">
    <InputField label={"Password"} required={true} type={ !showPassword ? "password" : "text"} bind:value={password} errorMsg={errPassword}/>
    <button type="button" onclick={toggleSeekPassword} class="absolute right-6 top-3 text-xl ">
        <Icon icon={ showPassword ? "flowbite:eye-outline" : "flowbite:eye-slash-outline"}/>
    </button>
</div>