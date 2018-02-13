import { 
    ALL_SHOWS_INFO_LOADING,
    ALL_SHOWS_INFO_HAS_ERRORED,
    ALL_SHOWS_INFO_DATA_SUCCESS
 } from './actiontypes';


export function allShowsInfoIsLoading(bool) {
    return {
        type: ALL_SHOWS_INFO_LOADING,
        isLoading: bool
    };
}

export function allShowsInfoHasErrored(bool) {
    return {
        type: ALL_SHOWS_INFO_HAS_ERRORED,
        hasErrored: bool
    };
}

export function allShowsInfoSuccess(allShowsInfo) {
    return {
        type: ALL_SHOWS_INFO_DATA_SUCCESS,
        data: allShowsInfo
    };
}

export function fetchAllShowsInfo() {
    return (dispatch) => {
        dispatch(allShowsInfoIsLoading(true));
        dispatch(allShowsInfoHasErrored(false));

        fetch('/api/shows')
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                dispatch(allShowsInfoIsLoading(false));
                dispatch(allShowsInfoSuccess(json));
            })
            .catch((err) => {
                dispatch(allShowsInfoIsLoading(false));
                dispatch(allShowsInfoHasErrored(true));
                console.log(err);
            });
    };
}