import { FC, memo } from "react";
import { ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/root.store";
import { selectBet } from "../../store/bets/bets.slice";
import { ResponsivePaper } from "../layout/Responsive";

const BetListItem: FC<{
  betId: string;
}> = memo(({ betId }) => {
  const bet = useAppSelector(selectBet(betId));
  return (
    <ResponsivePaper
      component={ListItem}
      variant="outlined"
      sx={{ p: 2, display: "flex", justifyContent: "space-evenly" }}
    >
      <Link to={`/events/${bet.eventId}`}>
        <img
          src={bet.eventBackgroundUrl}
          alt="event logo"
          width={64}
          height={64}
        />
      </Link>
      <Link to={`/events/${bet.eventId}`}>
        <Typography>{bet.eventName}</Typography>
      </Link>
      <Typography>{bet.betAmount}$</Typography>
      <Typography>@{bet.userName}</Typography>
      <Typography>{new Date(bet.createdAt).toDateString()}</Typography>
    </ResponsivePaper>
  );
});

export default BetListItem;
