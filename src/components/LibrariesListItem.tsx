import * as React from "react";
import { Panel } from "react-bootstrap";
import { LibraryData } from "../interfaces";
import LibraryDetailContainer from "./LibraryDetailContainer";
import { GenericWedgeIcon } from "@nypl/dgx-svg-icons";

export interface LibrariesListItemProps {
  library: LibraryData;
  active: boolean;
  select: (event: __React.MouseEvent) => void;
}

export default class LibrariesListItem extends React.Component<LibrariesListItemProps, void> {
  constructor(props: LibrariesListItemProps) {
    super(props);
    this.colorCode = this.colorCode.bind(this);
    this.header = this.header.bind(this);
  }

  header() {
    return (
      <button onClick={this.props.select}>
        <span>{this.props.library.name} ({this.props.library.short_name})</span>
        <GenericWedgeIcon className={this.props.active ? "up-icon" : "down-icon"} />
      </button>
    );
  }

  colorCode() {
    // If both library_stage and registry_stage are in production, background is green;
    // if at least one of them is cancelled, background is red;
    // otherwise, background is yellow.
    let stages = [this.props.library.registry_stage, this.props.library.library_stage];

    if (stages.every((stage) => stage === "production")) {
      return "success";
    } else if (stages.some((stage) => stage === "cancelled")) {
      return "danger";
    }
    return "warning";
  }

  render(): JSX.Element {
    let style = this.colorCode();

    return(
      <Panel
        bsStyle={style}
        header={this.header()}
        collapsible={true}
        expanded={this.props.active}
      >
        <LibraryDetailContainer uuid={this.props.library.uuid} toggle={this.props.select} />
      </Panel>
    );
  }
}
