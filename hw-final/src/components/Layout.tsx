import { Outlet } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";
import Notifications from "./layout/Notifications";
import AppHeader from "./layout/AppHeader";
import UpsertEventModal from "./event/UpsertEventModal";

function Layout() {
  return (
    <>
      <AppHeader />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          px: 4,
          py: 2,
        }}
      >
        <Outlet />
      </Box>

      <Stack
        component="footer"
        direction="row"
        justifyContent="space-between"
        sx={{ p: 2, marginTop: "auto" }}
      >
        <Typography
          component="a"
          href="https://google.com/search?q=yneth"
          target="_blank"
        >
          <GoogleIcon />
        </Typography>
        <Typography>© Anthony Bondarenko, 2023</Typography>
      </Stack>
      <Notifications />
      <UpsertEventModal />
    </>
  );
}

export default Layout;
