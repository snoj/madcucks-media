import React from 'react';
import EpisodeGrid from '../../components/EpisodeGrid/EpisodeGrid';

const Show = ({match}) => (
    <EpisodeGrid isHome={false} showName={match.params.show} />
);

export default Show;