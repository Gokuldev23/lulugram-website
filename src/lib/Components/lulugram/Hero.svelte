<script>
    import Icon from "@iconify/svelte";
    
	import { projects } from "$lib/js/lulugram/projects";

	import Project from "./Project.svelte";
	import Modal from "../common/Modal.svelte";


    const handleProjectExpand = (e) => {
        console.log(e);
    }

</script>

<section class="p-4">
    <h1 class="md:text-5xl/[68px] text-2xl  md:mt-16 mt-6 text-slate-600  md:px-6 rounded-full 
               w-fit mx-auto text-center font-[Montserrat] font-bold">
        Welcome to <span class="text-blue-600">  Lulugram Technologies </span> Private Limited
    </h1>

    <div class="relative">
        <h1 class="md:text-3xl text-lg font-bold text-center relative px-2 text-slate-600 md:my-10 my-5 bg-white w-fit mx-auto"> 
            Where <span class="text-orange-600"> Creativity </span> Meets <span class="text-blue-600">  Technology </span>. 
        </h1>
        <hr class="h-1 border-2 absolute w-1/2 left-1/2 -translate-x-1/2 top-4 -z-10 border-blue-600">
    </div>

    <div>
        <h1 class="text-center md:text-2xl text-sm font-semibold md:my-10 my-4  w-fit mx-auto"> 
            <span class="text-blue-600"> Connects </span> 
            <span class="text-orange-600 text-left "> Software , Services, Social </span>
         </h1>
    </div>

    <p class="text-justify max-w-6xl mx-auto text-sm md:text-base">
        At Lulugram, we are dedicated to Innovations. With a passion for Software field, we strive to Modernization. Since our founding in 2022,
        we have been committed to delivering excellent service that exceeds expectations and adds value to our clients' lives.Customer satisfaction
        is at the heart of everything we do. We work closely with our clients to understand their needs. Thank you for considering Lulugram as your 
        growing partner. We look forward to the opportunity to collaborate with you and create a brighter future together.
    </p>

    <div class=" border-2 border-blue-500 md:p-4 p-2 mt-10 md:max-w-6xl max-w-lg mx-auto rounded-3xl relative pt-10">
        <h2 class="text-3xl text-center left-1/2 -translate-x-1/2 absolute -top-5 uppercase font-semibold text-blue-600 bg-white ">Our Apps</h2>
        <div id="project-container" class="flex flex-nowrap items-center gap-2 md:gap-6 overflow-scroll">
           {#each projects as project}
                <Project onProjectClicked={handleProjectExpand} project = {project}/>
           {/each}
        </div>
    </div>

</section>


<style>
    #project-container{
        scrollbar-width: none;
    }
</style>