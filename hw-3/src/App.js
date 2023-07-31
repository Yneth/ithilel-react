import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Button, Container, Stack, Typography} from "@mui/material";
import {memo, useCallback, useState} from "react";
import {allValid, getObject} from "./utils";
import FirstAndLastNameInputs from "./components/FirstAndLastNameInputs";
import EmailAndPasswordInputs from "./components/EmailAndPasswordInputs";

const App = () => {
    console.log('App');

    const [userInfoForm, setUserInfoForm] = useState({
        firstName: {value: '', isValid: false},
        lastName: {value: '', isValid: false},
        email: {value: '', isValid: false},
        password: {value: '', isValid: false},
    });

    const onChange = useCallback(
        update => setUserInfoForm(prevState => ({...prevState, ...update})),
        []
    );
    const onSubmit = (e) => {
        e.preventDefault();
        alert(`Success!, your user info is ${JSON.stringify(getObject(userInfoForm))}`);
    };
    return (
        <Container>
            <Stack component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}>
                <Typography component="h1" variant="h5">
                    User Info setup
                </Typography>

                <EmailAndPasswordInputs onChange={onChange}/>

                <FirstAndLastNameInputs onChange={onChange}/>

                <Button variant="contained" type="submit" disabled={!allValid(userInfoForm)}>
                    Submit
                </Button>
            </Stack>
        </Container>
    );
};

export default memo(App);
