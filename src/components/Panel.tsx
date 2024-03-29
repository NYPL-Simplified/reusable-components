import * as React from "react";
import { GenericWedgeIcon } from "@nypl/dgx-svg-icons";

export interface PanelOwnProps {
  id: string;
  style?: string;
  headerText: string;
  content: JSX.Element | string | null;
  openByDefault?: boolean;
  collapsible?: boolean;
  onEnter?: () => any;
  onClick?: () => void;
}

export interface PanelState {
  display: string;
}

/**
 * The Panel component comes with five built-in styles: "success" (green),
 * "warning" (yellow), "danger" (red), "instruction" (blue), and "default" (gray).
 * You can also define your own styles.  If you do not pass in a value for the style prop,
 * the style will be set to "default".
 *
 * Populate the panel via the content prop. It accepts either a JSX element or an HTML string.
 *
 * To make a static (as opposed to a collapsible) Panel, set the collapsible prop to false.
 * This will: remove the open/close icon; prevent the panel from opening/closing when the header
 * is clicked; render the header as a div rather than a button; and automatically ensure that the
 * panel is always open (i.e. you do not need to also set the openByDefault prop).
 *
 * By default, a collapsible Panel will toggle on enter.  To override this behavior--e.g. if the Panel is
 * inside a form which should submit on enter, pass in the function that you'd like to trigger on enter
 * as the onEnter prop.
 */
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
    let display = (this.props.openByDefault || !this.props.collapsible) ? "" : "collapse";
    this.state = { display };
  }

  toggle(e) {
    e.preventDefault();
    let display = this.state.display === "collapse" ? "" : "collapse";
    // This custom onClick is passed optionally through props 
    // and executes only when a user is toggling the panel.
    this.props.onClick && this.props.onClick()
    this.setState({ display });
  }

  overrideEnter(e) {
    this.props.onEnter && this.props.onEnter();
  }

  renderHeader(): JSX.Element {
    let title = <span key="title" className="panel-title">{this.props.headerText}</span>;
    let iconName = this.state.display === "collapse" ? "down-icon" : "up-icon";
    let icon = this.props.collapsible ?
      <GenericWedgeIcon key="icon" className={`${iconName} icon`} /> : null;
    let propsObject = {
      className: "panel-heading",
      onClick: this.props.collapsible ? this.toggle : null,
      type: this.props.collapsible ? "button" : null,
    };

    // Only add aria-expanded and aria-controls for collapsible panels.
    if (this.props.collapsible) {
      propsObject = Object.assign(propsObject, {
        ["aria-expanded"]: this.state.display === "",
        ["aria-controls"]: `${this.props.id}-panel`
      });
    }

    return React.createElement(
      this.props.collapsible ? "button" : "div",
      propsObject,
      [title, icon]
    );
  }

  render(): JSX.Element {
    const { style, content, collapsible, id } = this.props;
    const staticPanel = !collapsible ? "static-panel" : "";
    // Only add the aria-hidden attribute for collapsible panels.
    const ariaHidden = collapsible ? this.state.display !== "" : null;
    return (
      <div className={`panel panel-${style} ${staticPanel}`}>
        { this.renderHeader() }
        { typeof(content) === "string" ?
          <section
            id={`${id}-panel`}
            onSubmit={this.overrideEnter}
            className={`panel-body ${this.state.display}`}
            dangerouslySetInnerHTML={{ __html: content }}
            aria-hidden={ariaHidden}
          /> :
          <section
            id={`${id}-panel`}
            onSubmit={this.overrideEnter}
            className={`panel-body ${this.state.display}`}
            aria-hidden={ariaHidden}
          >
            {content}
          </section>
        }
      </div>
    );
  }
}
