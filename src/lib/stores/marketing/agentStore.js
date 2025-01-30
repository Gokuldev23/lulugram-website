import { writable } from "svelte/store";

export let agentStore = writable({
    signedIn:false,
    a_token:'',
    agentId:'',
    agentUid:'',
    agentName:'',
    email:'',
    agentPhone:'',
    agentNumber:'',
    isEmailVerified:false,
    isBankVerified:false,
})