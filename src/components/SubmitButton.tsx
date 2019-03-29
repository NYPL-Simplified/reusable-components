import * as React from "react";

export interface SubmitButtonProps {
  callback: (event: React.MouseEvent) => void;
  content?: string | Element;
  className?: string;
  disabled?: boolean;
}

export default class SubmitButton extends React.Component<SubmitButtonProps, void> {
  props: SubmitButtonProps;

  constructor(props: SubmitButtonProps) {
    super(props);
  }

  render(): Element {
   let content = this.props.content || "Submit";
   let className = this.props.className || "btn-default";
   return (
     <button
       type="submit"
       className={`btn ${className}`}
       onClick={this.props.callback}
       disabled={this.props.disabled || null}
    >{content}</button>
   );
 }

}
