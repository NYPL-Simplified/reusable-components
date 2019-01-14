import * as React from "react";
import { LogoutIcon } from "@nypl/dgx-svg-icons";

export interface HeaderProps {
  text?: string;
  imgSrc?: string;
  logOut: string;
}

export default class Header extends React.Component<HeaderProps, void> {
  render(): JSX.Element {
    let src = this.props.imgSrc ? require(`${this.props.imgSrc}`) : "";
    return(
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <img className="navbar-brand img-rounded" alt="SimplyE" src={src} />
          <span>{this.props.text}</span>
        </div>
        <a href={this.props.logOut} className="btn navbar-btn"><LogoutIcon /></a>
      </nav>
    );
  }
}
