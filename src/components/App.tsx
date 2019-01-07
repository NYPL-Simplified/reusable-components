import * as React from "react";
import Header from "./Header";
import LibrariesListContainer from "./LibrariesListContainer";

export default class App extends React.Component<void, void> {

  render(): JSX.Element {
    return(
      <div id="main-app-component">
        <Header />
        <LibrariesListContainer />
      </div>
    );
  }
}
