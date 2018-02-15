import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllShowsInfo } from '../../actions/allShowsInfo';

import './MoreList.css';

const ListItem = ({ title, description, imgSrc, url}) => (
    <li>
        <Link to={url}>
            <div className="moreList-image-container">
                <img src={imgSrc} alt=""/>
            </div>
            <div className="moreList-description-container">
                <h1>{title}</h1>
                <p>{description.replace(/<\/?.+?>/ig, '').slice(0,200) + "..."}</p>
            </div>
        </Link>
    </li>
);

class MoreList extends Component {

    componentWillMount() {
        if(this.props.isHome) {
            this.props.fetchAllShowsInfo();
        }
    }


    isHome = () => {
        let listenItemArray = [];

        for(let i = 0; i < this.props.allShowsInfo.data.length; i++) {
            listenItemArray.push(
                <ListItem key={i} 
                    title={this.props.allShowsInfo.data[i].title}
                    description={this.props.allShowsInfo.data[i].description.long}
                    imgSrc={this.props.allShowsInfo.data[i].image}
                    url={"/shows/" + this.props.allShowsInfo.data[i].showName}
                />
            );
        }

        return(
            <ul className="moreList-container">
                {listenItemArray}
            </ul>
        );
    }

    episodeList = (guid) => {

        let listenItemArray = [];

        for(let key in this.props.podcast.episodes) {
            if(listenItemArray.length > 5) {
                break;
            } else if (key === guid){
                continue;

            } else {
                let episode = this.props.podcast.episodes[key];
                listenItemArray.push(
                    <ListItem key={key} 
                        title={episode.title}
                        description={episode.description}
                        imgSrc={episode.image ? episode.image:this.props.podcast.image}
                        url={"/shows/" + this.props.podcast.showName + "/" + key}
                    />
                );
            }
        }

        return(
            <div className="moreList-container">
                <ul >
                    {listenItemArray}
                </ul>
                <Link to={"/shows/" + this.props.podcast.showName}>
                    <div className="moreList-button">
                        See More
                    </div>
                </Link>
            </div>
        );
    }

    render() {

        if(this.props.isHome && this.props.allShowsInfo.data) {
            return(this.isHome());
        } else if(!this.props.isHome && !this.props.isLoading && !this.props.hasErrored) {
            return(this.episodeList(this.props.guid));
        } else {
            return(
                <p>Loading...</p>
            );
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        allShowsInfo: state.allShowsInfo,
        podcast: state.podcastFetchDataSuccess,
        hasErrored: state.podcastHasErrored,
        isLoading: state.podcastIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllShowsInfo: () => dispatch(fetchAllShowsInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreList);