import {Alert, Snackbar} from "@mui/material";
import {memo} from "react";

const ErrorAlert = memo(({error, onClose}) => {
    return <Snackbar
        open={!!error}
        autoHideDuration={4000}>
        <Alert onClose={onClose} severity="error" sx={{width: '100%'}}>
            {error}
        </Alert>
    </Snackbar>
});

export default ErrorAlert;