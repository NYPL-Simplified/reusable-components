import * as React from "react";

export interface LibraryStageItemProps {
  label: string;
  value: string;
}
export default class LibraryStageItem extends React.Component<LibraryStageItemProps, void> {
  render(): JSX.Element {
    return(
      <fieldset className="form-group">
        <label>{this.props.label}: {this.props.value}</label>
        <select name={this.props.label} className="form-control" defaultValue={this.props.value}>
          <option value="testing">Testing</option>
          <option value="production">Production</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </fieldset>
    );
  }
}
