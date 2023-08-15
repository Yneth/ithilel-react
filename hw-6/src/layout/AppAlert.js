import {Alert, Snackbar} from "@mui/material";
import {memo} from "react";

const AppAlert = memo(({isOpen, message}) => {
    return <Snackbar
        open={isOpen}
        autoHideDuration={6000}>
        <Alert severity="error" sx={{width: '100%'}}>
            {message}
        </Alert>
    </Snackbar>
});

export default AppAlert;