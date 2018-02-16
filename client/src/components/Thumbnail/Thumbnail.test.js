import React from 'react';
import ReactDOM from 'react-dom';
import Thumbnail from './Thumbnail';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Thumbnail />, div);
    ReactDOM.unmountComponentAtNode(div);
});