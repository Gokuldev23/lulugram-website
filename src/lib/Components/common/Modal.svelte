<script>
	import { fly } from "svelte/transition";

    let {overlayColor = "rgba(0, 0, 0, 0.5);" , children} = $props()

</script>


<div style="background-color: {overlayColor}" modalOpen="true" transition:fly class="overlay"  role="button" tabindex="0">
    <div class="dialog">
        {@render children()}
    </div>
</div>

<style>
    .overlay{
        display: flex;
        /* align-items: center;  */
        justify-content: center;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        scrollbar-width: none; /* for fire-fox */
        -ms-overflow-style: none; /* for Internet Explorer, Edge */
        z-index: 250;
    }
    :global(body:has(.overlay)){
       overflow-y: hidden;
    }
    .dialog{
        margin-top: 100px;
    }


</style>