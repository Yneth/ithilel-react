import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/root.store";
import {eventActions, selectEventsFiltered} from "../store/events/events.slice";
import {Button, Grid, Paper, Typography} from "@mui/material";
import EventCardPreview from "../components/event/EventCardPreview";
import WithPreloader from "../components/layout/WithPreloader";
import {Link, useLocation} from "react-router-dom";

const EventsPage: FC = () => {
    const dispatch = useAppDispatch()
    const {search} = useLocation();
    const eventQuery = new URLSearchParams(search).get('q');

    const events = useAppSelector(state => selectEventsFiltered(state, eventQuery)) || null;
    const [isLoading, setIsLoading] = useState(!!events);

    useEffect(() => {
        dispatch(eventActions.fetchEventsRequest());
    }, [dispatch]);

    useEffect(() => {
        if (!!events && events.length) {
            setIsLoading(false);
        }
    }, [events]);

    const hasQuery = eventQuery && eventQuery.length;
    const hasNoEvents = !events || !events.length;
    return <WithPreloader isLoading={isLoading} blurAmount={'0.1rem'}>
        <>
            {events && <Grid spacing={2} container justifyContent={'center'}>
                {events.map(event => <Grid key={event.id} item>
                    <EventCardPreview key={event.id} eventId={event.id}/>
                </Grid>)}
            </Grid>}

            {hasNoEvents && <Paper sx={{p: 2, mt: 2, justifyContent: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                <Typography variant={'body1'}>
                    {hasQuery
                        ? `No events with such query: ${eventQuery}`
                        : 'No events...'}
                </Typography>

                {hasQuery && <Button component={Link} to={{pathname: '', search: ''}}>Reset</Button>}
            </Paper>}
        </>
    </WithPreloader>
}

export default EventsPage;