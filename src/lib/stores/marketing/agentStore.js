import { writable } from "svelte/store";

export let agentStore = writable({
    signedIn:true,
    a_token:"",
    agentUid: "",
    agentId: "",
    agentName: "",
    email: "",
    phone: "",
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