<script>
    // Function to handle logout
    function logout() {
        // Perform logout actions, such as clearing session data, redirecting to login page, etc.
        console.log("User logged out");
        // Example: Redirect to login page
        window.location.href = "/login";
    }
</script>

<main class="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8 text-center">
        <h1 class="text-3xl md:text-4xl mb-6 text-gray-900 font-extrabold">Logout</h1>
        <p class="text-gray-700 mb-6">Are you sure you want to log out?</p>
        <button
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
            on:click={logout}
        >
            Logout
        </button>
    </div>
</main>

<style>
    /* Ensure the component is responsive */
    @media (max-width: 640px) {
        .payment-box p {
            font-size: 14px;
        }
    }
</style>
