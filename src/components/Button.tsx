import * as React from "react";

export interface ButtonProps {
  callback: (event: __React.MouseEvent) => void;
  content?: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  type?: string;
}

export default class Button extends React.Component<ButtonProps, void> {

  constructor(props: ButtonProps) {
    super(props);
  }

  render(): JSX.Element {
   let content = this.props.content || "Submit";
   let className = this.props.className || "btn-default";
   return (
     <button
       type={this.props.type || "submit"}
       className={`btn ${className}`}
       onClick={this.props.callback}
       disabled={this.props.disabled || null}
    >{content}</button>
   );
 }

}
