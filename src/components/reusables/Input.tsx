import * as React from "react";

export interface InputProps {
  type?: string;
  name: string;
  label: string;
}

export default class Input extends React.Component<InputProps, void> {
  render(): JSX.Element {
    return(
      <div className="form-group">
        <label>{this.props.label}</label>
        <input className="form-control" type={this.props.type || "text"} name={this.props.name} />
      </div>
    );
  };
}
