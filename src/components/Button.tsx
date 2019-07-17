import * as React from "react";

export interface ButtonProps {
  /** The action to perform on the <button>'s onClick function */
  callback: (event: React.MouseEvent) => void;
  content?: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  type?: string;
  mouseDown?: boolean;
}

export default class Button extends React.Component<ButtonProps, {}> {
  static defaultProps = {
    mouseDown: false
  };

  constructor(props: ButtonProps) {
    super(props);
  }

  render(): JSX.Element {
   let content = this.props.content || "Submit";
   let className = `btn${this.props.className ? ` ${this.props.className}` : ""}`;
   let buttonProps = {
     type: (this.props.type || "submit"),
     className: className,
     disabled: (this.props.disabled || null),
   };
   let callback = this.props.mouseDown ? {onMouseDown: this.props.callback} : {onClick: this.props.callback};
   return React.createElement(
     "button",
     {...buttonProps, ...callback},
     content
   );
 }

}
