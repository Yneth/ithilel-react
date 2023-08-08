import {useCallback, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as api from "../api";
import Repositories from "./components/Repositories";
import Languages from "./components/Languages";
import {CircularProgress, Stack} from "@mui/material";
import AbsoluteCenter from "../components/AbsoluteCenter";
import AppAlert from "../components/AppAlert";

const LANGUAGES = ['All', 'Java', 'JavaScript', 'CSS', 'Ruby', 'Python', 'Rust'];

// When picking key for the component make sure to use the following:
// 1. id from BE
// 2. natural number
// 3. natural string or array index
// NOT RANDOM, as it may result in unstable rendering and missing components
const DEFAULT_LANGUAGE_INDEX = 0;
const LANG_QUERY_PARAM_NAME = 'lang';

function getDefaultLanguage(search) {
    const langFromSearch = search.get(LANG_QUERY_PARAM_NAME);
    if (!langFromSearch) {
        return LANGUAGES[DEFAULT_LANGUAGE_INDEX];
    }
    const index = LANGUAGES.indexOf(langFromSearch);
    return LANGUAGES[index >= 0 ? index : DEFAULT_LANGUAGE_INDEX];
}

const Popular = () => {
    console.log('render popular');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedLanguage, setSelectedLanguage] = useState(getDefaultLanguage(searchParams));
    // using null as default value is ok as it shows a correct case when there was no data from backend
    const [repositories, setRepositories] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        api.fetchPopularRepositories(selectedLanguage)
            .then(repos => [setRepositories(repos), setError(null)])
            .catch(error => setError(error))
            .finally(_ => setIsLoading(false));
    }, [selectedLanguage])

    const onLanguageSelect = useCallback((_, newValue) => {
        if (isLoading) {
            // prevents user from making a lot of requests while one tab is still loading
            return;
        }
        setSelectedLanguage(newValue);

        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append(LANG_QUERY_PARAM_NAME, newValue);
        setSearchParams(urlSearchParams);
    }, [isLoading, setSearchParams]);

    return <Stack component='section'>
        {!!error && <AppAlert isOpen={!!error} message={error && error.message}/>}

        <Languages
            languages={LANGUAGES}
            selectedLanguage={selectedLanguage}
            onChange={onLanguageSelect}/>

        <AbsoluteCenter isEnabled={isLoading || !!error}>
            <CircularProgress color="secondary"/>
        </AbsoluteCenter>

        <div style={{filter: isLoading || !!error ? 'blur(1.5rem)' : '', 'marginTop': '1em'}}>
            {repositories && <Repositories repositories={repositories}/>}
        </div>
    </Stack>
}

export default Popular;