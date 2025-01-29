<script>

    let t_agree_to = "I agree to the"

    let { checked = $bindable(false), t_condition = "Conditions" , link = "#" } = $props()

</script>


<div id="checkbox-input" class="my-4">
    <input bind:checked={checked} type="checkbox" name="tc" id="tc">
    <label for="tc"> {t_agree_to} <a class="text-violet-500 font-medium" href={link}>{t_condition}</a> </label>
</div>