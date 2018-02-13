import { 
    PODCAST_IS_LOADING, 
    PODCAST_HAS_ERRORED, 
    PODCAST_FETCH_DATA_SUCCESS,
    GET_RECENT_EPISODES,
    SET_PODCAST_TO_NULL
} from './actiontypes';

export function podcastHasErrored(bool) {
    return {
        type: PODCAST_HAS_ERRORED,
        hasErrored: bool
    };
}

export function podcastIsLoading(bool) {
    return {
        type: PODCAST_IS_LOADING,
        isLoading: bool
    };
}

export function podcastFetchDataSuccess(podcast) {
    return {
        type: PODCAST_FETCH_DATA_SUCCESS,
        podcast
    };
}

export function getRecentEpisodes(recentEpisodes) {
    return {
        type: GET_RECENT_EPISODES,
        recentEpisodes
    };
}

export function setPodcastToNull() {
    return {
        type: SET_PODCAST_TO_NULL,
        podcast: null
    };
}

export function fetchRecentEpisodes() {
    return (dispatch) => {
        dispatch(podcastIsLoading(true));
        dispatch(podcastHasErrored(false));

        fetch('/api/home')
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                dispatch(podcastIsLoading(false));
                dispatch(getRecentEpisodes(json));
            })
            .catch((err) => {
                dispatch(podcastIsLoading(false));
                dispatch(podcastHasErrored(true));
                console.log(err);
            });
    };
}

export function podcastFetchData(showName) {
    return (dispatch) => {
        dispatch(podcastIsLoading(true));
        dispatch(podcastHasErrored(false));

        fetch('/api/shows/' + showName)
            .then((res) => res.json())
            .then((json) => {
                dispatch(podcastFetchDataSuccess(json));
                dispatch(podcastIsLoading(false));
            })
            .catch((err) => {
                dispatch(podcastIsLoading(false));
                dispatch(podcastHasErrored(true));
                console.log(err);
            });
    };
}