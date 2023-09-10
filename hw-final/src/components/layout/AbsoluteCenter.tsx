import { Box, styled } from "@mui/material";

const AbsoluteCenter = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export default AbsoluteCenter;
