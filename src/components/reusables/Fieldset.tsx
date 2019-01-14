import * as React from "react";

export interface FieldsetProps {
  legend: string;
  elements: Array<JSX.Element>;
  labelClass?: string;
  labelText?: string;
}

export default class Fieldset extends React.Component<FieldsetProps, void> {
  render(): JSX.Element {
    return(
      <fieldset className="form-group well">
        <legend>
          <span>{this.props.legend}</span>
          {
            this.props.labelText &&
            <label className={`label label-${this.props.labelClass || "default"}`}>{this.props.labelText}</label>
          }
        </legend>
        {this.props.elements}
      </fieldset>
    );
  }
}
