import { 
    combineReducers, 
    createStore, 
    applyMiddleware 
} from 'redux';

import thunkMiddleware from 'redux-thunk';

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