<script>
	import Icon from "@iconify/svelte";

    
</script>



<header class="bg-blur w-full shadow-lg sticky flex items-center justify-between top-0 z-50 py-4 px-4">

    <a href="/" class="flex gap-x-2 items-center w-fit">
        <img class="w-10 rounded-full" src="/lulugramLogo.png" alt="">
        <p class="text-blue-600 font-semibold md:text-xl">Lulugram</p>
    </a>

    <menu class="px-4">
        <li>
            <a class="bg-black text-white font-semibold flex gap-2 items-center px-4 py-1 rounded-full" href="/marketing">
                <Icon icon="nimbus:marketing" width="16" height="16" />
                Marketing
            </a>
        </li>
    </menu>
</header>


<style>
    .bg-blur {
        background: transparent;
        backdrop-filter: blur(50px);
    }

</style>