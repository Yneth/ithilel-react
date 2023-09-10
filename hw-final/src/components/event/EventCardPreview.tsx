import {FC, memo, useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/root.store";
import {eventActions, selectEvent} from "../../store/events/events.slice";
import {Box, Button, Menu, MenuItem, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import BuildIcon from '@mui/icons-material/Build';

const EventCardMenu: FC<{
    onDelete: () => void,
    onUpdate: () => void,
}> = memo(({onUpdate, onDelete}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (callback?: () => void) => () => {
        setAnchorEl(null);
        if (callback) callback();
    };

    return <>
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <BuildIcon/>
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose()}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleClose(onUpdate)}>Edit</MenuItem>
            <MenuItem onClick={handleClose(onDelete)}>Delete</MenuItem>
        </Menu>
    </>
});

const EventCardPreview: FC<{
    eventId: string,
}> = memo(({eventId}) => {
    const event = useAppSelector(selectEvent(eventId));
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const onDelete = useCallback(() => {
        dispatch(eventActions.deleteEventRequest(eventId));
    }, [dispatch, eventId]);

    const onReadMore = useCallback(() => {
        navigate(`/events/${eventId}`)
    }, [navigate, eventId]);

    return <Paper elevation={20}
                  sx={{
                      p: 2,
                      width: '320px',
                      maxHeight: '640px',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative'
                  }}>

        <Box sx={{position: 'absolute', right: 0, top: 0, display: 'flex', flexDirection: 'row'}}>
            <EventCardMenu
                onDelete={onDelete}
                onUpdate={() => dispatch(eventActions.openUpsertModal(eventId))}/>
        </Box>

        <Box sx={{flexDirection: 'row', display: 'flex', gap: '2rem'}}>
            <img width={"90"} height={"90"} style={{objectFit: 'contain'}}
                 src={event.backgroundUrl}
                 alt={event.name + ' logo'}/>

            <Box>
                <Typography gutterBottom variant="caption" component="p">
                    {event.category}
                </Typography>

                <Typography gutterBottom variant="subtitle1" component="p">
                    {event.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{height: '2lh', overflow: 'hidden'}}
                >
                    {event.description}
                </Typography>
            </Box>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button
                color="primary"
                onClick={onReadMore}
            >
                READ MORE
            </Button>
        </Box>
    </Paper>
});

export default EventCardPreview;