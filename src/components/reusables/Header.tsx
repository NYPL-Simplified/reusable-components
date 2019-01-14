import * as React from "react";

export interface HeaderProps {
  text?: string;
  imgSrc?: string;
  alt?: string;
}

export default class Header extends React.Component<HeaderProps, void> {
  render(): JSX.Element {
    let src = this.props.imgSrc ? require(`${this.props.imgSrc}`) : "";
    return(
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <span>{this.props.text}</span>
          <img className="navbar-brand img-rounded" alt={this.props.alt} src={src} />
        </div>
      </nav>
    );
  }
}
