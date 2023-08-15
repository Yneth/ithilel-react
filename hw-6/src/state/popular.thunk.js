import {getRepositoriesError, getRepositoriesLoading, getRepositoriesSuccess} from "./popular.actions";
import * as api from "../api";

export const getRepositories = (selectedLanguage) => async (dispatch) => {
    dispatch(getRepositoriesLoading({isLoading: true}));

    try {
        const repos = await api.fetchPopularRepositories(selectedLanguage);
        dispatch(getRepositoriesSuccess({repos}));
    } catch (error) {
        dispatch(getRepositoriesError({error}));
    }

    getRepositoriesLoading({isLoading: false});
}