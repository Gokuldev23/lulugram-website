import dataUrlRoot from "$lib/js/dataUrlRoot"
import { otpStore } from "$lib/stores/marketing/otpStore"


export const userTempRegister = async (userName,password,mobileNumber,address, isTcAgreed) => {

    let url = `${dataUrlRoot}/agent/auth/temp-register`

    let data = {
        userName,
        userId:mobileNumber,
        address,
        password,
        isTcAgreed
    }

    try {
        let response = await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type
            },    
            body:JSON.stringify(data)
        })
        let result = await response.json()
        if(result.success){
            let otpToken = result.otpToken
            let userUid = result.data.user_uid 
            let userId = result.data.user_id
            let idType = result.data.user_id_type

            otpStore.set({
                userUid,
                userId,
                idType,
                otp:'',
                otpToken,
            })
        }
        return result
    } catch (error) {
        console.log(error)
        return {success:false,message:'error fetching'}; 
    }

}


export const userRegisterVerify = async (otp,otpToken,otpTokenPrev,agentUid) => {

    let url = `${dataUrlRoot}/users/auth/register`

    let data = {
        agentUid,
        otp,
        otpToken,
        otpTokenPrev
    }

    try {
        let response = await fetch(url,{
            method:'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Set the content type
            },    
            body:JSON.stringify(data)
        })
        let result = await response.json()
     
        return result
    } catch (error) {
        console.log(error)
        return {success:false,message:'error fetching'}; 
    }   
}

export const userLogin = async (agentId, password, countryCode, countryName) => {
    let url = `${dataUrlRoot}/users/auth/login`

    let data = {
        agentId,
        password,
        countryCode,
        countryName
    }

    try {
        let response = await fetch(url,{
            method:'POST',
            mode: 'cors',
            credentials: 'include',
          
            headers: {
                'Content-Type': 'application/json', // Set the content type
            },    
            body:JSON.stringify(data)
        })
        let result = await response.json()
        // return result
   
        return result
    } catch (error) {
        console.log(error)
        return {success:false,message:'Network Error!'}; 
    }
}


export const forgotpassword = async () => {

}


export const changeForgotPassword = async () => {

}

export const resendOtp = async () => {

}