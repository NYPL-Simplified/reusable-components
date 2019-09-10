import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Form from '../src/components/Form';

const multiLineFieldset = (id: number) => (
  <fieldset className="well">
    <legend>Sample fieldset</legend>
    <label htmlFor={`input-${id}`}>Sample 1</label>
    <input id={`input-${id}`} placeholder="A sample field"></input>
    <label htmlFor={`input-${id + 1}`}>Sample 2</label>
    <input id={`input-${id + 1}`} placeholder="Another sample field"></input>
  </fieldset>
);
const singleLineFieldset = (
  <fieldset>
    <label htmlFor="single-input-1">Field 1</label>
    <input id="single-input-1" placeholder="A field"></input>
    <label htmlFor="single-input-2">Field 2</label>
    <input id="single-input-2" placeholder="Another field"></input>
  </fieldset>
);
const form = storiesOf('Components/Form', module)
  .add('default', () => {
    return [
      <Form
      title="Default Form"
      onSubmit={action('clicked')}
      content={[multiLineFieldset(0), multiLineFieldset(2)]}
      />
    ]
  })
  .add('with messages', () => {
    return [
      <Form
        title="With Info Message"
        onSubmit={action('clicked')}
        content={multiLineFieldset(4)}
        infoText="Use this space to display information about the form!"
      />,
      <Form
        title="With Error Message"
        onSubmit={action('clicked')}
        content={multiLineFieldset(6)}
        errorText="Something went wrong!"
      />,
      <Form
        title="With Success Message"
        onSubmit={action('clicked')}
        content={multiLineFieldset(8)}
        successText="It worked!"
      />,
      <Form
        title="With Loading Message"
        onSubmit={action('clicked')}
        content={multiLineFieldset(10)}
        loadingText="Loading..."
      />,
      <Form
        title="With Warning Message"
        onSubmit={action('clicked')}
        content={multiLineFieldset(12)}
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
          <label htmlFor="input-custom">Label for field</label>,
          <input id="input-custom" placeholder="An input field"/>,
          <label htmlFor="select-options" className="block">Select an option</label>,
          <select id="select-options">
            <option>Option #1</option>
            <option>Option #2</option>
            <option>Option #3</option>
          </select>,
          <label htmlFor="a">A</label>,
          <input id="a" type="radio" />,
          <label htmlFor="b">B</label>,
          <input id="b" type="radio" />,
          <label htmlFor="c">C</label>,
          <input id="c" type="radio" />
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
        content={multiLineFieldset(14)}
        className="centered"
      />,
      <Form
        title="Border"
        onSubmit={action('clicked')}
        content={
          <fieldset>
            <label htmlFor="border-1">Field #1</label>
            <input id="border-1" />
            <label htmlFor="border-2">Field #2</label>
            <input id="border-2" />
            <label htmlFor="border-3">Field #3</label>
            <input id="border-3" />
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
