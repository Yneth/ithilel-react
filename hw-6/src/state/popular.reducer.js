import POPULAR from "./popular.constants";

const initialState = {
    selectedLanguage: 'All',
    repos: {},
    repoIds: [],
    isLoading: false,
    error: null,
}

const popularReducer = (state = initialState, action) => {
    switch (action.type) {
        case POPULAR.SET_SELECTED_LANGUAGE:
            return {...state, selectedLanguage: action.payload};
        case POPULAR.GET_REPOSITORIES_ERROR:
            return {...state, error: action.payload.error};
        case POPULAR.GET_REPOSITORIES_LOADING:
            return {...state, isLoading: action.payload.isLoading};
        case POPULAR.GET_REPOSITORIES_SUCCESS:
            return {
                ...state,
                repos: action.payload.repos.reduce((acc, repo) => ({...acc, [repo.id]: repo}), {}),
                repoIds: action.payload.repos.map(repo => repo.id),
                isLoading: false
            };
        default:
            return state;
    }
}

export default popularReducer;