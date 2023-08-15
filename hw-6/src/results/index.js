import {Button, CircularProgress, Stack, Typography} from "@mui/material";
import PlayerPreview from "../layout/PlayerPreview";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as api from "../api";
import PlayerInfo from "./PlayerInfo";
import {addScore, assignWinnersAndLosers, getPlayerUserNames, transformToObject} from "./actions";
import PlayerContainer from "../layout/PlayerContainer";
import AppAlert from "../layout/AppAlert";
import CenteredBox from "../layout/CenteredBox";

function hasError(playerData, key) {
    return playerData && playerData[key] && !!playerData[key].error;
}

const BattleResults = () => {
    console.log('render battle results');
    const searchParams = new URLSearchParams(window.location.search);
    const [playersData, setPlayersData] = useState(transformToObject(getPlayerUserNames(searchParams)));

    // no reason to use redux here, we have query params as single source of truth
    useEffect(() => {
        const userNames = getPlayerUserNames(new URLSearchParams(window.location.search));
        setPlayersData(transformToObject(userNames, () => ({isLoading: true})));

        Promise.all(userNames.map(userName => api.getUserRepositoriesAndProfile(userName)))
            .then(users => users.map(user => addScore(user)))
            .then(users => assignWinnersAndLosers(users))
            .then(users => setPlayersData(users.reduce((acc, user) => ({...acc, [user.userName]: user}), {})));
    }, []);

    return <Stack component={'section'} spacing={4} direction="column" justifyContent="center" sx={{flex: 1}}>
        <Typography align='center' variant={'h4'}>
            RESULTS
        </Typography>

        <Stack component={'section'} direction="row" spacing={8} justifyContent="center">
            {Object.entries(playersData).map(([userName, data]) =>
                <PlayerContainer key={`player-${userName}`} isWinner={data && data.isWinner}>
                    {!data || data.isLoading || hasError(data, 'profile') || hasError(data, 'repos')
                        ?
                        <>
                            <AppAlert isOpen={hasError(data, 'profile')} message={'failed to load profile info'}/>
                            <AppAlert isOpen={hasError(data, 'repos')} message={'failed to load profile repos'}/>
                            <Stack direction='row' justifyContent='center'>
                                <CircularProgress/>
                            </Stack>
                        </>
                        :
                        <PlayerPreview
                            key={`player-${userName}-${data.isWinner}`}
                            isWinner={data.isWinner}
                            userName={data.profile.data.login}
                            avatarUrl={data.profile.data.avatar_url}
                            renderFooter={<PlayerInfo playerData={data}/>}/>
                    }
                </PlayerContainer>
            )}
        </Stack>
        <CenteredBox>
            <Button variant='outlined' component={Link} to={{pathname: '/battle'}}>TRY AGAIN?</Button>
        </CenteredBox>
    </Stack>
}

export default BattleResults;