import * as React from "react";
import { Jumbotron } from "react-bootstrap";

export default class WelcomePage extends React.Component<void, void> {

  render(): JSX.Element {
    return(
      <div className="welcome-page">
        <Jumbotron>
          <h2>Welcome to the library registry interface!!!</h2>
        </Jumbotron>
      </div>
    );
  }
}
