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

// By default, a collapsible Panel will toggle on enter.  To override this behavior--e.g. if the Panel is
// inside a form which should submit on enter, pass in the function that you'd like to trigger on enter
// as the onEnter prop.

export interface PanelOwnProps {
  style?: string;
  headerText: string;
  content: JSX.Element | string;
  openByDefault?: boolean;
  collapsible?: boolean;
  onEnter?: () => any;
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
    this.overrideEnter = this.overrideEnter.bind(this);
    this.state = { display: this.calculateDisplay(props) };
  }

  calculateDisplay(props: PanelOwnProps): string {
    let display: string;
    // If the panel isn't collapsible, that overrides everything else.
    if (!props.collapsible) {
      display = "";
    }
    else {
      display = props.openByDefault ? "" : "collapse";
    }
    return display;
  }

  toggle(e) {
    e.preventDefault();
    let display = this.state.display === "collapse" ? "" : "collapse";
    this.setState({ display });
  }

  overrideEnter(e) {
    this.props.onEnter && this.props.onEnter();
  }

  componentWillReceiveProps(newProps) {
    this.setState({...this.state, display: this.calculateDisplay(newProps)});
  }

  renderHeader(): JSX.Element {
    let title = <span className="panel-title">{this.props.headerText}</span>;
    let iconName = this.state.display === "collapse" ? "down-icon" : "up-icon";
    let icon = this.props.collapsible ? <GenericWedgeIcon className={`${iconName} icon`} /> : null;

    return React.createElement(
      this.props.collapsible ? "button" : "div",
      {
        className: "panel-heading",
        onClick: this.props.collapsible ? this.toggle : null,
        type: this.props.collapsible ? "button" : null
      },
      [title, icon]
    );
  }

  render(): JSX.Element {
    const staticPanel = !this.props.collapsible ? "static-panel" : "";
    return (
      <div className={`panel panel-${this.props.style} ${staticPanel}`}>
        { this.renderHeader() }
        { typeof(this.props.content) === "string" ?
          <section onSubmit={this.overrideEnter} className={`panel-body ${this.state.display}`} dangerouslySetInnerHTML={{ __html: this.props.content }} /> :
          <section onSubmit={this.overrideEnter} className={`panel-body ${this.state.display}`}>{this.props.content}</section>
        }
      </div>
    );
  }
}
