import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { podcastFetchData } from '../../actions/podcast';

import Thumbnail from '../Thumbnail/Thumbnail';
import './EpisodeGrid.css';

class EpisodeGrid extends Component {
    componentDidMount = () => {
        this.props.fetchShow(this.props.showName);
    }

    render() {

        if(this.props.isLoading) {
            return (<p>Loading...</p>);
        }
        
        if(this.props.hasErrored) {
            return (<p>Sorry! There was an error loading the items</p>);
        }
        let thumbnails = [];

        if(this.props.podcast) {
            console.log(this.props.podcast);
        }

        this.props.podcast.episodes && this.props.podcast.episodes.map((a, i) => {
            const url = "/shows/" + this.props.showName + "/" + (this.props.podcast.episodes.length - i - 1).toString();
            thumbnails.push(
                <Thumbnail episodeURL={url} imageSrc={a.image ? a.image : this.props.podcast.image} title={a.title}/>
            );
        });

        return(
            <div className="episodegrid-container">
                {thumbnails}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        podcast: state.podcastFetchDataSuccess,
        hasErrored: state.podcastHasErrored,
        isLoading: state.podcastIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchShow: (showName) => dispatch(podcastFetchData(showName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeGrid);