<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</svelte:head>

<script>
	import '../app.css';
	
	let { children } = $props();
</script>


<main class="">
	<div id="slot" class="min-h-dvh">
		{@render children()}
	</div>
</main>


<style>
	main {
		font-family: 'Poppins', sans-serif;
	}
</style>