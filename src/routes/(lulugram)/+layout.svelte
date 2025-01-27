<script>
	import Navbar from '$lib/Components/lulugram/Navbar.svelte';

	
	let { children } = $props();
</script>


<main class="">
    <Navbar/>
	{@render children()}
</main>

