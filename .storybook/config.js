import * as React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../src/stylesheets/app.scss';
import './storybook.scss';

const styles = {
  padding: '20px',
};
export const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>;

addDecorator(withInfo);
addDecorator(CenterDecorator);
addDecorator(withKnobs);
addDecorator(withA11y);

// Automatically import all files ending in *.stories.tsx but first
// load the introduction story.
const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  require('../stories/index.stories');
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
