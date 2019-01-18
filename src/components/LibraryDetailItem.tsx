import * as React from "react";

export interface LibraryDetailItemProps {
  label: string;
  value: string;
}
export default class LibraryDetailItem extends React.Component<LibraryDetailItemProps, void> {
  render(): JSX.Element {
    return(
      <li className="list-group-item">
        <label className="control-label">{this.props.label}:</label>
        <span className="">{this.props.value}</span>
      </li>
    );
  }
}
