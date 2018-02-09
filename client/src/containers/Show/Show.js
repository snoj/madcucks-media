import React, { Component } from 'react';
import EpisodeGrid from '../../components/EpisodeGrid/EpisodeGrid';

const Show = ({match}) => (
    <React.Fragment>
        <EpisodeGrid showName={match.params.show} />
    </React.Fragment>
);


export default Show;