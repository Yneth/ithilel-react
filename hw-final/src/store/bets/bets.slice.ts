import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  BetListResponse,
  BetResponse,
  CreateBetRequest,
} from "../../api/bets/bets.types";
import type { RootState } from "../root.store";

type BetId = string;

const INITIAL_STATE = {
  byId: {} as { [betId: string]: BetResponse },
  isModalOpen: false,
};

const slice = createSlice({
  name: "bets",
  initialState: INITIAL_STATE,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },

    hideModal: (state) => {
      state.isModalOpen = false;
    },

    fetchBetsRequest: (state) => {},

    fetchBetsSuccess: (state, { payload }: PayloadAction<BetListResponse>) => {
      state.byId = payload.reduce(
        (acc, bet) => ({ ...acc, [bet.id]: bet }),
        {},
      );
    },

    createBetRequest: (state, _: PayloadAction<CreateBetRequest>) => {},

    createBetSuccess: (state, { payload }: PayloadAction<BetResponse>) => {
      state.byId[payload.id] = payload;
    },

    deleteBetRequest: (state, { payload }: PayloadAction<BetId>) => {},

    deleteBetSuccess: (state, { payload }: PayloadAction<BetId>) => {
      delete state.byId[payload];
    },
  },
});

export const betActions = slice.actions;

export const selectBets = (state: RootState) => Object.values(state.bets.byId);
export const selectBetsForUserId = createSelector(
  [selectBets, (state: RootState, userId: string) => userId],
  (bets, userId) => bets.filter((bet) => bet.userId === userId),
);
export const selectBetsForEventId = createSelector(
  [selectBets, (state: RootState, eventId: string) => eventId],
  (bets, eventId) => bets.filter((bet) => bet.eventId === eventId),
);
export const selectBet = (betId: BetId) => (state: RootState) =>
  state.bets.byId[betId];

export default slice.reducer;
