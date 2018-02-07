import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { podcastIsLoading, podcastHasErrored, podcastFetchDataSuccess } from './podcast';

const rootReducer = combineReducers({
    podcastHasErrored,
    podcastIsLoading,
    podcastFetchDataSuccess
});

export default rootReducer;