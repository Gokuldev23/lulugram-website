<script>
    import Icon from "@iconify/svelte";

    let t_contactUs = "Contact us"
    // Define the contact information
    let contactInfo = {
        mobile: '+91 8848780904',
        email: 'admin@gramlok.in',
        address: 'Vanitha ITI Road, Kazhakuttom, Thiruvananthapuram, Kerala, 695582'
    };
    
</script>

<div class="bg-white p-6 md:p-8 rounded-lg shadow-lg mx-auto mt-4" style="max-width: 600px;">
    <h2 class="text-2xl md:text-3xl mb-6 text-gray-800 font-bold border-b border-gray-300 pb-2">{t_contactUs}</h2>
    <div class="space-y-4">
        <div class="flex items-center">
            <Icon icon="mdi:phone" class="w-6 h-6 text-gray-500 mr-4" />
            <span class="text-gray-800">{contactInfo.mobile}</span>
        </div>
        <div class="flex items-center">
            <Icon icon="mdi:email" class="w-6 h-6 text-gray-500 mr-4" />
            <span class="text-gray-800">{contactInfo.email}</span>
        </div>
        <div class="flex items-center">
            <Icon icon="mdi:map-marker" class="w-6 h-6 text-gray-500 mr-4" />
            <span class="text-gray-800">{contactInfo.address}</span>
        </div>
    </div>
</div>

<style>
    .space-y-4 > *:not(:last-child) {
        margin-bottom: 1rem;
    }
</style>
