<script>
	import MarketingNavbar from '$lib/Components/Marketing/MarketingNavbar.svelte';


    let { children } = $props()
</script>


<main>
    <MarketingNavbar/>
    <div class="">
        {@render children()}
    </div>
</main>