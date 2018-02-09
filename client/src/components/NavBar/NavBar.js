import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <header className="header-container">
                <a className="logo">
                    <h1>The Best Podcast Network in Existence</h1>
                    <h2>All the best podcasts in existence.</h2>
                </a>
                <div className="navbar-button-container">
                    <ul className="navbar-button-list">
                        <Link to="/" className="navbar-button">Listen</Link>
                        <Link to="/" className="navbar-button">Interact</Link>
                        <Link to="/" className="navbar-button">Account</Link>
                    </ul>
                </div>
            </header>
        );
    }
}