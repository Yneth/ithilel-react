import {memo} from "react";
import {Stack, Typography} from "@mui/material";

const WINNER_TO_LABEL = {
    true: '💪',
    false: '😭',
    null: '',
    undefined: ''
};

const textOrError = (text) => {
    return text ? text : <Typography align={'center'} component={'span'}>______________________</Typography>
};

const PlayerInfo = memo(({playerData}) => {
    console.log('render player info');
    return <>
        <Typography variant={'h3'} align={'center'}>
            {WINNER_TO_LABEL[playerData.isWinner]}
        </Typography>

        <Typography color={'text-secondary'}>
            💼 {textOrError(playerData.profile.data.company)}
        </Typography>

        <Typography color={'text-secondary'}>
            🌎️ {textOrError(playerData.profile.data.location)}
        </Typography>

        <Typography color={'text-secondary'} sx={{textDecoration: 'none'}} component={'a'} href={playerData.profile.data.blog} target={'_blank'}>
            🌐️ {textOrError(playerData.profile.data.blog)}
        </Typography>

        <Stack direction='row' justifyContent='space-around' spacing={2}>
            <Typography color={'text-secondary'} align={'left'}>
                Followers:️ {playerData.profile.data.followers}
            </Typography>

            <Typography color={'text-secondary'} align={'right'}>
                Following:️ {playerData.profile.data.following}
            </Typography>
        </Stack>

        <Typography color={'text-secondary'} align={'center'}>
            Repositories:️ {playerData.repos.data.length}
        </Typography>
        <Typography color={'text-secondary'} align={'center'}>
            ️️Total stars: {playerData.totalStars}⭐️
        </Typography>

        <Typography color={'text-secondary'} align={'center'}>
            ️️Total score: {playerData.score}
        </Typography>
    </>
});

export default PlayerInfo;