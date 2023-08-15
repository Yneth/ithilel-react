import {memo} from "react";
import {Container} from "@mui/material";
import Nav from "./Nav";
import {Outlet} from "react-router-dom";

const Layout = memo(() => {
    return <Container component={'main'}
                      sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          minHeight: '100vh'
                      }}>
        <Nav/>
        <Outlet/>
    </Container>
});

export default Layout;