import * as React from 'react';

import { storiesOf, addDecorator, addParameters } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import header from './header.stories';
import panel from './panel.stories';
import tabs from './tabs.stories';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../src/stylesheets/app.scss';

const styles = {
  padding: '20px',
};
export const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>;

addDecorator(CenterDecorator);
addDecorator(withKnobs);
addDecorator(withA11y);

storiesOf('Home', module)
  .add('introduction', () => 
    <div>
      <h2>NYPL Simplified Reusable Components</h2>
    </div>
  );

header;
panel;
tabs;