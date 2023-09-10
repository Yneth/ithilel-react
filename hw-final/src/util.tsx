import {Fragment, ReactNode} from "react";

export type FieldValidationState = "unchecked" | "valid" | ReactNode;
export type FormValidation = { [key: string]: FieldValidationState };

export function round(num?: number, decimalPlaces = 2) {
    if (!num) {
        return 0;
    }
    num = Math.round(Number(num + "e" + decimalPlaces));
    return Number(num + "e" + -decimalPlaces);
}

export function generateRandomId(): string {
    return String(Math.floor(Math.random() * 100000000));
}


export function areAllFieldsValid(allFieldErrors: FormValidation) {
    return Object.entries(allFieldErrors).reduce((acc, [_, v]) => {
        return acc && v === 'valid';
    }, true);
}

export function hasError(key: FieldValidationState) {
    return !(key === 'unchecked' || key === 'valid');
}

export function getError(value: FieldValidationState) {
    if (hasError(value)) {
        return value;
    }
    return null;
}

export function createFormValidation(defaultState: FormValidation, object: any): FormValidation {
    return Object.entries(defaultState).reduce((acc, [fieldName, fieldDefault]) => {
        let validationState = fieldDefault || 'unchecked';
        if (object[fieldName]) {
            validationState = 'valid';
        }
        return {...acc, [fieldName]: validationState};
    }, {});
}

export function formatErrors(fieldErrors: string[] | null): FieldValidationState {
    return fieldErrors && fieldErrors.length
        ? fieldErrors.map((msg, index) => <Fragment key={index}>
            <span style={{overflowWrap: 'break-word'}}>
                {msg}
            </span>
            <br/>
        </Fragment>)
        : 'valid';
}

export function validateField(
    validationFn: (x: any) => Promise<string[]>,
    setField: (x: any) => void,
    setError: (x: any) => void
) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setField((prevState: any) => ({...prevState, [name]: value}));

        validationFn(value).then(errors => {
            const errorElements = formatErrors(errors);
            setError((prevState: any) => ({...prevState, [name]: errorElements}));
        });
    }
}