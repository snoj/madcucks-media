import { combineReducers } from 'redux';

import { 
    podcastIsLoading, 
    podcastHasErrored, 
    podcastFetchDataSuccess,
    recentEpisodes,
    allShowsInfo 
} from './podcast';

const rootReducer = combineReducers({
    podcastHasErrored,
    podcastIsLoading,
    podcastFetchDataSuccess,
    recentEpisodes,
    allShowsInfo
});

export default rootReducer;