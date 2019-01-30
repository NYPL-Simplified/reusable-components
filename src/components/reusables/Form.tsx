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
  className?: string;
  errorText?: string;
}

export default class Form extends React.Component<FormProps, void> {

  constructor(props: FormProps) {
    super(props);
    this.submit = this.submit.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }

  submit(event: __React.MouseEvent): void {
    event.preventDefault();
    let form = (this.refs["form"] as any);
    const data = new (window as any).FormData(form);
    this.props.onSubmit(data);
  };

  errorMessage(errorText: string): JSX.Element {
    return(
      <p className="alert alert-danger" role="alert">
        Error: {errorText}
      </p>
    );
  }

  render(): JSX.Element {
    return(
      <form ref="form" className={`clearfix${this.props.className ? " " + this.props.className : ""}`}>
        {
          this.props.errorText && this.errorMessage(this.props.errorText)
        }
        { this.props.title &&
          <label className="form-title">{this.props.title}</label>
        }
        { this.props.hiddenName &&
          <input
            type="hidden"
            name={this.props.hiddenName}
            value={this.props.hiddenValue}
          />
        }
        { this.props.content }
        <br />
        <SubmitButton
          callback={this.submit}
          text={this.props.buttonText && this.props.buttonText}
        />
      </form>
    );
  }
}
