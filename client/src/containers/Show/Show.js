import React, { Component } from 'react';
import EpisodeGrid from '../../components/EpisodeGrid/EpisodeGrid';
import MoreList from '../../components/MoreList/MoreList';

const Show = ({match}) => (
    <EpisodeGrid isHome={false} showName={match.params.show} />
);


export default Show;