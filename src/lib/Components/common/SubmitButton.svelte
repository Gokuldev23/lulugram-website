<script>

    let { btnText = "Submit" ,disabled = false , type = "submit",onClick } = $props()

</script>


<button 
    onclick={onClick}
    type={type} disabled={disabled}
    class="px-4 block w-full py-2 bg-violet-500 disabled:bg-gray-500 disabled:opacity-35 text-white rounded hover:bg-blue-600"
    >
    {btnText}
</button>