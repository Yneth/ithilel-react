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

    const onDeleteModalClose = useCallback(({agreed}) => {
        setIsDeleteModalOpen(false);
        if (agreed) {
            setIsLoading(true);
            onDelete(postData.id, postData.key, () => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [postData.id, postData.key, onDelete]);

    const saveHandler = useCallback((e) => {
        e.preventDefault();

        setIsLoading(true);

        const dataToUpdate = {...postData};
        if (titleRef.current) {
            dataToUpdate.title = titleRef.current.innerText;
        }
        if (bodyRef.current) {
            dataToUpdate.body = bodyRef.current.innerText;
        }

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
                    variant={"h4"} component={"h2"}
                    key={postData.contentEditableKey + 'title'}
                    data-placeholder={"Post title goes here"}
                    onInput={() => setIsEdited(true)}
                    onPaste={pasteHandler}
                    ref={titleRef}
                    spellCheck={false}
                    contentEditable={true}
                    suppressContentEditableWarning={true}>
                    {/* data is not updated unless key is added to the component  */}
                    {postData.title}
                </Typography>

                <Typography
                    sx={{'flex': '1'}}
                    variant={"body1"} component={"section"}
                    data-placeholder={"Post body where you type your awesome info to share"}
                    key={postData.contentEditableKey + 'body'}
                    onInput={() => setIsEdited(true)}
                    onPaste={pasteHandler}
                    ref={bodyRef}
                    spellCheck={false}
                    contentEditable={true}
                    suppressContentEditableWarning={true}>
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
                    <Button fullWidth={true} color={'success'} onClick={saveHandler}><CheckIcon/></Button>
                </>}

            </Grid>
        </Grid>

        <DeletePostModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}></DeletePostModal>

        <ErrorAlert error={error} onClose={() => setError(null)}></ErrorAlert>
    </Paper>
});


export default Post;