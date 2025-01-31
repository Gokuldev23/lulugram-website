import dataUrlRoot from '$lib/js/dataUrlRoot';
import { agentStore } from '$lib/stores/marketing/agentStore';
import { otpStore } from '$lib/stores/marketing/otpStore';

export const getAgentStatus = async () => {
	try {
		const res = await fetch(`${dataUrlRoot}/agents/auth/agent-status`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		});
		const result = await res.json();

		if(result.success){

			let agentData = result.data
	
			let data = {
				signedIn:true,
				a_token:result.a_token,
				agentUid: agentData.agent_uid,
				agentId: agentData.agent_id,
				agentName: agentData.agentname,
				email: agentData.email,
				phone: agentData.phone_number,
				address: agentData.address,
				referralCode: agentData.agent_referal_code,
				referralCount: agentData.referral_count,
				createdAt: agentData.created_at,
				countryCode: agentData.country_code,
				countryName: agentData.country_name,
				emailVerified: agentData.email_verified,
				bankVerified: agentData.bank_verified,
				aadharVerified: agentData.adhar_verified,
				profilePic: agentData.profile_pic_url,
				profileImageSizes: agentData.profile_image_sizes,
				expiresIn: result.expiresIn
			}
			 
			agentStore.set({...data})
		}else{
			agentStore.set({ signedIn: false, agentUid: '', agentId: '', agentName: '', token: '' });
		}

		return result;
	} catch (e) {
		agentStore.set({ signedIn: false, agentUid: '', agentId: '', agentName: '', token: '' });
		console.log(e);
	}
};

export const agentTempRegister = async (agentName,password,mobileNumber,countryCode,address,isTcAgreed) => {

	let url = `${dataUrlRoot}/agents/auth/temp-register`;

	let data = {
		agentName,
		agentId: mobileNumber,
		countryCode,
		address,
		password,
		isTcAgreed
	};

	try {
		let response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json' // Set the content type
			},
			body: JSON.stringify(data)
		});
		let result = await response.json();
		if (result.success) {
			let otpToken = result.otpToken;
			let agentUid = result.data.agent_uid;
			let agentId = result.data.agent_id;

			otpStore.set({
				agentUid,
				agentId,
				otp: '',
				otpToken
			});
		}
		return result;
	} catch (error) {
		console.log(error);
		return { success: false, message: 'error fetching' };
	}
};

export const agentRegisterVerify = async (otp, otpToken, otpTokenPrev, agentUid) => {
	let url = `${dataUrlRoot}/agents/auth/register`;

	let data = {
		agentUid,
		otp,
		otpToken,
		otpTokenPrev
	};

	try {
		let response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		let result = await response.json();

		if (result.success) {
			let agentData = result.data;
			agentStore.set({ ...agentData });
		}
		return result;
	} catch (error) {
		console.log(error);
		return { success: false, message: 'error fetching' };
	}
};

export const agentLogin = async (agentId, password, countryCode) => {
	let url = `${dataUrlRoot}/agents/auth/login`;

	let data = {
		agentId,
		password,
		countryCode
	};

	try {
		let response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',

			headers: {
				'Content-Type': 'application/json' // Set the content type
			},
			body: JSON.stringify(data)
		});
		let result = await response.json();

		if (result.success) {
			let agentData = result.data;
			agentStore.set({ signedIn:true,...agentData });
		}

		return result;
	} catch (error) {
		console.log(error);
		return { success: false, message: 'Network Error!' };
	}
};

export const changePassword = async (currentPassword,newPassword,a_token) => {

    let url = `${dataUrlRoot}/agents/auth/change-password`

    let data = {
        currentPassword,
        newPassword,
        confirmNewPassword:newPassword
    }

    try {
        const res = await fetch(url, {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${a_token}`,
                'Content-Type': 'application/json', // Set the content type
            },
            body:JSON.stringify(data)
        });

        const response = await res.json();
        return response;
    } catch (error) {
        console.error(`Error fetching crossword: ${error.message}`);
        return {success:false,message:'error fetching'}; 
    }
}

export const forgotpassword = async (agentId, countryCode) => {
	let url = `${dataUrlRoot}/agents/auth/forgot-password`;

	let data = {
		agentId,
		countryCode
	};
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json' // Set the content type
			},
			body: JSON.stringify(data)
		});

		const result = await res.json();
		if (result.success) {
			let otpToken = result.otpToken;
			let agentUid = result.agentUid;
			let agentId = result.agentId;

			otpStore.set({
				agentUid,
				agentId,
				otp: '',
				otpToken
			});
		}
		return result;
	} catch (error) {
		console.error(`Error fetching crossword: ${error.message}`);
		return { success: false, message: 'error fetching' };
	}
};


export const changeForgotPassword = async (agentUid, password, otp, otpToken, otpTokenPrev) => {
	let url = `${dataUrlRoot}/agents/auth/change-forgot-password`;

	let data = {
		agentUid,
		password,
		confirmPassword: password,
		otp,
		otpToken,
		otpTokenPrev
	};

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json' // Set the content type
			},
			body: JSON.stringify(data)
		});

		const response = await res.json();
		return response;
	} catch (error) {
		console.error(`Error fetching crossword: ${error.message}`);
		return { success: false, message: 'error fetching' };
	}
};

export const resendOtp = async (agentId, agentUid, count) => {
	let url = `${dataUrlRoot}/agents/auth/resend-otp`;

	let data = {
		agentId,
		agentUid,
		count
	};

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json' // Set the content type
			},
			body: JSON.stringify(data)
		});

		const response = await res.json();
		return response;
	} catch (error) {
		console.error(`Error fetching crossword: ${error.message}`);
		return { success: false, message: 'error fetching' };
	}
};

export const logoutAgent = async () => {
	let url = `${dataUrlRoot}/agents/auth/logout`;

	try {
		const res = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors'
		});

		const response = await res.json();
		return response;
	} catch (error) {
		console.error(`Error fetching crossword: ${error.message}`);
		return { success: false, message: 'error fetching' };
	}
};

export const deleteAccountVerify = async (a_token) => {
	let url = `${dataUrlRoot}/agents/account/send-otp`;

	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${a_token}`
			}
		});

		const response = await res.json();
		return response;
	} catch (error) {
		console.error(`Error fetching crossword: ${error.message}`);
		return { success: false, message: 'error fetching' };
	}
};

export const confirmDeleteAccount = async (a_token, data) => {
	let url = `${dataUrlRoot}/agents/account/delete`;

	try {
		const res = await fetch(url, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${a_token}`,
				'Content-Type': 'application/json' // Ensure the server understands you're sending JSON
			},
			body: JSON.stringify(data)
		});

		const response = await res.json();
		return response;
	} catch (error) {
		console.error(`Error fetching crossword: ${error.message}`);
		return { success: false, message: 'error fetching' };
	}
};


export const editNameAddress = async (a_token, data) => {
	let url = `${dataUrlRoot}/agents/profile/details`;

	try {
		const res = await fetch(url, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${a_token}`,
				'Content-Type': 'application/json' // Ensure the server understands you're sending JSON
			},
			body: JSON.stringify(data)
		});

		const response = await res.json();
		if (response.success) {
			// Transform the response data to match the expected structure
			const transformedData = {
				...response.data,
				agentName: response.data.agentname, // Rename agentname to agentName
			};
			delete transformedData.agentname; // Remove the old key

			agentStore.update((store) => {
				return { ...store, ...transformedData };
			});
		}
		// console.log("response", response);
		return response;
	} catch (error) {
		console.error(`Error fetching details: ${error.message}`);
		return { success: false, message: 'error fetching' };
	}
};
