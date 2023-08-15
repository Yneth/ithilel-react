import {Grid} from "@mui/material";
import RepositoryItem from "./RepositoryItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getRepositories} from "../state/popular.thunk";

export const RepositoryList = ({sx}) => {
    console.log('render repositories');
    const dispatch = useDispatch();
    const selectedLanguage = useSelector(state => state.popular.selectedLanguage);
    const repoIds = useSelector(state => state.popular.repoIds);

    useEffect(() => {
        dispatch(getRepositories(selectedLanguage));
    }, [dispatch, selectedLanguage]);

    return <Grid container spacing={2} sx={sx}>
        {repoIds.map(repoId => <Grid key={repoId} item xs={3}>
            <RepositoryItem repoId={repoId}/>
        </Grid>)}
    </Grid>
}

export default RepositoryList;