import dataUrlRoot from "$lib/js/dataUrlRoot";

export const bankVerify = async (a_token, accountHolderName, accountNumber, ifscCode, branchName, bankName, otp, otpToken) => {

    let url = `${dataUrlRoot}/agents/profile/bank-details`

    let data = {
        accountHolderName:accountHolderName,
        accountNumber:accountNumber,  
        ifscCode:ifscCode,  
        branchName:branchName,  
        bankName:bankName,
        otp,
        otpToken
    }

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
        return result
    } catch (error) {
        console.log(error)
        return {success:false,message:'Network Error!'}; 
    }
}


export const getBankDetails = async (a_token) => {
    let url = `${dataUrlRoot}/agents/profile/bank-details` 
    try {
        const response = await fetch(url, {
            method:"GET",
            headers: {
                'Authorization': `Bearer ${a_token}`,
            },
        });
        const res = await response.json()
        // console.log("Bank Data", res)
        return res
    } 
    catch(e) {
        console.log("Error: ", e)
        return {
            success: false,
            message: e.message
        }
    }
}            


export const otpVerifyBankDetails = async (a_token) => {

    let url = `${dataUrlRoot}/agents/profile/obtain-otp`

    try {
        let response = await fetch(url,{
            method:'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${a_token}`,
                'Content-Type': 'application/json', // Set the content type
            },    
        })
        let result = await response.json()
        if(result.success) {
            // console.log(result)
            return result
        }
        return result
    } catch (error) {
        console.log(error)
        return {success:false,message:'error fetching'}; 
    }   
}