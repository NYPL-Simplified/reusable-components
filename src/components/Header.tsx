import * as React from "react";
export default class Header extends React.Component<void, void> {

  render(): JSX.Element {
    return(
      <nav className="navbar navbar-default">
        <h1 className="navbar-header">Library Registry Interface</h1>
      </nav>
    );
  }
}
