import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Thumbnail.css';

export default class Thumbnail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="thumbnail-container">
                <Link to={this.props.episodeURL}>
                    <img src={this.props.imageSrc}/>
                </Link>
                <div className="thumbnail-info-container">
                    <div className="thumbnail-span-heading">{this.props.title}</div>
                    <div className="thumbnail-span-subheading">{this.props.duration}</div>
                </div>
            </div>
            
            
        );
    }
}
