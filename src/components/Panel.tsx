import * as React from "react";
import { GenericWedgeIcon } from "@nypl/dgx-svg-icons";

export interface PanelOwnProps {
  style?: string;
  headerText: string;
  body: JSX.Element;
}

export interface PanelState {
  display: string;
  icon: string;
}

export default class Panel extends React.Component<PanelOwnProps, PanelState> {
  constructor() {
    super();
    this.renderHeader = this.renderHeader.bind(this);
    this.open = this.open.bind(this);
    this.state = { display: "collapse", icon: "down-icon" };
  }

  open() {
    let display = this.state.display === "collapse" ? "" : "collapse";
    let icon = this.state.icon === "down-icon" ? "up-icon" : "down-icon";
    this.setState({ display: display, icon: icon });
  }

  renderHeader(): JSX.Element {
    return (
      <button className="panel-heading" onClick={this.open}>
        <span className="panel-title">{this.props.headerText}</span>
        <GenericWedgeIcon className={this.state.icon} />
      </button>
    );
  }

  render(): JSX.Element {
    return (
      <li className={`panel panel-${this.props.style ? this.props.style : "default"}`}>
        { this.renderHeader() }
        <section className={this.state.display}>{this.props.body}</section>
      </li>
    );
  }
}
