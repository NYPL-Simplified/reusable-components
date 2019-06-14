import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Form from '../src/components/Form';

const fieldset =  (
  <fieldset className="well">
    <legend>Some input fields</legend>
    <input placeholder="A field"></input>
    <input placeholder="Another field"></input>
  </fieldset>
);
const form = storiesOf('Components/Form', module)
  .add('default', () => {
    return [
      <Form
      title="Default Form"
      onSubmit={() => {}}
      content={fieldset}
      />
    ]
  })
  .add('with messages', () => {
    return [
      <Form
        title="With Info Message"
        onSubmit={() => {}}
        content={fieldset}
        infoText="Use this space to display information about the form!"
      />,
      <Form
        title="With Error Message"
        onSubmit={() => {}}
        content={fieldset}
        errorText="Something went wrong!"
      />,
      <Form
        title="With Success Message"
        onSubmit={() => {}}
        content={fieldset}
        successText="It worked!"
      />
    ]
  })
  .add('with customized button options', () => {
    return [
      <Form
        title="With Disabled Button"
        onSubmit={() => {}}
        content={fieldset}
        disableButton={true}
      />,
      <Form
        title="With Custom Button Style and Text"
        onSubmit={() => {}}
        content={fieldset}
        buttonClass="centered"
        buttonContent="This one has a centered button!"
      />
    ]
  })
  .add('with different styles', () => {
    return [
      <Form
        title="Log In"
        infoText="Passing in className 'log-in' gives you a centered form with a centered button!"
        onSubmit={() => {}}
        content={fieldset}
        className="log-in"
      />,
      <Form
        onSubmit={() => {}}
        content={<div className="form-group"><input className="form-control"></input></div>}
        className="inline"
        successText="This one has className 'inline'"
      />
    ];
  });

export default form
