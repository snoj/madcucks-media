import parsePodcast from 'node-podcast-parser';
import request from 'request';

export function podcastHasErrored(bool) {
    return {
        type: 'PODCAST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function podcastIsLoading(bool) {
    return {
        type: 'PODCAST_IS_LOADING',
        isLoading: bool
    };
}

export function podcastFetchDataSuccess(podcast) {
    return {
        type: 'PODCAST_FETCH_DATA_SUCCESS',
        podcast: {
            title: podcast.title,
            episodes: podcast.episodes
        }
    };
}

//Action Creator

export function PodcastFetchData(url) {
    console.log("Trying to fetch...");
    return (dispatch) => {
        dispatch(podcastIsLoading(true));

        request(url, (err, res, data) => {
            dispatch(podcastIsLoading(false));
            if (err) {
              console.error('Network error', err);
              return;
            }
           
            parsePodcast(data, (err, data) => {
              if (err) {
                dispatch(podcastHasErrored(true));
                console.error('Parsing error', err);
                return;
              }

              dispatch(podcastFetchDataSuccess(data));
            });
        });

    }
}