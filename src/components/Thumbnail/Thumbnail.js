import React, { Component } from 'react';
import './Thumbnail.css';

export default class Thumbnail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="thumbnail-container">
                <img src={this.props.imageSrc}/>
                <div>
                    <div className="thumbnail-span-heading">{this.props.title}</div>
                    <div className="thumbnail-span-subheading">Subheading</div>
                </div>
            </div>
        );
    }
}