import * as React from "react";
import { GenericWedgeIcon } from "@nypl/dgx-svg-icons";

export interface PanelOwnProps {
  style?: string;
  headerText: string;
  body: JSX.Element;
}

export interface PanelState {
  display: string;
}

export default class Panel extends React.Component<PanelOwnProps, PanelState> {
  constructor(props: PanelOwnProps) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = { display: "collapse" };
  }

  toggle() {
    let display = this.state.display === "collapse" ? "" : "collapse";
    this.setState({ display });
  }

  renderHeader(): JSX.Element {
    let icon = this.state.display === "collapse" ? "down-icon" : "up-icon";
    return (
      <button className="panel-heading" onClick={this.toggle}>
        <span className="panel-title">{this.props.headerText}</span>
        <GenericWedgeIcon className={icon} />
      </button>
    );
  }

  render(): JSX.Element {
    return (
      <li className={`panel panel-${this.props.style ? this.props.style : "default"}`}>
        { this.renderHeader() }
        <section className={`panel-body ${this.state.display}`}>
          {this.props.body}
        </section>
      </li>
    );
  }
}
