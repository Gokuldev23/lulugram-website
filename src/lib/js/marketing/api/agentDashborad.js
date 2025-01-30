import dataUrlRoot from "$lib/js/dataUrlRoot"



export const getReferralsDetails = async (a_token) => {

    let url = `${dataUrlRoot}/agents/referral/referred-users/sub-details`

    try {
		const res = await fetch(url, {
			method: 'GET',
            headers: {
                'Authorization': `Bearer ${a_token}`,
            }
		});
		const result = await res.json();
        return result
    }
    catch(err){
        console.log(err)
    }
}


export const getUsersCountForEachProduct = async (a_token) => {

    let url = `${dataUrlRoot}/agents/referral/num-users/each-product`

    try {
		const res = await fetch(url, {
			method: 'GET',
            headers: {
                'Authorization': `Bearer ${a_token}`,
            }
		});
		const result = await res.json();
        return result
    }
    catch(err){
        console.log(err)
    }
}