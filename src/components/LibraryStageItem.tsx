import * as React from "react";
import Fieldset from "./reusables/Fieldset";

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

    let select = (
      <select name={this.props.label} defaultValue={this.props.value}>
        <option value="testing">Testing</option>
        <option value="production">Production</option>
        <option value="cancelled">Cancelled</option>
      </select>
    );

    return(
      <Fieldset
        legend={`Current ${this.props.label}:`}
        elements={[select]}
        labelClass={colors[this.props.value]}
        labelText={this.props.value}
      />
    );
  }
}
