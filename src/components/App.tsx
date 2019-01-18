import * as React from "react";
import Header from "./reusables/Header";
import LibrariesListContainer from "./LibrariesListContainer";

export default class App extends React.Component<void, void> {

  render(): JSX.Element {
    return(
      <div id="main-app-component">
        <Header text="Library Registry Interface" imgSrc="./logo.png" alt="SimplyE" />
        <LibrariesListContainer />
      </div>
    );
  }
}
