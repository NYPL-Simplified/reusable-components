import * as React from "react";
import * as ReactDOM from "react-dom";
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

  componentDidUpdate() {
    if (this.refs["errorMessage"]) {
      (this.refs["errorMessage"] as HTMLElement).focus();
    }
  }

  submit(event: __React.MouseEvent): void {
    event.preventDefault();
    let form = (this.refs["form"] as any);
    const data = new (window as any).FormData(form);
    this.props.onSubmit(data);
  };

  errorMessage(errorText: string): JSX.Element {
    let error = (
      <p className="alert alert-danger" role="alert" ref="errorMessage" tabIndex={-1}>
        Error: {errorText}
      </p>
    );

    return error;
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
