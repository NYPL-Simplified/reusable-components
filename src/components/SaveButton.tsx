import * as React from "react";

export interface SaveButtonProps {
  callback: (event: __React.MouseEvent) => Promise<void>;
  text?: string;
}

export default class SaveButton extends React.Component<SaveButtonProps, void> {

  constructor(props: SaveButtonProps) {
    super(props);
  }

  render(): JSX.Element {
   let text = this.props.text || "Save";
   return (
     <button
       type="submit"
       className="btn btn-default"
       onClick={this.props.callback}
    >{text}</button>
   );
 }

}
