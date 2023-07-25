import {Container, Typography} from "@mui/material";
import PostList from './components/PostList'

function App() {
    return (
        <Container>
            <Typography variant={"h1"}>
                Daily posts
            </Typography>
            <PostList></PostList>
        </Container>
    );
}

export default App;
