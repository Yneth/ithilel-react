import {Box, Paper, styled, Toolbar} from "@mui/material";

export const ResponsiveBox = styled(Box)(({theme}) => (({
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column'
    }
}))) as typeof Box;

export const ResponsiveToolbar = styled(Toolbar)(({theme}) => (({
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column'
    }
}))) as typeof Toolbar;

export const ResponsivePaper = styled(Paper)(({theme}) => (({
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column'
    }
}))) as typeof Paper;