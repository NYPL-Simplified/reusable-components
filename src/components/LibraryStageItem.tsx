import * as React from "react";

export interface LibraryStageItemProps {
  label: string;
  value: string;
}
export default class LibraryStageItem extends React.Component<LibraryStageItemProps, void> {
  render(): JSX.Element {
    let colors = {
      "testing": "warning",
      "production": "success",
      "cancelled": "danger"
    };

    return(
      <fieldset className="form-group well">
        <legend>
          <span>Current {this.props.label}:</span>
          <label className={`label label-${colors[this.props.value]}`}>{this.props.value}</label>
        </legend>
        <select name={this.props.label} defaultValue={this.props.value}>
          <option value="testing">Testing</option>
          <option value="production">Production</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </fieldset>
    );
  }
}
