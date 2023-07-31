import {memo, useState} from "react";
import {validateField} from "../utils";
import {validateName} from "../validation";
import {TextField} from "@mui/material";

const FirstAndLastNameInputs = ({onChange}) => {
    const [error, setError] = useState({firstName: [], lastName: []});
    const onFirstNameChange = validateField(validateName, onChange, setError);
    const onLastNameChange = validateField(validateName, onChange, setError);

    return <>
        <TextField id="firstName" label="First Name" variant="standard"
                   required
                   name="firstName"
                   error={error.firstName.length > 0}
                   helperText={error.firstName}
                   onChange={onFirstNameChange}>
        </TextField>

        <TextField id="lastName" label="Last Name" variant="standard"
                   required
                   name="lastName"
                   error={error.lastName.length > 0}
                   helperText={error.lastName}
                   onChange={onLastNameChange}>
        </TextField>
    </>
};

export default memo(FirstAndLastNameInputs);