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
    // Minimum 8 characters
    const hasMinLength = password.length >= 8;
    
    // At least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(password);
    
    // At least one lowercase letter
    const hasLowerCase = /[a-z]/.test(password);
    
    // At least one number
    const hasNumber = /\d/.test(password);
    
    // At least one special character (symbol)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(password);
    
    // Check all conditions
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

export const validateAddress = (address) => {
    return (
        address.addressLine.trim() !== "" &&
        address.district.trim() !== "" &&
        address.city.trim() !== "" &&
        address.state.trim() !== "" &&
        address.pincode !== null &&
        String(address.pincode).trim() !== ""
    );
}


export const checkFields = (name,mobile,password,address) => {

    const areBasicFieldsFilled = name?.trim() && mobile?.toString().trim() && password?.trim();

    const isAddressValid = validateAddress(address)

    return !!(areBasicFieldsFilled && isAddressValid)

}