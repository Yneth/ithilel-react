import {useCallback} from "react";
import {Tab, Tabs} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedLanguage} from "../state/popular.actions";

const LANGUAGES = ['All', 'Java', 'JavaScript', 'CSS', 'Ruby', 'Python', 'Rust'];

const LanguageList = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.popular.isLoading);
    const selectedLanguage = useSelector(state => state.popular.selectedLanguage);

    // TODO: query params is better suited for this one
    // we should have only one source of truth
    // in this case it will be query params
    const onLanguageSelect = useCallback((_, newValue) => {
        if (isLoading) {
            return;
        }
        dispatch(setSelectedLanguage(newValue));
    }, [dispatch, isLoading]);

    return <Tabs value={selectedLanguage} onChange={onLanguageSelect} centered>
        {LANGUAGES.map((language) => <Tab key={language} label={language} value={language}/>)}
    </Tabs>
};

export default LanguageList;