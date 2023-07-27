import {memo, useCallback, useRef, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {Button, CircularProgress, Grid, Paper, Typography} from "@mui/material";
import * as postsApi from "../api/posts";
import DeletePostModal from "./DeletePostModal";
import ErrorAlert from "./ErrorAlert";
import { v4 as uuidv4 } from 'uuid';

const Post = memo(({post, onCreate, onUpdate, onDelete}) => {
    // using `useRef` to prevent rerender each time contenteditable element is modified
    const titleRef = useRef(null);
    const bodyRef = useRef(null);

    const [postData, setPostData] = useState(post);
    const [error, setError] = useState(null);
    const [isEdited, setIsEdited] = useState(post.id == null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const getUpdatedPostData = (titleRef, bodyRef, postState) => {
        const dataToUpdate = {...postState};
        if (titleRef.current) {
            dataToUpdate.title = titleRef.current.innerText;
        }
        if (bodyRef.current) {
            dataToUpdate.body = bodyRef.current.innerText;
        }
        return dataToUpdate;
    };

    const upsertHandler = useCallback((e) => {
        e.preventDefault();
        setIsLoading(true);

        const dataToUpdate = getUpdatedPostData(titleRef, bodyRef, postData);
        const isEmptyPost = dataToUpdate.body === '' && dataToUpdate.title === '';
        if (isEmptyPost) {
            setIsDeleteModalOpen(true);
        } else {
            const callback = dataToUpdate.id != null ? onUpdate : onCreate;
            const apiOperation = dataToUpdate.id != null
                ? () => postsApi.update(dataToUpdate.id, dataToUpdate)
                : () => postsApi.create(dataToUpdate);

            apiOperation()
                .then(updated => [setIsEdited(false), callback(updated), setPostData(updated)])
                .catch(e => setError(e))
                .finally(() => setIsLoading(false));
        }
    }, [postData, titleRef, bodyRef, onCreate, onUpdate]);

    const deleteHandler = useCallback(({agreed}) => {
        setIsDeleteModalOpen(false);
        if (agreed) {
            setIsLoading(true);
            onDelete(postData.id, postData.key, () => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [postData.id, postData.key, onDelete]);

    const clearHandler = useCallback((e) => {
        e.preventDefault();
        // found that setTimeout triggers double render for some reason
        // without Math.random contenteditable elements do not rerender
        setPostData({...postData, contentEditableKey: uuidv4()});
        setIsEdited(false);
    }, [postData]);

    const pasteHandler = (e) => {
        if (e.target.isContentEditable) {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain')
            document.execCommand('insertText', false, text)
        }
    }

    return <Paper elevation={5}
                  sx={{
                      'marginTop': '1em',
                      'padding': '1em',
                      'cursor': 'pointer',
                      'background': isEdited ? 'lightblue' : ''
                  }}>

        <Grid container>

            <Grid item={true} xs sx={{'display': 'flex', 'flexDirection': 'column'}}>

                {/* did not find a way to create EditableTypography
                    due to issues with ref forwarding in functional components */}
                <Typography
                    key={postData.contentEditableKey + 'title'}
                    variant={"h4"} component={"h2"}
                    data-placeholder={"Post title goes here"}
                    onInput={() => setIsEdited(true)}
                    onPaste={pasteHandler}
                    ref={titleRef}
                    spellCheck={false}
                    contentEditable suppressContentEditableWarning>
                    {/* data is not updated unless key is added to the component  */}
                    {postData.title}
                </Typography>

                <Typography
                    key={postData.contentEditableKey + 'body'}
                    sx={{'flex': '1'}}
                    variant={"body1"} component={"section"}
                    data-placeholder={"Post body where you type your awesome info to share"}
                    onInput={() => setIsEdited(true)}
                    onPaste={pasteHandler}
                    ref={bodyRef}
                    spellCheck={false}
                    contentEditable suppressContentEditableWarning>
                    {/* data is not updated unless key is added to the component  */}
                    {postData.body}
                </Typography>

            </Grid>

            <Grid item={true} xs={1}>

                <Button fullWidth={true} color={'error'} onClick={() => setIsDeleteModalOpen(true)}>
                    {isLoading ? <CircularProgress/> : <DeleteIcon/>}
                </Button>

                {isEdited && !isLoading && <>
                    <Button fullWidth={true} color={'warning'} onClick={clearHandler}><ClearIcon/></Button>
                    <Button fullWidth={true} color={'success'} onClick={upsertHandler}><CheckIcon/></Button>
                </>}

            </Grid>
        </Grid>

        <DeletePostModal isOpen={isDeleteModalOpen} onClose={deleteHandler}></DeletePostModal>

        <ErrorAlert error={error} onClose={() => setError(null)}></ErrorAlert>
    </Paper>
});


export default Post;