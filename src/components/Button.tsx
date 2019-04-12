import * as React from "react";
import { Link } from "react-router-dom";

export interface ButtonProps {
  callback?: (event: React.MouseEvent) => void;
  content?: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  type?: string;
  href?: string;
}

export default class Button extends React.Component<ButtonProps, {}> {

  constructor(props: ButtonProps) {
    super(props);
  }

  render(): JSX.Element {
   let content = this.props.content || "Submit";
   let className = `btn ${this.props.className || "btn-default"}`;
   let element = this.props.callback ?
    this.renderButton(content, className) :
    this.renderLink(content, className);

   return element;
 }

 renderButton(content: string | JSX.Element, className: string): JSX.Element {
   return (
     <button
      type={this.props.type || "submit"}
      className={className}
      disabled={this.props.disabled || null}
      onClick={this.props.callback}
     >
      {content}
     </button>
   );
 }

 renderLink(content: string | JSX.Element, className: string): JSX.Element {
   return (
     <Link
      to={this.props.href}
      className={`${className} ${this.props.disabled ? "disabled" : ""}`}
     >
      {content}
     </Link>
   );
 }
}
