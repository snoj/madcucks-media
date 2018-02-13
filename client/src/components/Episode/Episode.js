import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { podcastFetchData, podcastIsLoading, setPodcastToNull } from '../../actions/podcast';
import MoreList from '../MoreList/MoreList';
import Player from '../Player/Player';

import FaDownload from 'react-icons/lib/fa/download';

import './Episode.css';


class Episode extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        this.props.fetchShow(this.props.match.params.show);
    }

    componentDidMount = () => {
        console.log("Mounting Episode...");
        console.log(this.props.match.params.show);
    }

    componentWillUnmount = () => {
        console.log("Unmounting Episode...")
        this.props.setPodcastToNull();
    }

    render() {
        console.log(this.props.location.pathname);
        if(this.props.hasErrored) {
            return(<h1>Failed to Load</h1>);
        }

        if(this.props.isLoading) {
            return(<p>Loading...</p>);
        }

        const guid = this.props.match.params.id;

        if(this.props.podcast && this.props.podcast.episodes && !(guid in this.props.podcast.episodes)) {
            return(<Redirect to="/404"/>);
        }

        return(
            <React.Fragment>
                <div className="episode-container">
                    {!this.props.isLoading && this.props.podcast &&    
                        <React.Fragment>
                            <div className="episode-image">
                                <img src={this.props.podcast.episodes[guid].image} />
                                <a className="download-button" href={this.props.podcast.episodes[guid].enclosure.url}>
                                    <FaDownload/> Download
                                </a>
                            </div>
                            <div className="episode-info">
                                <h1>{this.props.podcast.episodes[guid].title}</h1>
                                <p>{this.props.podcast.episodes[guid].description.replace(/<\/?.+?>/ig, '')}</p>
                            </div>
                            <MoreList episodeArray={this.props.podcast.episodes}/>
                        </React.Fragment>
                    }
                </div>
                {this.props.podcast && <Player url={this.props.podcast.episodes[guid].enclosure.url}/>}
            </React.Fragment>
        );
        
    }
}

const mapStateToProps = (state) => {
    return {
        podcast: state.podcastFetchDataSuccess,
        hasErrored: state.podcastHasErrored,
        isLoading: state.podcastIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchShow: (showName) => dispatch(podcastFetchData(showName)),
        setPodcastToNull: () => dispatch(setPodcastToNull())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Episode);