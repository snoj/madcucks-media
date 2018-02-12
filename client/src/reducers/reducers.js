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
    recentEpisodes 
} from './podcast';

const rootReducer = combineReducers({
    podcastHasErrored,
    podcastIsLoading,
    podcastFetchDataSuccess,
    recentEpisodes
});

export default rootReducer;