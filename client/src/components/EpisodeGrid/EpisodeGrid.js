import React, { Component } from 'react';
import { connect } from 'react-redux';
import { podcastFetchData, fetchRecentEpisodes } from '../../actions/podcast';

import Thumbnail from '../Thumbnail/Thumbnail';
import './EpisodeGrid.css';

class EpisodeGrid extends Component {
    componentDidMount = () => {
        if(this.props.isHome) {
            this.props.fetchRecent();
        } else {
            this.props.fetchShow(this.props.showName);
        }
        
    }

    render() {

        if(this.props.isLoading) {
            return (<p>Loading...</p>);
        }
        
        if(this.props.hasErrored) {
            return (<p>Sorry! There was an error loading the items</p>);
        }

        let thumbnails = [];
        this.props.isHome && this.props.recentEpisodes && this.props.recentEpisodes.map((a) => {
            thumbnails.push(
                <Thumbnail 
                    key={a.guid} 
                    episodeURL={"/shows/" + a.showName + "/" +  encodeURIComponent(a.guid)} 
                    imageSrc={a.image} 
                    title={a.title}
                    duration={a.duration}
                    date={a.published}
                />
            );
        });

        !this.props.isHome && this.props.podcast && Object.keys(this.props.podcast.episodes).map((encodedGuid) => {
            const episodeInfo = this.props.podcast.episodes[encodedGuid];
            const url = "/shows/" + this.props.showName + "/" + encodeURIComponent(episodeInfo.guid);
            thumbnails.push(
                <Thumbnail
                    key={episodeInfo.guid} 
                    episodeURL={url} 
                    imageSrc={episodeInfo.image ? episodeInfo.image : this.props.podcast.image} 
                    title={episodeInfo.title}
                    duration={episodeInfo.duration}
                    date={episodeInfo.published}
                />
            );
        });

        return(
            <div className="episodegrid-container">
                {thumbnails}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        podcast: state.podcastFetchDataSuccess,
        hasErrored: state.podcastHasErrored,
        isLoading: state.podcastIsLoading,
        recentEpisodes: state.recentEpisodes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchShow: (showName) => dispatch(podcastFetchData(showName)),
        fetchRecent: () => dispatch(fetchRecentEpisodes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeGrid);