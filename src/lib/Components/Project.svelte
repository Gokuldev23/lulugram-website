<script>
    import Icon from "@iconify/svelte";
    
    let { project } = $props();
</script>


<div class="border-2 border-slate-300 rounded-xl w-full max-w-xl p-4">
    <img class="md:size-32 size-16 rounded-full mx-auto " src={project.logo} alt="">
    <p class="text-center text-xl font-semibold mb-6">{project.name}</p>
    <div class="border rounded-xl p-2">
        <p class="text-center underline underline-offset-2  mb-4">{project.devStage}</p>
        <div class="text-center  flex items-center flex-wrap  justify-center md:gap-10 gap-4">
            {#if project.link.web}
                <a href={project.link.web}  class="text-center text-sm md:text-base text-blue-400">
                    <Icon class="mx-auto mb-2" icon="streamline:web-solid"  />
                    <span class="text-slate-600">Web</span>
                </a>
            {/if}
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
</div>