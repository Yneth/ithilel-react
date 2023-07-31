import * as EmailValidator from "email-validator";

export const validateEmail = (email) => {
    const errors = [];
    if (!EmailValidator.validate(email)) {
        errors.push({message: 'Should be a valiad email address'});
    }
    return errors;
}

export const validatePassword = (password) => {
    const errors = [];
    if (!password || password.length < 6 || password.length > 10) {
        errors.push({message: 'Password length should be of length [6, 10]'});
    }
    if (!/[A-Z]/.test(password)) {
        errors.push({message: 'Password should contain at least one uppercase letter'});
    }
    if (!/\d/.test(password)) {
        errors.push({message: 'Password should contain at least one digit'});
    }
    return errors;
}
export const validateName = (name) => {
    const errors = [];
    if (name.length < 2) {
        errors.push({message: 'Name should contain at least 2 characters'});
    }
    if (/\d/.test(name)) {
        errors.push({message: 'Name should not contain numbers'});
    }
    return errors;
}