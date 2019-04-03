import * as React from "react";
import { GenericWedgeIcon } from "@nypl/dgx-svg-icons";

// The Panel component comes with five built-in styles: "success" (green),
// "warning" (yellow), "danger" (red), "instruction" (blue), and "default" (gray).
// You can also define your own styles.  If you do not pass in a value for the style prop,
// the style will be set to "default".

// Populate the panel via the content prop. It accepts either a JSX element or an HTML string.

// To make a static (as opposed to a collapsible) Panel, set the collapsible prop to false.
// This will: remove the open/close icon; prevent the panel from opening/closing when the header
// is clicked; render the header as a div rather than a button; and automatically ensure that the
// panel is always open (i.e. you do not need to also set the openByDefault prop).

export interface PanelOwnProps {
  style?: string;
  headerText: string;
  content: JSX.Element | string;
  openByDefault?: boolean;
  collapsible?: boolean;
}

export interface PanelState {
  display: string;
}

export default class Panel extends React.Component<PanelOwnProps, PanelState> {
  static defaultProps = {
    style: "default",
    collapsible: true,
    openByDefault: false
  };

  constructor(props: PanelOwnProps) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.toggle = this.toggle.bind(this);
    let display = (this.props.openByDefault || !this.props.collapsible) ? "" : "collapse";
    this.state = { display };
  }

  toggle(e) {
    e.preventDefault();
    let display = this.state.display === "collapse" ? "" : "collapse";
    this.setState({ display });
  }

  renderHeader(): JSX.Element {
    let title = <span className="panel-title">{this.props.headerText}</span>;
    let iconName = this.state.display === "collapse" ? "down-icon" : "up-icon";
    let icon = this.props.collapsible ? <GenericWedgeIcon className={`${iconName} icon`} /> : null;

    return React.createElement(
      this.props.collapsible ? "button" : "div",
      { className: "panel-heading", onClick: this.props.collapsible ? this.toggle : null },
      [title, icon]
    );
  }

  render(): JSX.Element {
    const staticPanel = !this.props.collapsible ? "static-panel" : "";
    return (
      <div className={`panel panel-${this.props.style} ${staticPanel}`}>
        { this.renderHeader() }
        { typeof(this.props.content) === "string" ?
          <section className={`panel-body ${this.state.display}`} dangerouslySetInnerHTML={{ __html: this.props.content }} /> :
          <section className={`panel-body ${this.state.display}`}>{this.props.content}</section>
        }
      </div>
    );
  }
}
