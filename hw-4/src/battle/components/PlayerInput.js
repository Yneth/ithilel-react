import {memo, useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";

const PlayerInput = memo(({id, label, onSubmit}) => {
    console.log('render player input');
    const [userName, setUserName] = useState('');

    const onUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const onPlayerUserNameSubmit = (e) => {
        e.preventDefault();
        onSubmit(id, userName);
    }

    return <Stack component={'form'} spacing={2} onSubmit={onPlayerUserNameSubmit}
                  justifyContent={'space-around'}
                  sx={{flex: 1}}>

        <Typography>
            Choose <span style={{fontWeight: 'bold'}}>{label}</span> username:
        </Typography>

        <TextField id="standard-basic" label={label} variant="standard"
                   type="text"
                   name="userName"
                   placeholder="Github Username"
                   autoComplete="off"
                   value={userName}
                   onChange={onUserNameChange}/>

        <Button type='submit' disabled={!userName.length}>Submit</Button>

    </Stack>
});

export default PlayerInput;