<script>

    let t_welcome_msg = "Welcome to our Marketing Onboarding";
    let t_get_ready = "Get ready to start your marketing journey with us";
    let t_get_started = "Get Started";

</script>


<main class="h-screen bg-gray-100 px-4">
    <div class=" h-[80vh] text-center flex  flex-col items-center justify-center max-w-lg mx-auto">
        <h1 class="md:text-4xl text-2xl text-violet-600 font-bold mb-2">{t_welcome_msg}</h1>
        <img src="/marketing/landing.svg" alt="Marketing Onboarding" class="w-64 my-6">
        <p class="md:text-lg text-sm text-gray-600 mb-4 md:max-w-full max-w-xs mx-auto">{t_get_ready}</p>
        <a href="/marketing/auth/login" class="px-4  w-full py-2 bg-violet-500 text-white rounded hover:bg-blue-600">{t_get_started}</a>
    </div>
</main>
