<script>
	import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";
    
	import Modal from "./Modal.svelte";



    let { title = "Alert",message,alertBgColor = "white" ,msgTextColor = "black",handleOnOk} = $props()


    let t_ok = 'OK'


</script>


<Modal on:click>
    <div class="alert" style="background-color: {alertBgColor};">
        <div class="title">
            <Icon icon="ant-design:alert-twotone" width="24"/>
            <p> {title} </p>
        </div>
        <p class="msg" style="color: {msgTextColor};">{message}</p>
        <button onclick={handleOnOk}>{t_ok}</button>
    </div>
</Modal>


<style>
    .alert{
        padding: 10px 16px;
        border-radius: 10px;
        max-width: 400px;
        width: 300px;
        box-sizing: border-box;
    }
    .alert .msg{
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        margin: 10px 10px;
        margin-bottom: 28px;

    }
    .alert .title{
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-weight: 700;
        font-size: 18px;

    }
    .title p{
        margin: 0;
    }
    button{
        background-color: rgba(128, 128, 128, 0.301);
        border-radius: 10px;
        padding: 6px 32px;
        display: block;
        margin-left: auto;
        font-size: 12px;
    }
    @media (min-width:576px){
        .alert{
            max-width: 600px;
            width: 400px;
        }
        .alert .msg{
            font-size: 18px;
        }
        .alert .title{
            font-size: 20px;
        }
        button{
            font-size: 16px;
        }
    }
</style>
