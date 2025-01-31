<script>
	import MarketingNavbar from '$lib/Components/marketing/MarketingNavbar.svelte';


    let { children } = $props()
</script>


<main>
    <MarketingNavbar/>
    <div class="">
        {@render children()}
    </div>
</main>