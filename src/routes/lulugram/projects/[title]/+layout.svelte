<script>
    import Navbar from '$lib/Components/lulugram/Navbar.svelte';
    import Footer from '$lib/Components/lulugram/Footer.svelte';

    let { children } = $props();

  
</script>


<main>
    <Navbar/>
    <div id="slot" class="">
        {@render children()}
    </div>
</main>