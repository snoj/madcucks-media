import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { podcastFetchData } from '../../actions/podcast';
import MoreList from '../MoreList/MoreList';

import './Episode.css';


class Episode extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        console.log("Mounting Episode...");
        console.log(this.props.match.params.show);
        this.props.fetchShow(this.props.match.params.show);
    }

    render() {
        if(this.props.hasErrored) {
            return(<h1>Failed to Load</h1>);
        }

        if(this.props.isLoading) {
            return(<p>Loading...</p>);
        }

        if(this.props.podcast.episodes && this.props.match.params.id >= this.props.podcast.episodes.length) {
            return(<Redirect to="/404"/>);
        }

        const numEpisodes = this.props.podcast.episodes && this.props.podcast.episodes.length;
        const id = parseInt(this.props.match.params.id);
    
        return(
            <div className="episode-container">
                {this.props.podcast.episodes &&    
                    <React.Fragment>
                        <div className="episode-image">
                            <img src={this.props.podcast.episodes[numEpisodes - id - 1].image} />
                            <a>
                                <div className="download-button">
                                    Download
                                </div>
                            </a>
                        </div>
                        <div className="episode-info">
                            <h1>{this.props.podcast.episodes[numEpisodes - id - 1].title}</h1>
                            <p>{this.props.podcast.episodes[numEpisodes - id - 1].description.replace(/<\/?.+?>/ig, '')}</p>
                        </div>
                    </React.Fragment>
                }
                <MoreList/>
            </div>
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
        fetchShow: (showName) => dispatch(podcastFetchData(showName))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Episode);