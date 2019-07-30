import * as React from "react";
import { LogoutIcon } from "@nypl/dgx-svg-icons";

export interface HeaderProps {
  text?: string;
  imgSrc?: string;
  alt?: string;
  logOut?: string;
  loggedIn?: boolean;
}

export default class Header extends React.Component<HeaderProps, {}> {
  static defaultProps = {
    loggedIn: false,
  };

  render(): JSX.Element {
    let src = this.props.imgSrc ? require(`${this.props.imgSrc}`) : "";
    return(
      <nav className="reusable-navbar navbar-default clearfix">
        <div className="navbar-header">
          <span>{this.props.text}</span>
          {
            this.props.imgSrc &&
            <img className="navbar-brand img-rounded" alt={this.props.alt || ""} src={src} />
          }
        </div>
        { this.props.loggedIn &&
          <a
            className="btn navbar-btn big inverted"
            href={this.props.logOut}
          >
            <span>Log Out <LogoutIcon /></span>
          </a>
        }
      </nav>
    );
  }
}
