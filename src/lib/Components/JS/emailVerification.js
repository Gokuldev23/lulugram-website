import dataUrlRoot from "./dataUrlRoot";

export const emailVerify = async (a_token, email) => {

    let url = `${dataUrlRoot}/agents/profile/verify-email`

    let data = {
        email:email
    }

    console.log(data)

    try {
        let response = await fetch(url,{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${a_token}`,
                'Content-Type': 'application/json', // Set the content type
            },    
            body:JSON.stringify(data)
        })
        let result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return {success:false,message:'Network Error!'}; 
    }
}


export const otpVerifyEmail = async (a_token, email, otp, otpToken) => {

    let url = `${dataUrlRoot}/agents/profile/confirm-email`

    let data = {
        email,
        otp,
        otpToken
    }

    try {
        let response = await fetch(url,{
            method:'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${a_token}`,
                'Content-Type': 'application/json', // Set the content type
            },    
            body:JSON.stringify(data)
        })
        let result = await response.json()
        if(result.success) {
            console.log(result)
        }
        return result
    } catch (error) {
        console.log(error)
        return {success:false,message:'error fetching'}; 
    }   
}