import {memo, useCallback, useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {setUserInput} from "../state/battle.actions";

const PlayerInput = memo(({id, label}) => {
    console.log('render player input');

    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');

    const onUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const onPlayerUserNameSubmit = (e) => {
        e.preventDefault();
        dispatch(setUserInput({id, userName, avatarUrl: `https://github.com/${userName}.png?size=200`}));
    };

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
                   onChange={onUserNameChange}/>

        <Button type='submit' disabled={!userName.length}>Submit</Button>

    </Stack>
});

export default PlayerInput;