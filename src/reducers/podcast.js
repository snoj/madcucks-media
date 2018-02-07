export function podcastHasErrored(state = false, action) {
    switch(action.type) {
        case 'PODCAST_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function podcastIsLoading(state = false, action) {
    switch(action.type) {
        case 'PODCAST_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function podcastFetchDataSuccess(state = [], action) {
    switch(action.type) {
        case 'PODCAST_FETCH_DATA_SUCCESS':
            return action.podcast;
        default:
            return state;
    }
}