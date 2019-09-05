import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import Input from "../src/components/Input";

const input = storiesOf("Components/Input", module)
  .add("default", () =>
    <Input
      label="A label"
      name="inputName"
      id="inputId"
      placeholder="some placeholder"
    />
  )
  .add("with a callback function and value", () =>
    <Input
      label="A label"
      name="inputName"
      id="inputId"
      value="initial value"
      callback={action("onChange")}
    />
  );

export default input;
