import * as React from "react";

export interface InputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  className?: string;
  callback?: (e: any) => any;
  value?: any;
  checked?: boolean;
  ref?: string;
  placeholder?: string;
}

export default class Input extends React.Component<InputProps, {}> {
  static defaultProps = {
    className: "",
    type: "text",
    callback: null,
  };

  constructor(props: InputProps) {
    super(props);
  }


  render(): JSX.Element {
    return(
      <div className={`form-group ${this.props.className}`}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          onChange={this.props.callback}
          ref={this.props.ref}
          className="form-control"
          type={this.props.type}
          name={this.props.name}
          id={this.props.id}
          defaultValue={this.props.value}
          readOnly={false}
          defaultChecked={this.props.checked}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  };
}
