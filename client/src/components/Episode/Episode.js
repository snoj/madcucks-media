import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { podcastFetchData, setPodcastToNull } from '../../actions/podcast';
import MoreList from '../MoreList/MoreList';
import Player from '../Player/Player';

import { FaDownload, FaExternalLinkSquare, FaNewspaperO } from 'react-icons/lib/fa';

import './Episode.css';


class Episode extends Component {

    componentWillMount = () => {
        this.props.fetchShow(this.props.match.params.show);
    }

    componentWillUnmount = () => {
        this.props.setPodcastToNull();
    }

    setDescriptionMarkUp= (description) => {
        return { __html: description};
    }

    render() {
        if(this.props.hasErrored) {
            return(<h1>Failed to Load, Please Refresh</h1>);
        }

        if(this.props.isLoading) {
            return(<p>Loading...</p>);
        }

        const guid = this.props.match.params.id;

        if(!this.props.isLoading && this.props.podcast && this.props.podcast.episodes && !(guid in this.props.podcast.episodes)) {
            return(<Redirect to="/404"/>);
        }

        return(
            <React.Fragment>
                <div className="episode-container">
                    {!this.props.isLoading && this.props.podcast &&    
                        <React.Fragment>
                            <div className="episode-image">
                                <img src={this.props.podcast.episodes[guid].image ? this.props.podcast.episodes[guid].image: this.props.podcast.image} alt=""/>
                                <a className="download-button" href={this.props.podcast.episodes[guid].enclosure.url}>
                                    <FaDownload/> Download
                                </a>
                                <a className="episode-button" href={this.props.podcast.episodes[guid].link}>
                                    <FaNewspaperO/> Read Episode Post
                                </a>
                                <a className="podcast-homepage-button" href={this.props.podcast.link}>
                                    <FaExternalLinkSquare/> Podcast Homepage
                                </a>
                            </div>
                            <div className="episode-info">
                                <h1>{this.props.podcast.episodes[guid].title}</h1>
                                <h2>{new Date(this.props.podcast.episodes[guid].published).toDateString()}</h2>
                                <br/>
                                <div className="episode-description">
                                    <p dangerouslySetInnerHTML={this.setDescriptionMarkUp(this.props.podcast.episodes[guid].description)}></p>
                                </div>
                            </div>
                            {this.props.podcast.episodes && <MoreList isHome={false} guid={guid}/>}
                        </React.Fragment>
                    }
                </div>
                {this.props.podcast ? <Player key={guid} episodeInfo={this.props.podcast.episodes[guid]}/> : null}
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