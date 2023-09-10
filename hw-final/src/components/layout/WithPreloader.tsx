import {FC, ReactElement} from "react";
import {Box} from "@mui/material";

const WithPreloader: FC<{
    isLoading: boolean,
    blurAmount: string,
    children: ReactElement
}> = ({isLoading, blurAmount, children}) => {
    const filter = isLoading ? `blur(${blurAmount})` : '';
    return <Box sx={{filter}}>
        {children}
    </Box>
}

export default WithPreloader;