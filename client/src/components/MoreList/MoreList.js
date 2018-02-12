import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Router from 'react-router-dom';

import './MoreList.css';

const ListItem = ({ id, episodeInfo }) => (
    <li>
        <Link>
            <div>
                <div className="moreList-image-container">
                    <img/>
                    <p>date</p>
                    <p>runtime</p>
                </div>
                <div className="moreList-description-container">
                    <h1>{episodeInfo.title}</h1>
                    <p>{episodeInfo.description}</p>
                </div>
            </div>
        </Link>
    </li>
);

class MoreList extends Component {

    render() {

        let listenItemArray = [];

        for(let i = 0; i < 7 && i < this.props.episodeArray.length; i++) {
            listenItemArray.push(<ListItem id={this.props.episodeArray.length - i - 1} episodeInfo={this.props.episodeArray[i]} />);
        }

        return(
            <ul className="moreList-container">
                {/* {listenItemArray} */}
                <div className="moreList-button">See More</div>
            </ul>
        );
    }
}

export default MoreList;