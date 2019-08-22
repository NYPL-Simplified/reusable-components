import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Panel from '../src/components/Panel';

const panelContent = <div>Simple panel text</div>;
const panel = storiesOf('Components/Panel', module)
  .addParameters({
    info: {
      text: `
        The \`Panel\` component comes with five built-in styles:
        * "success" (green)
        * "warning" (yellow)
        * "danger" (red)
        * "instruction" (blue)
        * "default" (gray)

        You can also define your own styles.  If you do not pass in a value for the
        \`style\` prop, the style will be set to "default".

        Populate the panel via the \`content\` prop. It accepts either a JSX element or an HTML string.

        To make a static (as opposed to a collapsible) \`Panel\`, set the \`collapsible\`
        prop to false. This will: remove the open/close icon; prevent the panel from
        opening/closing when the header is clicked; render the header as a div rather
        than a button; and automatically ensure that the panel is always open
        (i.e. you do not need to also set the \`openByDefault\` prop).

        By default, a collapsible \`Panel\` will toggle on enter.  To override this
        behavior--e.g. if the \`Panel\` is inside a form which should submit on enter,
        pass in the function that you'd like to trigger on enter as the \`onEnter\` prop.
        `
    },
  })
  .add('default', () =>
    <Panel
      id="default"
      headerText={text('headerText', 'Default Panel Title')}
      content={panelContent}
    />
  )
  .add('all panels with styles', () => {
    return [
      <Panel
        key="1"
        id="default"
        headerText="Default Panel"
        style={text('style', 'default')}
        content={panelContent}
      />,
      <Panel
        key="2"
        id="success"
        headerText="Success Panel"
        style="success"
        content={panelContent}
      />,
      <Panel
        key="3"
        id="warning"
        headerText="Warning Panel"
        style="warning"
        content={panelContent}
      />,
      <Panel
        key="4"
        id="danger"
        headerText="Danger Panel"
        style="danger"
        content={panelContent}
      />,
      <Panel
        key="5"
        id="instruction"
        headerText="Instruction Panel"
        style="instruction"
        content={panelContent}
      />
    ]
  })
  .add('static panel', () =>
    <Panel
      id="static"
      content={panelContent}
      headerText="Static Panel"
      collapsible={false}
    />
  );

export default panel;
