import {Link} from "react-router-dom";
import {Button, Stack, Typography} from "@mui/material";
import CenteredBox from "../layout/CenteredBox";
import {useSelector} from "react-redux";
import PlayerBattlePreview from "./PlayerBattlePreview";

const Battle = () => {
    console.log('render battle');
    const playerIds = useSelector(state => state.battle.playerIds);
    // using useSelector(state => state.battle.players)
    // did not work for me
    // unless I do structuredClone of the state
    // which will trigger rerender of all PlayerBattlePreview
    // to mitigate this I decided to add more data to the state
    // skipping comparisonFn for the useSelector method
    // as it did not work correctly in this component.
    const isAllPlayersSet = useSelector(state => state.battle.isAllPlayersSet);
    const playerNames = useSelector(state => state.battle.playerNames)

    const buildSearchParams = () => playerNames
        .map((userName, i) => `player-${i}=${userName}`)
        .join('&');

    return <Stack component={'section'} spacing={4} direction="column" justifyContent="center" sx={{flex: 1}}>
        <Typography align='center' variant={'h4'}>
            Choose your destiny
        </Typography>

        <Stack component={'section'} direction="row" spacing={2} justifyContent="center">
            {playerIds.map((playerId) => <PlayerBattlePreview key={playerId} playerId={playerId}/>)}
        </Stack>

        <CenteredBox sx={{visibility: isAllPlayersSet ? '' : 'hidden'}}>
            <Button variant="contained"
                    component={Link}
                    to={{pathname: 'results', search: `?${buildSearchParams()}`}}>
                Battle
            </Button>
        </CenteredBox>
    </Stack>
}

export default Battle;