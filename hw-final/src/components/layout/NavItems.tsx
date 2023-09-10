import {
  IconButton,
  styled,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import React, { FC, memo } from "react";
import PixIcon from "@mui/icons-material/Pix";
import { SxProps } from "@mui/system/styleFunctionSx";
import { ResponsiveBox } from "./Responsive";

const NAV_ITEMS = [
  { label: "Home", pathname: "/" },
  { label: "My Bets", pathname: "/my-bets" },
];

// make sure tabs are full height
const StyledTabs = styled(Tabs)(({ theme }) => ({
  ...theme.mixins.toolbar,
})) as typeof Tabs;

const StyledTab = styled(Tab)(({ theme }) => ({
  ...theme.mixins.toolbar,
})) as typeof Tab;

const NavItems: FC<{
  sx: SxProps;
}> = memo(({ sx }) => {
  const { pathname } = useLocation();
  const selectedTabIndex = NAV_ITEMS.map((item) => item.pathname).indexOf(
    pathname,
  );
  const selectedTabValue =
    selectedTabIndex >= 0 ? NAV_ITEMS[selectedTabIndex].pathname : false;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ResponsiveBox sx={{ ...sx }}>
      <IconButton
        component={Link}
        to="/"
        size="large"
        edge={false}
        color="inherit"
        aria-label="menu"
      >
        <PixIcon />
      </IconButton>

      <StyledTabs
        orientation={isSmallScreen ? "vertical" : "horizontal"}
        value={selectedTabValue}
        style={{ height: "100%" }}
        sx={{ color: "white" }}
        indicatorColor="secondary"
        textColor="inherit"
        component="nav"
      >
        {NAV_ITEMS.map(({ label, pathname }, index) => (
          <StyledTab
            label={label}
            component={Link}
            key={index}
            value={pathname}
            to={pathname}
          />
        ))}
      </StyledTabs>
    </ResponsiveBox>
  );
});

export default NavItems;
