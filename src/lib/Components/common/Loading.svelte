<script>
	import Icon from "@iconify/svelte";


    let { width , height , color = "black" } = $props()

</script>


<div class="w-fit m-1">
    <Icon color={color} icon="svg-spinners:ring-resize" width={width} height={height} />
</div>


