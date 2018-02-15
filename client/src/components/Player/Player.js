import React, { Component } from 'react';
import { connect } from 'react-redux';
import plyr from 'plyr';
import './plyr.css';
import './Player.css';

class Player extends Component {
    constructor(props) {
        super(props);
        this.player = null;
        
    }

    componentDidMount = () => {
        this.player = plyr.setup()[0];
    };

    componentWillUnmount = () => {
        this.player && this.player.destroy();
    };

    componentWillUpdate = () => {
        this.player && this.player.destroy();
        this.player = plyr.setup()[0];
    };

    render() {
        
        return(
            <footer className="player-container">
                <div className="player-episodeinfo-container">
                    <img src={this.props.episodeInfo.image} alt=""/>
                    <div>
                       <p className="title">{this.props.episodeInfo.title.trim().slice(0,50)}</p>
                       <p className="description">{this.props.episodeInfo.description.trim().replace(/<\/?.+?>/ig, '').slice(0,50)}</p>
                    </div>
                </div>
                <div className="player-audio-container">
                    <audio controls>
                        <source src={this.props.episodeInfo.enclosure.url} type="audio/mp3"/>
                    </audio>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        podcast: state.podcast
    };
};

export default connect(mapStateToProps)(Player);