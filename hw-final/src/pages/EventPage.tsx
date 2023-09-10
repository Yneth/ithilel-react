import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/root.store";
import {BetEvent, eventActions, selectEvent} from "../store/events/events.slice";
import {Box, List, Paper, Typography} from "@mui/material";
import {selectBetsForEventId} from "../store/bets/bets.slice";
import MakeBetForm from "../components/bet/MakeBetForm";
import {useEffect, useState} from "react";
import BetListItem from "../components/bet/BetListItem";
import WithPreloader from "../components/layout/WithPreloader";
import {ResponsiveBox} from "../components/layout/Responsive";

const PRELOAD_ID = 'PRELOADER';

const DEFAULT_EVENT: BetEvent = {
    name: 'Is this cat cute?',
    description: 'Cat wants to know if he is cute',
    id: PRELOAD_ID,
    createdAt: Date.now(),
    category: 'cats',
    type: 'boolean',
    backgroundUrl: 'https://cataas.com/c?q=meow',
    outcomes: [],
    completionTime: Date.now()
};

const EventPage = () => {
    const {eventId} = useParams();
    const dispatch = useAppDispatch();

    const event = useAppSelector(selectEvent(eventId as string)) || DEFAULT_EVENT;
    const bets = useAppSelector(state => selectBetsForEventId(state, eventId as string)) || [];

    const [isLoading, setIsLoading] = useState<boolean>(event.id === PRELOAD_ID);

    useEffect(() => {
        if (!!event) {
            setIsLoading(false)
        }
    }, [event]);
    useEffect(() => {
        dispatch(eventActions.fetchEventRequest(eventId as string));
    }, [dispatch, eventId]);

    // Should use some other representation of Bet here
    return <WithPreloader isLoading={isLoading} blurAmount={'0.4rem'}>

        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2}}>

            <ResponsiveBox sx={{gap: '2rem', justifyContent: 'space-between'}}>
                <Box sx={{maxHeight: '400px', width: {md: '50%', xs: '100%'}}}>
                    <img src={event.backgroundUrl}
                         style={{width: '100%', height: '100%', objectFit: 'cover', margin: 'auto'}}
                         alt={event.name + 'logo'}/>
                </Box>

                <MakeBetForm key={`event-${event.id}`} eventId={event.id}/>
            </ResponsiveBox>

            <Paper sx={{p: 2}}>
                <Typography variant={'h2'}>{event.name}</Typography>
                <Typography variant={'body1'}>{event.description}</Typography>
            </Paper>

            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <Typography variant={'h4'}>Bets:</Typography>
                {bets && !!bets.length
                    ? <List> {bets.map((bet) => <BetListItem key={bet.id} betId={bet.id}/>)} </List>
                    : <Typography variant={'body2'}>No bets...</Typography>}
            </Paper>

        </Box>

    </WithPreloader>
}

export default EventPage;