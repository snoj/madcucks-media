import {
    PODCAST_FETCH_DATA_SUCCESS,
    PODCAST_HAS_ERRORED,
    PODCAST_IS_LOADING,
    GET_RECENT_EPISODES,
    SET_PODCAST_TO_NULL,
    ALL_SHOWS_INFO_LOADING,
    ALL_SHOWS_INFO_HAS_ERRORED,
    ALL_SHOWS_INFO_DATA_SUCCESS
} from '../actions/actiontypes';

export function podcastHasErrored(state = false, action) {
    switch(action.type) {
        case PODCAST_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}

export function podcastIsLoading(state = false, action) {
    switch(action.type) {
        case PODCAST_IS_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function podcastFetchDataSuccess(state = null, action) {
    switch(action.type) {
        case PODCAST_FETCH_DATA_SUCCESS:
            return action.podcast;
        case SET_PODCAST_TO_NULL:
            return action.podcast;
        default:
            return state;
    }
}

export function recentEpisodes(state = null, action) {
    switch(action.type) {
        case GET_RECENT_EPISODES:
            return action.recentEpisodes;
        default:
            return state;
    }
}

export function allShowsInfo(state = {}, action) {
    switch(action.type) {
        case ALL_SHOWS_INFO_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case ALL_SHOWS_INFO_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored
            };
        case ALL_SHOWS_INFO_DATA_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}
