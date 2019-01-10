import * as React from "react";
import SaveButton from "./SaveButton";

export interface FormProps {
  content: Array<JSX.Element>;
  onSubmit: any;
  hiddenName?: string;
  hiddenValue?: string;
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
        <input
          type="hidden"
          name={this.props.hiddenName}
          value={this.props.hiddenValue}
        />
        { this.props.content }
        <SaveButton
          callback={this.submit}
        />
      </form>
    );
  }
}
