import * as React from "react";

export interface SubmitButtonProps {
  callback: (event: __React.MouseEvent) => void;
  text?: string;
}

export default class SubmitButton extends React.Component<SubmitButtonProps, void> {

  constructor(props: SubmitButtonProps) {
    super(props);
  }

  render(): JSX.Element {
   let text = this.props.text || "Submit";
   return (
     <button
       type="submit"
       className="btn btn-default"
       onClick={this.props.callback}
    >{text}</button>
   );
 }

}
