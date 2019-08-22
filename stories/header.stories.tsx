import * as React from "react";
import { storiesOf } from "@storybook/react";

import Header from "../src/components/Header";

const header = storiesOf("Components/Header", module)
  .add("with title", () =>
    <Header text="SimplyE" />
  )
  .add("with logout link", () =>
    <Header text="SimplyE" loggedIn={true} logOut="#" />
  )
  .add("with navigation", () =>
    <Header
      text="SimplyE"
      loggedIn={true}
      logOut="#"
      nav={
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/account">account</a></li>
          <li><a href="/misc">misc</a></li>
        </ul>
      }
    />
  );

export default header;
