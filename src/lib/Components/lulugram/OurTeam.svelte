<script>
	import { teamMembers } from "$lib/js/lulugram/team";

    
</script>

<main class="max-w-6xl mx-auto md:py-20 py-10 px-4 ">
    <h1 class="text-center text-4xl text-blue-600 uppercase font-semibold mb-10">Meet Our Team</h1>
    <div class="grid md:grid-cols-4 grid-cols-2 gap-8">
        {#each teamMembers as member}
            <div class="overflow-hidden">
                <img class="aspect-square object-cover object-top rounded-lg" src={member.image} alt="">
                <p class="text-center text-xl font-semibold my-2">{member.name}</p>
                <p class="text-center text-base text-slate-600">{member.role}</p>
            </div>
        {/each}
    </div>
</main>