import {Paper} from "@mui/material";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)(({sx}) => ({
    minHeight: 350,
    width: 250,
    padding: '2em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    ...sx
}));

const BG_COLOR_BY_RESULT = {
    true: '#cafcdc',
    false: '#fccae6',
    undefined: '',
    null: ''
};

const PlayerContainer = ({children, isWinner, sx}) => {
    return <StyledPaper elevation={10} sx={{...sx, backgroundColor: BG_COLOR_BY_RESULT[isWinner]}}>
        {children}
    </StyledPaper>
};

export default PlayerContainer;