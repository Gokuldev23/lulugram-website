<script>
    import Icon from "@iconify/svelte";
    
    let { project, onProjectClicked } = $props();

</script>


<div class="border-2 border-slate-300 text-center rounded-xl w-full flex-1 min-w-64 max-w-xl p-4">
    <p class=" md:text-xl text-lg text-slate-800 font-bold md:mb-6 mb-3">{project.title}</p>
    <img class="md:size-24 size-12 rounded-full mx-auto border border-black" src={project.logo} alt="">
    <p class="text-sm w-fit mx-auto my-3 px-3 rounded-xl bg-orange-600 text-white font-semibold">{project.type}</p>
    <p class="md:text-lg  text-blue-600 font-bold italic my-4">{project.tagLine}</p>
    <div class="flex items-center justify-center gap-2 text-green-600 font-medium">
        <a class="" href="/projects/{project.title}">View Project</a>
        <Icon class="" icon="akar-icons:arrow-right" />
    </div>
</div>