import {memo, useCallback} from "react";
import PlayerPreview from "../layout/PlayerPreview";
import CenteredBox from "../layout/CenteredBox";
import {Button} from "@mui/material";
import PlayerInput from "./PlayerInput";
import PlayerContainer from "../layout/PlayerContainer";
import {useDispatch, useSelector} from "react-redux";
import {resetUserInput} from "../state/battle.actions";

const PlayerBattlePreview = memo(({playerId}) => {
    console.log('render player battle preview');

    const dispatch = useDispatch();
    const {userName, avatarUrl} = useSelector(state => state.battle.playersById[playerId]);

    const onPlayerReset = useCallback(() => {
        dispatch(resetUserInput({id: playerId}));
    }, [dispatch, playerId]);

    return <PlayerContainer>
        {userName
            ? <PlayerPreview
                userName={userName}
                avatarUrl={avatarUrl}
                renderFooter={
                    <CenteredBox>
                        <Button variant="contained"
                                color={'warning'}
                                key={playerId + '-reset'}
                                sx={{width: '100px', marginLeft: 'auto', marginRight: 'auto'}}
                                onClick={onPlayerReset}>
                            Reset
                        </Button>
                    </CenteredBox>
                }/>
            : <PlayerInput id={playerId} label={`Player ${playerId}`}/>}
    </PlayerContainer>
});

export default PlayerBattlePreview;