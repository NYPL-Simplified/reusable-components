import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Header from '../src/components/Header';

const header = storiesOf('Components/Header', module)
  .add('with title', () =>
    <Header text="SimplyE" />
  )
  .add('with logout link', () =>
    <Header text="SimplyE" loggedIn={true} />
  );

export default header;
