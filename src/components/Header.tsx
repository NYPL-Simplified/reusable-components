import * as React from "react";
import { LogoutIcon } from "@nypl/dgx-svg-icons";

export interface HeaderProps {
  text?: string;
  imgSrc?: string;
  alt?: string;
  logOut?: string;
  loggedIn?: boolean;
  /** This is expected to be a ul element or a div with an ul element. */
  nav?: JSX.Element;
}

export default class Header extends React.Component<HeaderProps, {}> {
  static defaultProps = {
    loggedIn: false,
  };

  render(): JSX.Element {
    const { imgSrc, alt, text, nav, loggedIn, logOut } = this.props;
    let src = imgSrc ? require(`${imgSrc}`) : "";
    return(
      <header className="reusable-header clearfix">
        {
          imgSrc &&
          <img className="header-brand img-rounded" alt={alt || ""} src={src} />
        }
        <span>{text}</span>
        { loggedIn &&
          <a
            className="btn header-btn big inverted"
            href={logOut}
          >
            <span>Log Out <LogoutIcon /></span>
          </a>
        }
        { nav && <nav role="navigation">{nav}</nav>}
      </header>
    );
  }
}
