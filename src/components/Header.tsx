import * as React from "react";

export default class Header extends React.Component<void, void> {

  render(): JSX.Element {
    return(
      <nav className="navbar navbar-default">
        <span className="navbar-brand">Welcome to the library registry interface!</span>
      </nav>
    );
  }
}
