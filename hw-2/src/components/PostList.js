import {memo, useCallback, useEffect, useState} from 'react';
import * as postsApi from "../api/posts";
import Post from "./Post";
import {Button, CircularProgress, Stack} from "@mui/material";
import ErrorAlert from "./ErrorAlert";
import { v4 as uuidv4 } from 'uuid';
import AddIcon from "@mui/icons-material/Add";

const PostList = memo(() => {
    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        postsApi.fetchAll()
            .then(posts => setPosts(posts.map(post => ({...post, key: uuidv4()}))))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, []);

    const onAddPost = () => {
        setPosts(posts => [{key: `${uuidv4()}`}, ...posts]);
    };

    const onPostUpserted = useCallback((createdPost) => {
        setPosts(posts => posts.map(post =>  post.key === createdPost.key ? createdPost : post));
    }, []);

    const onPostDeleted = useCallback((deletedPostId, deletedPostKey, onError) => {
        postsApi.remove(deletedPostId)
            .then(_ => setPosts(posts => posts.filter(post => deletedPostKey !== post.key)))
            .catch(error => [setError(error), onError()]);
    }, []);

    const postComponents = posts.map(post =>
        <Post key={post.key}
              post={post}
              onCreate={onPostUpserted}
              onUpdate={onPostUpserted}
              onDelete={onPostDeleted}>
        </Post>);

    return <>
        {isLoading
            ? <Stack alignItems="center"> <CircularProgress /></Stack>
            : <>
                <Button variant="outlined" fullWidth={true} color={'success'} onClick={onAddPost}><AddIcon/></Button>
                {postComponents}
            </>}
        <ErrorAlert error={error} onClose={() => setError(null)}></ErrorAlert>
    </>
});

export default PostList;
