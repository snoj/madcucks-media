import React from 'react';
import EpisodeGrid from '../../components/EpisodeGrid/EpisodeGrid';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

const Show = ({match}) => (
    <ErrorBoundary>
        <EpisodeGrid isHome={false} showName={match.params.show} />
    </ErrorBoundary>
);

export default Show;