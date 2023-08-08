import {memo} from "react";
import {Grid} from "@mui/material";
import Repository from "./Repository";

export const RepositoryList = memo(({repositories}) => {
    console.log('render repositories');
    return <Grid container spacing={2}>
        {repositories.map(repo => <Grid key={repo.id} item xs={3}>
            <Repository {...repo}/>
        </Grid>)}
    </Grid>
});

export default RepositoryList;