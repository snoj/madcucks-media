import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Thumbnail.css';

class DateConverter extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let publishedDate = new Date(this.props.date);
        let diff = (Date.now() - publishedDate)/(1000 * 60);
        let result = '';

        if(diff < 60) {
            result = Math.floor(diff).toString(10) + " minutes ago";
        } else if(diff/60 < 24) {
            result = Math.floor(diff/60).toString(10) + " hours ago";
        } else if(diff/(60 * 24) < 2){
            result = Math.floor(diff/(60 * 24)).toString(10) + " day ago";
        } else {
            result = Math.floor(diff/(60 * 24)).toString(10) + " days ago";
        }

        return(
            <React.Fragment>{result}</React.Fragment>
        );
    }
}

export default class Thumbnail extends Component {
    constructor(props) {
        super(props);
    }

    convertDate(publishedDate) {
        publishedDate = new Date(publishedDate);
        let diff = (Date.now() - publishedDate)/(1000 * 60);

        if(diff < 60) {
            return Math.floor(diff).toString(10) + " minutes ago";
        } else if(diff/60 < 2) {
            return Math.floor(diff/60).toString(10) + " hour ago";
        } else if(diff/60 < 24) {
            return Math.floor(diff/60).toString(10) + " hours ago";
        } else if(diff/(60 * 24) < 2){
            return Math.floor(diff/(60 * 24)).toString(10) + " day ago";
        } else if(diff/(60 * 24) < 30){
            return Math.floor(diff/(60 * 24)).toString(10) + " days ago";
        } else if(diff/(60 * 24 * 30) < 2){
            return Math.floor(diff/(60 * 24 * 30)).toString(10) + " month ago";
        } else if(diff/(60 * 24 * 30) < 12){
            return Math.floor(diff/(60 * 24 * 30)).toString(10) + " months ago";
        } else if(diff/(60 * 24 * 30 * 12) < 2){
            return Math.floor(diff/(60 * 24 * 30 * 12)).toString(10) + " year ago";
        } else {
            return Math.floor(diff/(60 * 24 * 30 * 12)).toString(10) + " years ago";
        }

    }

    render() {
        return(
            <div className="thumbnail-container">
                <Link to={this.props.episodeURL}>
                    <img src={this.props.imageSrc}/>
                </Link>
                <div className="thumbnail-info-container">
                    <div className="thumbnail-span-heading">{this.props.title}</div>
                    <div className="thumbnail-span-subheading">{this.props.duration} / {this.convertDate(this.props.date)}</div>
                </div>
            </div>
            
            
        );
    }
}
