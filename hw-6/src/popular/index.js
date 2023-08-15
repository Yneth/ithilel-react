import RepositoryList from "./RepositoryList";
import LanguageList from "./LanguageList";
import {CircularProgress, Stack} from "@mui/material";
import AbsoluteCenter from "../layout/AbsoluteCenter";
import AppAlert from "../layout/AppAlert";
import {useSelector} from "react-redux";


const Popular = () => {
    const isLoading = useSelector(state => state.popular.isLoading);
    const error = useSelector(state => state.popular.error);

    return <Stack component='section'>
        {!!error && <AppAlert isOpen={!!error} message={error && error.message}/>}

        <LanguageList/>

        <AbsoluteCenter isEnabled={isLoading || !!error}>
            <CircularProgress color="secondary"/>
        </AbsoluteCenter>

        <RepositoryList sx={{filter: isLoading || !!error ? 'blur(1.5rem)' : '', 'marginTop': '1em'}}/>
    </Stack>
}

export default Popular;