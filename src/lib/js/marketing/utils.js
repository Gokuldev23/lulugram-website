export const validateEmail = (email) => {
    if(!email.trim()){
        return true
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


export const validateName = (name) => {
    if(!name.trim()){
        return true
    }
    return name.trim().length>3
}


export const validatePassword = (password) => {
    if(!password.trim()){
        return true
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
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