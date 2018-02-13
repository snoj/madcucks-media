import React, { Component } from 'react';
import Audio from 'react-audioplayer';
import './Player.css';



export default class Player extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount = () => {
    
    }

    render() {
        const songObj = {
            name: "test",
            src: this.props.url
        };
        
        return(
            <footer>
                <Audio playlist={[songObj]}/>
            </footer>
        );
    }
}