import {memo, useState} from "react";
import {validateField} from "../utils";
import {validateEmail, validatePassword} from "../validation";
import {TextField} from "@mui/material";

const EmailAndPasswordInputs = ({onChange}) => {
    const [error, setError] = useState({password: [], email: []});
    const onPasswordChange = validateField(validatePassword, onChange, setError)
    const onEmailChange = validateField(validateEmail, onChange, setError)

    return <>
        <TextField id="email" label="Email" variant="standard"
                   required
                   name="email"
                   onChange={onEmailChange}
                   error={error.email.length > 0}
                   helperText={error.email}
                   autoFocus>
        </TextField>

        <TextField id="pasword" label="Password" variant="standard"
                   required
                   name="password"
                   error={error.password.length > 0}
                   helperText={error.password}
                   onChange={onPasswordChange}>
        </TextField>
    </>
};

export default memo(EmailAndPasswordInputs);