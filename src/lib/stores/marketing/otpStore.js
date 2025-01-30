import { writable } from "svelte/store";

export const otpStore = writable({
    userUid:'',
    otp:'',
    otpToken:'',
    otpTokenPrev:'',
})