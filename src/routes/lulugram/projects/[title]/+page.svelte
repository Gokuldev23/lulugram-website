<script>
	import Icon from "@iconify/svelte";
	import { page } from "$app/stores";
    import { projects } from "$lib/js/lulugram/projects";

    let title = $derived($page.params.title)
    let project = $derived(projects.find(p => p.title === title))

</script>


<main class="max-w-6xl mx-auto md:py-20 py-10 px-4">
    <h1 class="text-center md:text-4xl text-3xl my-6 font-bold text-blue-600">{project.title}</h1>
    <img class="rounded-xl md:size-32 size-28 mx-auto my-4 mb-8 border border-slate-600 shadow-lg shadow-black" src="{project.logo}" alt="">
    <p class="text-center italic font-bold my-4 md:text-2xl text-lg text-orange-600">{project.tagLine}</p>
    <p class="md:text-base/8 text-sm/6 text-justify">{project.description}</p>
    <div class="border-2  border-blue-600 rounded-xl p-2 my-6">
        {#if project.devStage == 'Available'}
            <div class="">
                {#if project.link.web}
                    <div class="flex gap-2 items-center justify-center">
                        <Icon class="" icon="streamline:web-solid"  />
                        <div>
                            Web  <a href="{project.link.web}">Visit <span class="text-blue-500 font-semibold"> {project.link.web} </span> </a>
                        </div>
                    </div>
                    <p class="text-center my-6 mb-2">Or</p>
                {/if}
    
                <div class="flex w-fit mx-auto gap-4 items-center mb-4 bg-black text-white px-8 rounded-full">
                    <p class="text-center">Download From App store</p>
                    <Icon icon="line-md:download-loop"  />
                </div>
                <div class="flex items-center gap-10 justify-center ">
                    {#if project.link.android}
                        <a href={project.link.android} class="text-center text-sm md:text-base text-green-600">
                            <Icon class="mx-auto mb-2" icon="fa:android"  />
                            <span class="text-slate-700">Android</span>
                        </a>
                    {/if}
                    {#if project.link.ios}
                        <a href={project.link.ios} class="text-center text-sm md:text-base text-blue-600">
                            <Icon class="mx-auto mb-2" icon="fa-brands:app-store-ios"  />
                            <span class="text-slate-600">IOS</span>
                        </a>
                    {/if}
                </div>
            </div>
        {:else}
            <div class="">
                <p class="italic text-orange-500 text-center text-xl font-semibold">Under devlopment</p>
                <img class="w-24 mx-auto" src="/under-dev.svg" alt="">
            </div>
        {/if}
    </div>
</main>