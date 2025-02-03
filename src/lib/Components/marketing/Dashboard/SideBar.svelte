<script>
    import { activePage, sideBarOpen } from "$lib/stores/marketing/utilStore";

	import Modal from "$lib/Components/common/Modal.svelte";



    let setActivePage = (page) => {
        activePage.set(page)
        closeSideBar()
    }

    let closeSideBar = () => sideBarOpen.set(false)
</script>



{#if $sideBarOpen}
    <div on:click={closeSideBar} role="button" tabindex="0" on:keydown class="bg-black/20 block md:hidden  h-screen absolute right-0 top-14 w-full">
        <ul class="p-5 space-y-5 bg-white  shadow-lg shadow-black">
            <li><button on:click={()=>setActivePage('home')}>Home</button></li>
            <li><button on:click={()=>setActivePage('verification')}>Verification</button></li>
            <li><button on:click={()=>setActivePage('profile')}>Profile</button></li>
        </ul>
    </div>
{/if}