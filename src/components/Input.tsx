import * as React from "react";

export interface InputProps {
  type?: string;
  name: string;
  label: string;
}

export default class Input extends React.Component<InputProps, any> {
  render(): JSX.Element {
    return(
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input className="form-control" type={this.props.type || "text"} name={this.props.name} id={this.props.name} />
      </div>
    );
  };
}
