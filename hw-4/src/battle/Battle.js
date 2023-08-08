import {useCallback, useState} from "react";
import {Link} from "react-router-dom";
import PlayerPreview from "./components/PlayerPreview";
import PlayerInput from "./components/PlayerInput";
import {Button, Stack, Typography} from "@mui/material";
import CenteredBox from "../components/CenteredBox";
import PlayerContainer from "./components/PlayerContainer";

const Battle = () => {
    console.log('render battle');
    const [playerData, setPlayerData] = useState({
        playerOne: {avatarUrl: null, label: 'Player 1'},
        playerTwo: {avatarUrl: null, label: 'Player 2'}
    });

    const onPlayerInputSubmit = useCallback((playerId, userName) => {
        setPlayerData(prevState => ({
            ...prevState,
            [playerId]: {
                ...prevState[playerId],
                userName,
                avatarUrl: `https://github.com/${userName}.png?size=200`
            }
        }))
    }, []);

    const onPlayerReset = useCallback((playerId) => {
        setPlayerData(prevState => ({
            ...prevState,
            [playerId]: {label: prevState[playerId].label}
        }))
    }, []);

    const isAllUsersSet = Object.values(playerData)
        .reduce((acc, playerData) => acc && playerData.userName, true);

    const buildSearchParams = () => Object.values(playerData)
        .map((player, i) => `player-${i}=${player.userName}`)
        .join('&');

    return <Stack component={'section'} spacing={4} direction="column" justifyContent="center" sx={{flex: 1}}>
        <Typography align='center' variant={'h4'}>
            Choose your destiny
        </Typography>

        <Stack component={'section'} direction="row" spacing={2} justifyContent="center">
            {Object.entries(playerData).map(([playerId, playerData]) =>
                <PlayerContainer key={`player-${playerId}`}>
                    {playerData.userName
                        ? <PlayerPreview
                            userName={playerData.userName}
                            avatarUrl={playerData.avatarUrl}
                            renderFooter={
                                <CenteredBox>
                                    <Button variant="contained"
                                            color={'warning'}
                                            key={playerId + '-reset'}
                                            sx={{width: '100px', marginLeft: 'auto', marginRight: 'auto'}}
                                            onClick={() => onPlayerReset(playerId)}>
                                        Reset
                                    </Button>
                                </CenteredBox>
                            }/>
                        : <PlayerInput
                            id={playerId}
                            label={playerData.label}
                            onSubmit={onPlayerInputSubmit}/>}
                </PlayerContainer>
            )}
        </Stack>

        <CenteredBox sx={{visibility: isAllUsersSet ? '' : 'hidden'}}>
            <Button variant="contained"
                    component={Link}
                    to={{pathname: 'results', search: `?${buildSearchParams()}`}}>
                Battle
            </Button>
        </CenteredBox>
    </Stack>
}

export default Battle;