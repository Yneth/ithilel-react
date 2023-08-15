import BATTLE from "./battle.constants";

export const setUserInput = (payload) => ({
    type: BATTLE.SET_USER_INPUT,
    payload
});

export const resetUserInput = (payload) => ({
    type: BATTLE.RESET_USER_INPUT,
    payload
});