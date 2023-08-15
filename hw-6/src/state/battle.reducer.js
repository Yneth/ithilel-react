import BATTLE from "./battle.constants";

const DEFAULT_PLAYER_COUNT = 2;
const DEFAULT_PLAYER_IDS = new Array(DEFAULT_PLAYER_COUNT).fill(0).map((_, index) => index);

const initialState = {
    playersById: DEFAULT_PLAYER_IDS.map(id => ([id, {avatarUrl: null, userName: null}]))
        .reduce((acc, [id, data]) => ({...acc, [id]: data}), {}),
    playerIds: DEFAULT_PLAYER_IDS,
    isAllPlayersSet: false,
    playerNames: []
}

const battleReducer = (state = initialState, action) => {
    switch (action.type) {
        case BATTLE.SET_USER_INPUT:
            return (() => {
                const nextState = {...state};
                const {id, userName, avatarUrl} = action.payload;
                nextState.playersById[id] = {userName, avatarUrl};

                const playerNames = Object.values(nextState.playersById).map(player => player.userName);
                nextState.playerNames = playerNames;
                nextState.isAllPlayersSet = playerNames.reduce((acc, userName) => userName && acc, true);
                return nextState;
            })();
        case BATTLE.RESET_USER_INPUT:
            return (() => {
                const nextState = {...state};
                const {id} = action.payload;
                nextState.playersById[id] = {avatarUrl: null, userName: null};
                return nextState;
            })();
        default:
            return state;
    }
}

export default battleReducer;