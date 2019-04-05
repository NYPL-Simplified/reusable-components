import * as React from "react";

export interface ButtonProps {
  callback?: (event: __React.MouseEvent) => void;
  content?: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  type?: string;
  href?: string;
}

export default class Button extends React.Component<ButtonProps, void> {

  constructor(props: ButtonProps) {
    super(props);
  }

  render(): JSX.Element {
   let content = this.props.content || "Submit";
   let type = this.props.callback ? (this.props.type || "submit") : null;
   let className = this.props.className || "btn-default";
   let elementType = this.props.href ? "a" : "button";

   let props = {
     type: type,
     onClick: this.props.callback,
     disabled: (this.props.disabled || null),
     className: `btn ${className}`
   };
   this.props.href && (props["href"] = this.props.href);

   return React.createElement(
     elementType,
     props,
     content
   );
 }

}
