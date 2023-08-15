import {memo} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useSelector} from "react-redux";

function shortDescription(description) {
    return description && description.length >= 40
        ? `${description.substring(0, 40)}...`
        : description;
}

const RepositoryItem = memo(({repoId}) => {
    console.log('render repository');
    const {name, stars, avatarUrl, description, url} = useSelector(state => state.popular.repos[repoId]);

    return <Card raised={true}>
        <CardMedia
            sx={{height: 300}}
            image={avatarUrl}
            title={name}/>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {name}
            </Typography>
            <Typography sx={{mb: 1.5}} color="text.secondary">
                ⭐️{stars}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {shortDescription(description)}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" href={url} target={'_blank'}>Learn More</Button>
        </CardActions>
    </Card>
});

export default RepositoryItem;