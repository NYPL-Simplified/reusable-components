import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Form from '../src/components/Form';

const multiLineFieldset =  (
  <fieldset className="well">
    <legend>Sample fieldset</legend>
    <input placeholder="A sample field"></input>
    <input placeholder="Another sample field"></input>
  </fieldset>
);
const singleLineFieldset = (
  <fieldset>
    <input placeholder="A field"></input><input placeholder="Another field"></input>
  </fieldset>
);
const form = storiesOf('Components/Form', module)
  .add('default', () => {
    return [
      <Form
      title="Default Form"
      onSubmit={action('clicked')}
      content={[multiLineFieldset, multiLineFieldset]}
      />
    ]
  })
  .add('with messages', () => {
    return [
      <Form
        title="With Info Message"
        onSubmit={action('clicked')}
        content={multiLineFieldset}
        infoText="Use this space to display information about the form!"
      />,
      <Form
        title="With Error Message"
        onSubmit={action('clicked')}
        content={multiLineFieldset}
        errorText="Something went wrong!"
      />,
      <Form
        title="With Success Message"
        onSubmit={action('clicked')}
        content={multiLineFieldset}
        successText="It worked!"
      />,
      <Form
        title="With Loading Message"
        onSubmit={action('clicked')}
        content={multiLineFieldset}
        loadingText="Loading..."
      />,
      <Form
        title="With Warning Message"
        onSubmit={action('clicked')}
        content={multiLineFieldset}
        warningText="This is a warning..."
      />
    ]
  })
  .add('with customized button options', () => {
    return [
      <Form
        title="With Disabled Button"
        onSubmit={action('clicked')}
        content={<p>You can pass in any element as the content prop for any Form.</p>}
        disableButton={true}
      />,
      <Form
        title="With Custom Button Style and Text"
        onSubmit={action('clicked')}
        content={[
          <p>You can also pass in an array of elements:</p>,
          <input placeholder="An input field"/>,
          <select>
            <option>Option #1</option>
            <option>Option #2</option>
            <option>Option #3</option>
          </select>,
          <label>A</label>,
          <input type="radio" />,
          <label>B</label>,
          <input type="radio" />,
          <label>C</label>,
          <input type="radio" />
        ]}
        buttonClass="centered"
        buttonContent="A centered button!"
      />,
      <Form
        title="With No Button"
        onSubmit={action('clicked')}
        infoText="You might want to use your own button element, instead of the default Button component that the Form automatically generates for you.  Just set the 'withoutButton' prop to true, and add your button to your array of elements in the 'content' prop."
        content={[
          <p>Don't forget to manually pass a callback to your button's 'onClick' function!</p>,
          <button className="custom-button" onClick={action('clicked')}>Custom Button Element</button>
        ]}
        withoutButton={true}
      />
    ]
  })
  .add('with different styles', () => {
    return [
      <Form
        title="Centered"
        onSubmit={action('clicked')}
        content={multiLineFieldset}
        className="centered"
      />,
      <Form
        title="Border"
        onSubmit={action('clicked')}
        content={
          <fieldset>
            <label>Field #1</label>
            <input />
            <label>Field #2</label>
            <input />
            <label>Field #3</label>
            <input />
          </fieldset>
        }
        className="border"
      />,
      <Form
        onSubmit={action('clicked')}
        content={singleLineFieldset}
        className="inline"
        infoText="This one has className 'inline'"
      />
    ];
  });

export default form
