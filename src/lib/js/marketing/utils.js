export const validateEmail = (email) => {
    if(!email.trim()){
        return true
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


export const validateName = (name) => {
    if(!name){
        return true
    }
    
    return name.trim().length>2 && /^[A-Za-z]{2}/.test(name)
}


export function validatePassword(password) {
    if(password == ''){
        return true
    }
    const hasMinLength = password.length >= 8;
    
    const hasUpperCase = /[A-Z]/.test(password);
    
    const hasLowerCase = /[a-z]/.test(password);
    
    const hasNumber = /\d/.test(password);
    
    const hasSpecialChar = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(password);
    
    const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    
    return isValid
}


export const validateMobileNumber = (mobile) => {
    if(mobile == null){
        return true
    }
    const regex = /^[1-9]\d{9}$/;
    return regex.test(mobile);
}

export const validateOTP = (otp) => {
    if(otp == null){
        return true
    }
    const regex = /^\d{6}$/;
    return regex.test(otp);
}

export const validateAddressLine = (addressLine) => {
    if(!addressLine.trim()){
        return true
    }
    return addressLine.trim().length > 10
}

export const validateSixDigitNo = (value) => {
    if(value == null){
        return true
    }
    const regex = /^\d{6}$/;
    return regex.test(value);
}

export const validateAddress = (address) => {
    return (
        validateAddressLine(address.addressLine) &&
        address.state.trim() !== "" && validateSixDigitNo(address.pinCode)
    );
}
