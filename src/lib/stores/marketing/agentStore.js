import { writable } from "svelte/store";

export let agentStore = writable({
    signedIn:false,
    a_token:"",
    agentUid: "",
    agentId: "",
    agentName: "",
    email: "",
    agentPhone: "",
    address: "",
    referralCode: "",
    referralCount: "",
    createdAt: "",
    countryCode: "",
    countryName: "",
    emailVerified: "",
    bankVerified: "",
    aadharVerified: "",
    profilePic: "",
    profileImageSizes: "",
    expiresIn: ""
})