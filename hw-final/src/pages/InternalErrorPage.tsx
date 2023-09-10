import { FC } from "react";
import { Typography } from "@mui/material";
import AbsoluteCenter from "../components/layout/AbsoluteCenter";

// To be used with prerendering configuration
const InternalErrorPage: FC = () => {
  return (
    <AbsoluteCenter>
      <Typography>INTERNAL ERROR</Typography>
    </AbsoluteCenter>
  );
};

export default InternalErrorPage;
