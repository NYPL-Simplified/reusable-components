import * as React from "react";
import SubmitButton from "./SubmitButton";
import Fieldset from "./Fieldset";

export interface FormProps {
  content: Array<JSX.Element>;
  onSubmit: any;
  title?: string;
  hiddenName?: string;
  hiddenValue?: string;
  buttonText?: string;
}

export default class Form extends React.Component<FormProps, void> {

  constructor(props: FormProps) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(event: __React.MouseEvent): any {
    event.preventDefault();
    let form = (this.refs["form"] as any);
    const data = new (window as any).FormData(form);
    this.props.onSubmit(data);
  };

  render(): JSX.Element {
    return(
      <form ref="form">
        { this.props.title &&
          <label className="form-title">{this.props.title}</label>
        }
        <input
          type="hidden"
          name={this.props.hiddenName}
          value={this.props.hiddenValue}
        />
        { this.props.content }
        <SubmitButton
          callback={this.submit}
          text={this.props.buttonText && this.props.buttonText}
        />
      </form>
    );
  }
}
