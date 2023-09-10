import {FC, memo} from "react";
import {Typography} from "@mui/material";
import AbsoluteCenter from "../components/layout/AbsoluteCenter";

const NotFoundPage: FC = memo(() => {
    return <AbsoluteCenter>
        <Typography>
            NOT FOUND
        </Typography>
    </AbsoluteCenter>
});

export default NotFoundPage;