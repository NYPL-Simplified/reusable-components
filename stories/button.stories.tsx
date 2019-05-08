import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { PencilIcon, SearchIcon } from '@nypl/dgx-svg-icons';

import Button from '../src/components/Button';

const button = storiesOf('Components/Button', module)
  .add('with different styles', () => {
    return [
      <Button
        callback={action('clicked')}
        content="Default"
      />,
      <Button
        callback={action('clicked')}
        content="Danger"
        className="btn-danger"
      />,
      <Button
        callback={action('clicked')}
        content="Inverted"
        className="inverted"
      />,
      <Button
        callback={action('clicked')}
        content="Disabled"
        disabled={true}
      />
    ];
  })
  .add('with icon', () => {
    return [
      <Button
        callback={action('clicked')}
        content={<span>Edit <PencilIcon /></span>}
      />,
      <Button
        callback={action('clicked')}
        className="inverted"
        content={<span>Search <SearchIcon /></span>}
      />
    ];
  })
  .add('with custom text', () => {
    return [
      <Button
        callback={action('clicked')}
      />,
      <Button
        callback={action('clicked')}
        content={text('content', 'Custom text')}
      />
    ];
  });

export default button;
