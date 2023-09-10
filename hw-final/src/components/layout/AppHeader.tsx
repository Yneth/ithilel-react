import React, { FC, memo } from "react";
import { AppBar, Box, Button } from "@mui/material";
import SearchField from "./SearchField";
import NavItems from "./NavItems";
import { eventActions } from "../../store/events/events.slice";
import { useAppDispatch } from "../../store/root.store";
import { ResponsiveToolbar } from "./Responsive";

const AppHeader: FC = memo(() => {
  const dispatch = useAppDispatch();
  return (
    <AppBar position="relative">
      <ResponsiveToolbar sx={{ textAlign: "center" }}>
        <NavItems
          sx={{
            flex: 1,
            justifyContent: { md: "start" },
            marginRight: { md: "auto" },
            height: "100%",
          }}
        />

        <SearchField key={document.location.search} />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: { md: "end" },
            marginLeft: { md: "auto" },
          }}
        >
          <Button
            sx={{ p: 2, color: "white", display: "block" }}
            onClick={() => dispatch(eventActions.openUpsertModal())}
          >
            Create event
          </Button>
        </Box>
      </ResponsiveToolbar>
    </AppBar>
  );
});

export default AppHeader;
