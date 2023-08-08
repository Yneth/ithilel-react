import {Button, CircularProgress, Stack, Typography} from "@mui/material";
import PlayerPreview from "./components/PlayerPreview";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as api from "../api";
import PlayerInfo from "./components/PlayerInfo";
import {assignWinnersAndLosers, calculatePlayerScore, getPlayerUserNames, transformToObject} from "./actions";
import PlayerContainer from "./components/PlayerContainer";
import AppAlert from "../components/AppAlert";
import CenteredBox from "../components/CenteredBox";

function hasError(playerData, key) {
    return playerData && playerData[key] && !!playerData[key].error;
}

const BattleResults = () => {
    console.log('render battle results');
    const searchParams = new URLSearchParams(window.location.search);
    const [playersData, setPlayersData] = useState(transformToObject(getPlayerUserNames(searchParams)));

    useEffect(() => {
        setPlayersData(prevState => {
            const results = assignWinnersAndLosers(structuredClone(prevState));
            if (!results) {
                return prevState;
            }
            return results;
        });
    }, [playersData])

    useEffect(() => {
        const userNames = getPlayerUserNames(new URLSearchParams(window.location.search));
        setPlayersData(transformToObject(userNames, () => ({isLoading: true})));

        userNames.forEach((userName) => {
            api.getUserRepositoriesAndProfile(userName)
                .then(response => {
                    setPlayersData(prevState => ({
                        ...prevState,
                        [userName]: {...response, ...calculatePlayerScore(response), isLoaded: true}
                    }))
                });
        });
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