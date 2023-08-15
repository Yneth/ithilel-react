import POPULAR from "./popular.constants";

export const setSelectedLanguage = (payload) => ({
    type: POPULAR.SET_SELECTED_LANGUAGE,
    payload,
});

export const getRepositoriesLoading = (payload) => ({
    type: POPULAR.GET_REPOSITORIES_LOADING,
    payload
});

export const getRepositoriesSuccess = (payload) => ({
    type: POPULAR.GET_REPOSITORIES_SUCCESS,
    payload
});

export const getRepositoriesError = (payload) => ({
    type: POPULAR.GET_REPOSITORIES_ERROR,
    payload
});