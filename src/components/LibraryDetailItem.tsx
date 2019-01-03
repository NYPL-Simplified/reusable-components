import * as React from "react";

export interface LibraryDetailItemProps {
  label: string;
  value: string;
}
export default class LibraryDetailItem extends React.Component<LibraryDetailItemProps, void> {
  render(): JSX.Element {
    return(
      <section className="list-group-item">
        <label className="control-label">{this.props.label}</label>
        <p className="form-control-static">{this.props.value}</p>
      </section>
    );
  }
}
