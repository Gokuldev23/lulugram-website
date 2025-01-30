<script>

    let t_agent_statistics = "Agent Statistics";
    let t_platform_statistics = "Platform Statistics";
    let t_referred_users = "Referred Users";    
    let t_joined_users = "Joined Users";
    let t_subscribed_users = "Subscribed Users";
    // Sample data for agent statistics
    let agentStats = {
        platforms: [
            { name: 'Gramlok', referred: 50, joined: 30, subscribed: 20 },
            { name: 'Pro Vocab Crossword', referred: 60, joined: 40, subscribed: 25 },
            { name: 'Vidyavart', referred: 70, joined: 50, subscribed: 30 }
        ]
    };
</script>

<main class="flex flex-col items-center p-5 md:p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl md:text-4xl mb-6 text-gray-900 font-extrabold">{t_agent_statistics}</h1>
    <div class="w-full max-w-3xl bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8">
        <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold">{t_platform_statistics}</h2>
        <hr class="my-6 border-gray-300" />
        {#each agentStats.platforms as platform}
            <div class="border-b border-gray-300 pb-6 mb-6">
                <h3 class="text-xl md:text-2xl mb-4 text-gray-700 font-semibold">{platform.name}</h3>
                <div class="mb-6">
                    <p class="mb-2 font-bold text-gray-800">{t_referred_users}</p>
                    <div class="relative bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div class="h-full bg-green-500" style="width: {(platform.referred / 100) * 100}%;"></div>
                        <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 font-bold">{platform.referred}</span>
                    </div>
                </div>
                <div class="mb-6">
                    <p class="mb-2 font-bold text-gray-800">{t_joined_users}</p>
                    <div class="relative bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div class="h-full bg-green-500" style="width: {(platform.joined / 100) * 100}%;"></div>
                        <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 font-bold">{platform.joined}</span>
                    </div>
                </div>
                <div class="mb-6">
                    <p class="mb-2 font-bold text-gray-800">{t_subscribed_users}</p>
                    <div class="relative bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div class="h-full bg-green-500" style="width: {(platform.subscribed / 100) * 100}%;"></div>
                        <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 font-bold">{platform.subscribed}</span>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    /* Add hover effects for better interactivity */
    .border-b:hover {
        background-color: #f9f9f9;
        transition: background-color 0.3s ease;
    }
</style>
