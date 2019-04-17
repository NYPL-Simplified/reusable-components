import * as React from "react";

export interface ButtonProps {
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
   let className = `btn ${this.props.className || "btn-default"}`;
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
