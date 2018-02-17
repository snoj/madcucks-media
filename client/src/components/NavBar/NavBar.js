import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default class NavBar extends Component {

    render() {
        return(
            <header className="header-container">
                <a className="logo">
                    <h1>The Bestest Podcast Network in Existence <sup>v0.1.0</sup></h1>
                    <h2>All the bestest podcasts in existence on site that cost $0.</h2>
                </a>
                <div className="navbar-button-container">
                    <ul className="navbar-button-list">
                        <Link to="/" className="navbar-button">Listen</Link>
                        <a href="https://www.patreon.com/thedickshow/posts" className="navbar-button">Patreon</a>
                        <a href="https://thedickshow.bandcamp.com/releases" className="navbar-button">Album</a>
                        <a href="https://github.com/ArmaanButt/madcucks-media/" className="navbar-button">GitHub</a>
                    </ul>
                </div>
            </header>
        );
    }
}