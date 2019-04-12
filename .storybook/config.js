import { configure, addDecorator } from '@storybook/react';

// Automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
