import { writable } from "svelte/store";

export let agentStore = writable({
    a_token:'',
    agentId:'',
    agentUid:'',
    agentName:'',
    agentEmail:'',
    agentPhone:'',
    agentNumber:'',
    emailVerified:false,
    isBankVerified:false,
})