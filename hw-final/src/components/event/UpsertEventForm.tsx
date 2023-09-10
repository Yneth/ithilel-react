import {FC, memo, useCallback, useState} from "react";
import {Button, Paper, styled, TextField, Typography} from "@mui/material";
import {eventActions, selectMaybeEvent, selectModalOptions} from "../../store/events/events.slice";
import {useAppDispatch, useAppSelector} from "../../store/root.store";
import {validateCategory, validateDescription, validateImageUrl, validateName, validateOutcomeName} from "./validation";
import {mapToCreateRequest, mapToFormFields, mapToUpdateRequest} from "./converter";
import {areAllFieldsValid, createFormValidation, getError, hasError, validateField} from "../../util";

export interface EventFields {
    name: string;
    category: string;
    description: string;
    yesOutcomeName: string;
    noOutcomeName: string;
    backgroundUrl: string;
}

const CardImage = styled('img')({
    width: 320,
    height: 300,
    objectFit: 'cover'
});

// It is better to use some library to handle form validation, instead of using custom implementation with
// lots of duplication.
const UpsertEventForm: FC = memo(() => {
    const modalOptions = useAppSelector(selectModalOptions);
    const eventId = modalOptions.eventId as string;
    const isCreate = eventId == null;
    const eventToUpdate = useAppSelector(selectMaybeEvent(eventId));

    const [event, setEvent] = useState(mapToFormFields(eventToUpdate));
    const [fieldErrors, setFieldErrors] = useState(createFormValidation({
        name: null,
        category: null,
        description: null,
        yesOutcomeName: null,
        noOutcomeName: null,
        backgroundUrl: 'valid'
    }, event));
    const dispatch = useAppDispatch();

    const onSave = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!event || !areAllFieldsValid(fieldErrors)) {
            return;
        }
        const validFields = event as EventFields;
        const action = isCreate
            ? eventActions.createEventRequest(mapToCreateRequest(validFields))
            : eventActions.updateEventRequest(mapToUpdateRequest(eventId, validFields));
        dispatch(action);
    }, [dispatch, event, eventId, fieldErrors, isCreate]);

    return <Paper sx={{p: 3, px: 6, display: 'flex', flexDirection: 'column', gap: 2}}
                  component={'form'}
                  onSubmit={onSave}>
        <Typography variant={'h5'} align={'center'}>{isCreate ? 'Create new' : 'Update'} Bet Event</Typography>
        <TextField
            variant="standard"
            error={hasError(fieldErrors?.backgroundUrl)}
            helperText={getError(fieldErrors.backgroundUrl)}
            label={'Background URL'}
            name={'backgroundUrl'}
            value={event.backgroundUrl}
            onChange={validateField(validateImageUrl, setEvent, setFieldErrors)}/>
        <CardImage alt={'event logo'} src={event.backgroundUrl ? event.backgroundUrl : `https://cataas.com/c?q=${event.name}`}/>
        <TextField
            variant="standard"
            error={hasError(fieldErrors?.name)}
            helperText={getError(fieldErrors.name)}
            label={'Event Name'}
            name={'name'}
            value={event.name}
            onChange={validateField(validateName, setEvent, setFieldErrors)}
            required={true}/>
        <TextField
            variant="standard"
            error={hasError(fieldErrors?.category)}
            helperText={getError(fieldErrors.category)}
            label={'Category'}
            name={'category'}
            value={event.category}
            onChange={validateField(validateCategory, setEvent, setFieldErrors)}
            required={true}/>
        <TextField
            variant="standard"
            error={hasError(fieldErrors?.description)}
            helperText={getError(fieldErrors.description)}
            label={'Description'}
            name={'description'}
            value={event.description}
            onChange={validateField(validateDescription, setEvent, setFieldErrors)}
            required={true}/>
        <TextField
            variant="standard"
            error={hasError(fieldErrors?.yesOutcomeName)}
            helperText={getError(fieldErrors.yesOutcomeName)}
            label={'Yes outcome name'}
            name={'yesOutcomeName'}
            value={event.yesOutcomeName}
            required={true}
            onChange={validateField(validateOutcomeName, setEvent, setFieldErrors)}/>
        <TextField
            variant="standard"
            error={hasError(fieldErrors?.noOutcomeName)}
            helperText={getError(fieldErrors.noOutcomeName)}
            label={'No outcome name'}
            name={'noOutcomeName'}
            value={event.noOutcomeName}
            required={true}
            onChange={validateField(validateOutcomeName, setEvent, setFieldErrors)}/>
        <Button type='submit'
                disabled={!areAllFieldsValid(fieldErrors)}
        >
            {isCreate ? 'Create' : 'Update'}
        </Button>
    </Paper>
});

export default UpsertEventForm;