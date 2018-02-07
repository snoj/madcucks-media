import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PodcastFetchData } from '../../actions/podcast';

import Thumbnail from '../Thumbnail/Thumbnail';
import './EpisodeGrid.css';

class EpisodeGrid extends Component {
    componentDidMount() {
        this.props.fetchData('http://thedickshow.libsyn.com/thedickshow');
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

        this.props.podcast.episodes && this.props.podcast.episodes.map((a) => {
            thumbnails.push(<Thumbnail imageSrc={a.image} title={a.title}/>);
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
        fetchData: (url) => dispatch(PodcastFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeGrid);