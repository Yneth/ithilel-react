import {memo} from "react";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const CreatePostButton = memo(({onClick}) => {
    return <Button variant="outlined" fullWidth={true} color={'success'} onClick={onClick}><AddIcon/></Button>
});

export default CreatePostButton;