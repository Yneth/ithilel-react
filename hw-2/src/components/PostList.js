import {memo, useCallback, useEffect, useState} from 'react';
import * as postsApi from "../api/posts";
import Post from "./Post";
import {CircularProgress, Stack} from "@mui/material";
import ErrorAlert from "./ErrorAlert";
import CreatePostButton from "./CreatePostButton";
import { v4 as uuidv4 } from 'uuid';

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

    const addPostHandler = () => {
        setPosts(posts => [{key: `${uuidv4()}`}, ...posts]);
    };

    const createPostHandler = useCallback((createdPost) => {
        setPosts(posts => posts.map(post =>  post.key === createdPost.key ? createdPost : post));
    }, []);

    const updatePostHandler = useCallback((updatedPost) => {
        setPosts(posts => posts.map(post =>  post.key === updatedPost.key ? updatedPost : post));
    }, []);

    const deletePostHandler = useCallback((deletedPostId, deletedPostKey, onError) => {
        postsApi.remove(deletedPostId)
            .then(_ => setPosts(posts => posts.filter(post => deletedPostKey !== post.key)))
            .catch(error => [setError(error), onError()]);
    }, []);

    const postComponents = posts.map(post =>
        <Post key={post.key}
              post={post}
              onCreate={createPostHandler}
              onUpdate={updatePostHandler}
              onDelete={deletePostHandler}>
        </Post>);

    return <>
        {isLoading
            ? <Stack alignItems="center"> <CircularProgress /></Stack>
            : <><CreatePostButton onClick={addPostHandler}></CreatePostButton>{postComponents}</>}
        <ErrorAlert error={error} onClose={() => setError(null)}></ErrorAlert>
    </>
});

export default PostList;
