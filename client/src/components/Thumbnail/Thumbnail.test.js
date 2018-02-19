import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Thumbnail from './Thumbnail';

describe(Thumbnail, () => {
    
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Thumbnail />, div);
    ReactDOM.unmountComponentAtNode(div);
});