import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Router from 'react-router-dom';

import { fetchAllShowsInfo } from '../../actions/allShowsInfo';

import './MoreList.css';

const ListItem = ({ title, description, imgSrc, url}) => (
    <li>
        <Link to={url}>
            <div className="moreList-image-container">
                <img src={imgSrc}/>
            </div>
            <div className="moreList-description-container">
                <h1>{title}</h1>
                <p>{description}</p>
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


    isHome() {
        let listenItemArray = [];

        for(let i = 0; i < 7; i++) {
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

    episodeList() {

        let listenItemArray = [];

        for(let i = 0; i < this.props.allShowsInfo.data.length; i++) {
            listenItemArray.push(<ListItem key={i}/>);
        }

        return(
            <ul className="moreList-container moreList-episode">
                {listenItemArray}
                <Link to="/shows/" className="moreList-button">See More</Link>
            </ul>
        );
    }

    render() {

        if(this.props.isHome && this.props.allShowsInfo.data) {
            return(this.isHome());
        } else if(!this.props.isHome) {
            return(this.episodeList());
        } else {
            return(
                <p>Loading...</p>
            );
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        allShowsInfo: state.allShowsInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllShowsInfo: () => dispatch(fetchAllShowsInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreList);