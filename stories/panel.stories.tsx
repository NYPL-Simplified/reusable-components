import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Panel from '../src/components/Panel';

const panelContent = <div>Simple panel text</div>;
const panel = storiesOf('Components/Panel', module)
  .add('default', () =>
    <Panel
      headerText={text('headerText', 'Default Panel Title')}
      content={panelContent}
    />
  )
  .add('all panels with styles', () => {
    return [
      <Panel
        headerText="Default Panel"
        style={text('style', 'default')}
        content={panelContent}
      />,
      <Panel
        headerText="Success Panel"
        style="success"
        content={panelContent}
      />,
      <Panel
        headerText="Warning Panel"
        style="warning"
        content={panelContent}
      />,
      <Panel
        headerText="Danger Panel"
        style="danger"
        content={panelContent}
      />,
      <Panel
        headerText="Instruction Panel"
        style="instruction"
        content={panelContent}
      />
    ]
  });

export default panel;
