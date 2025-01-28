<script>
    import Loading from "./Loading.svelte";
	import Modal from "./Modal.svelte";
</script>


<main>
    <Modal overlayColor={'rgb(0,0,0,0.8)'}>
        <Loading color={'blue'} width={40} height={40}/>
    </Modal>
</main>