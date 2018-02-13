import React from 'react';
import EpisodeGrid from '../../components/EpisodeGrid/EpisodeGrid';
import MoreList from '../../components/MoreList/MoreList';

import './Homepage.css';

const Homepage = () => (
    <div className="homepage-container">
        <EpisodeGrid isHome={true}/>
        <MoreList isHome={true}/>
    </div>    
);



export default Homepage;