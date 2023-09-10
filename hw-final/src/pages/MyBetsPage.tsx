import React, { FC, useEffect, useState } from "react";
import { List, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/root.store";
import { betActions, selectBetsForUserId } from "../store/bets/bets.slice";
import BetListItem from "../components/bet/BetListItem";
import WithPreloader from "../components/layout/WithPreloader";
import { MOCK_USER_ID } from "../consts";

const MyBetsPage: FC = () => {
  const bets = useAppSelector((state) =>
    selectBetsForUserId(state, MOCK_USER_ID),
  );
  const [isLoading, setIsLoading] = useState(!!bets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(betActions.fetchBetsRequest());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(false);
  }, [bets]);

  return (
    <WithPreloader isLoading={isLoading} blurAmount="0.4rem">
      <Paper sx={{ p: 2 }}>
        <Typography variant="h3">Your bets</Typography>
        <List>
          {bets.map((bet) => (
            <BetListItem key={bet.id} betId={bet.id} />
          ))}
        </List>
      </Paper>
    </WithPreloader>
  );
};

export default MyBetsPage;
