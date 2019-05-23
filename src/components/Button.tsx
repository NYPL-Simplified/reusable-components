import * as React from "react";

export interface ButtonProps {
  /** The action to perform on the <button>'s onClick function */
  callback: (event: React.MouseEvent) => void;
  content?: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  type?: string;
}

export default class Button extends React.Component<ButtonProps, {}> {

  constructor(props: ButtonProps) {
    super(props);
  }

  render(): JSX.Element {
   let content = this.props.content || "Submit";
   let className = `btn${this.props.className ? ` ${this.props.className}` : ""}`;
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

}
