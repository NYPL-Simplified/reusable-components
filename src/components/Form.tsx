import * as React from "react";
import * as ReactDOM from "react-dom";
import Button from "./Button";
import Fieldset from "./Fieldset";

export interface FormProps {
  content?: JSX.Element | Array<JSX.Element>;
  onSubmit: any;
  title?: string;
  hiddenName?: string;
  hiddenValue?: string;
  buttonContent?: string | JSX.Element;
  buttonClass?: string;
  className?: string;
  errorText?: string;
  successText?: string;
  infoText?: string;
  disableButton?: boolean;
}

export default class Form extends React.Component<FormProps, {}> {
  private messageRef = React.createRef<HTMLParagraphElement>();
  private formRef = React.createRef<HTMLFormElement>();

  constructor(props: FormProps) {
    super(props);
    this.submit = this.submit.bind(this);
    this.message = this.message.bind(this);
  }

  async submit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let form = this.formRef.current;
    const data = new (window as any).FormData(form);

    await this.props.onSubmit(data);
    if (this.messageRef.current) {
      this.messageRef.current.focus();
    }
  };

  message(text: string, type: string): JSX.Element {
    return (
      <p className={`alert alert-${type}`} role="alert" ref={this.messageRef} tabIndex={-1}>
        {text}
      </p>
    );
  }

  render(): JSX.Element {
    return(
      <form ref={this.formRef} className={`clearfix${this.props.className ? " " + this.props.className : ""}`}>
        {
          this.props.errorText && this.message(this.props.errorText, "danger")
        }
        {
          this.props.successText && !this.props.errorText && this.message(this.props.successText, "success")
        }
        {
          this.props.infoText && this.message(this.props.infoText, "info")
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
        <Button
          callback={this.submit}
          content={this.props.buttonContent && this.props.buttonContent}
          className={this.props.buttonClass && this.props.buttonClass}
          disabled={this.props.disableButton}
        />
      </form>
    );
  }
}
