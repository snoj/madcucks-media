import { 
    PODCAST_IS_LOADING, 
    PODCAST_HAS_ERRORED, 
    PODCAST_FETCH_DATA_SUCCESS 
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

export function podcastFetchData(showName) {
    return (dispatch) => {
        dispatch(podcastIsLoading(true));

        fetch('/api/shows/' + showName)
            .then((res) => res.json())
            .then((json) => {
                dispatch(podcastIsLoading(false));
                dispatch(podcastFetchDataSuccess(json));
            })
            .catch((err) => {
                dispatch(podcastIsLoading(false));
                dispatch(podcastHasErrored(true));
                console.log(err);
            });
    }
}