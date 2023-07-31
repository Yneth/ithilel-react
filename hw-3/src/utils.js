import {Fragment} from "react";

export const log = (Component) => {
    return (props) => {
        console.log(`render component: ${Component.name}`);
        return <Component {...props}/>;
    };
}

export const allValid = (state) => {
    return Object.values(state)
        .map(field => field && field.isValid)
        .reduce((acc, v) => acc && v, true);
}

export const getObject = (state) => {
    return Object.entries(state)
        .filter(([key, field]) => !!field)
        .map(([key, field]) => [key, field.value])
        .reduce((acc, [key, field]) => ({...acc, [key]: field}), {});
}

export const validateField = (doValidate, onChange, setErrors) => {
    return (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const errors = doValidate(value);
        const isValid = errors.length === 0;

        const state = {[name]: {value, isValid}};
        onChange(state)

        const errorElements = errors.map((e, i) => <Fragment key={i}> {e.message} <br></br> </Fragment>);
        setErrors(prevState => ({...prevState, [name]: errorElements}));
    }
}