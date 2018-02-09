import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Thumbnail.css';

export default class Thumbnail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Link className="thumbnail-container" to={this.props.episodeURL}>
                <img src={this.props.imageSrc}/>
                <div>
                    <div className="thumbnail-span-heading">{this.props.title}</div>
                    <div className="thumbnail-span-subheading"></div>
                </div>
            </Link>
        );
    }
}
