import React, {ChangeEvent, FC, useCallback, useState} from "react";
import {betActions} from "../../store/bets/bets.slice";
import {useAppDispatch, useAppSelector} from "../../store/root.store";
import {Button, CardActions, InputLabel, NativeSelect, Paper, TextField, Typography} from "@mui/material";
import {selectEvent} from "../../store/events/events.slice";
import CardContent from "@mui/material/CardContent";
import {round} from "../../util";
import {MOCK_USER_ID, MOCK_USER_NAME} from "../../consts";

function calcEarnings(betAmount: number, odds?: number): number {
    if (!odds) {
        return 0;
    }
    const earnings = (odds * betAmount) + betAmount;
    return round(earnings, 2);
}

const MakeBetForm: FC<{
    eventId: string,
}> = ({eventId}) => {
    const event = useAppSelector(selectEvent(eventId));
    const dispatch = useAppDispatch();

    const [betAmount, setBetAmount] = useState(0);
    const [selectedOutcomeIndex, setSelectedOutcomeIndex] = useState(0);
    const selectedOutcome = (event?.outcomes?.length || 0) > selectedOutcomeIndex
        ? event.outcomes[selectedOutcomeIndex]
        : null;

    const onOutcomeSelected = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOutcomeIndex(Number(event.target.value));
    }, []);

    const onMakeBet = useCallback(() => {
        dispatch(betActions.createBetRequest({
            id: Math.random().toString(12).slice(2),
            eventId: event.id,
            eventName: event.name,
            eventBackgroundUrl: event.backgroundUrl,
            createdAt: Date.now(),
            betAmount,
            userId: MOCK_USER_ID,
            userName: MOCK_USER_NAME,
        }));
    }, [event, betAmount, dispatch]);

    return <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>

        <Typography align={'center'} variant={'h5'}>Make Bet</Typography>

        <CardContent>
            <Typography align={'center'}>Odds: {round(selectedOutcome?.odds, 2)}</Typography>

            <InputLabel htmlFor="event-outcome-select">Outcome</InputLabel>
            <NativeSelect
                sx={{minWidth: '300px'}}
                inputProps={{
                    name: 'outcome',
                    id: 'event-outcome-select',
                }}
                onChange={onOutcomeSelected}
            >
                {event && event.outcomes.map((outcome, index) =>
                    <option key={index} value={index}>{outcome.name}</option>)}
            </NativeSelect>

            <Typography sx={{mt: 2}}>Your bet:</Typography>
            <TextField placeholder={'0'}
                       variant="standard"
                       sx={{minWidth: '300px'}}
                       size={'small'}
                       type="number"
                       error={betAmount <= 0}
                       helperText={betAmount <= 0
                           ? 'Bet amount should be greater than zero'
                           : `Estimated earnings: +${calcEarnings(betAmount, selectedOutcome?.odds)}$`}
                       onChange={(e) => setBetAmount(Number(e.target.value))}/>
        </CardContent>

        <CardActions sx={{justifyContent: 'center'}}>
            <Button color={'success'} onClick={onMakeBet}>Confirm</Button>
        </CardActions>
    </Paper>
}

export default MakeBetForm;