<script>
	import Icon from "@iconify/svelte";


    let props = $props()

    let { title = "Title" ,txtColor = "#334155" , hideBackBtn = false , onBack = () => history.back() } = $derived(props)


</script>


<div class="relative" style="color: {txtColor};">
    {#if !hideBackBtn}
        <button type="button"  onclick={onBack} class="absolute left-0 top-1 {props.class}">
            <Icon icon="eva:arrow-back-outline" width="24" height="24" />
        </button>
    {/if}
     <h1 class="text-center md:text-3xl text-2xl  uppercase  font-bold mb-6 {props.class}">{title}</h1>
</div>