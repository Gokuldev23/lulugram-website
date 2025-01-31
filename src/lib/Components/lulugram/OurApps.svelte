<script>
	import { projects } from "$lib/js/lulugram/projects";
	import Project from "./Project.svelte";


</script>


<main class="p-4">
    <div class=" border-2 border-blue-500 md:p-4 p-2 mt-10 md:max-w-6xl max-w-lg mx-auto rounded-3xl relative pt-10">
        <h2 class="text-3xl text-center left-1/2 -translate-x-1/2 absolute -top-5 uppercase font-semibold text-blue-600 bg-white ">Our Apps</h2>
        <div id="project-container" class="grid md:grid-cols-3 items-center max-h-[80vh] gap-2 md:gap-3 lg:gap-6 overflow-scroll">
           {#each projects as project}
                <Project project = {project}/>
           {/each}
        </div>
    </div>
</main>

<style>
    #project-container{
        scrollbar-width: none;
    }
</style>