import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {memo} from "react";

const DeletePostModal = memo(({isOpen, onClose}) => {
    return <Dialog
        open={isOpen}
        onClose={() => onClose({agreed: false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {"Post deletion confirmation"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the post?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onClose({agreed: false})}>Disagree</Button>
            <Button onClick={() => onClose({agreed: true})} autoFocus>Agree</Button>
        </DialogActions>
    </Dialog>
});

export default DeletePostModal;