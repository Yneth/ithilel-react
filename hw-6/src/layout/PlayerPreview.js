import {memo} from "react";
import {Stack, Typography} from "@mui/material";
import {comparisonFn} from "../util";

const PlayerPreview = memo(({userName, avatarUrl, renderFooter}) => {
    console.log('render player preview');
    return <Stack direction={'column'} spacing={2} justifyContent={'center'}>
        <img src={avatarUrl} alt={`${userName} avatar`}/>
        <Typography variant={'h4'} align={'center'}>@{userName}</Typography>
        {renderFooter}
    </Stack>
}, comparisonFn);

export default PlayerPreview;