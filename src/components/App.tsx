import * as React from "react";
import WelcomePage from "./WelcomePage";
import LibrariesListContainer from "./LibrariesListContainer";

export default class App extends React.Component<void, void> {

  render(): JSX.Element {
    return(
      <div id="main-app-component">
          <WelcomePage />
          <LibrariesListContainer />
      </div>
    );
  }
}
