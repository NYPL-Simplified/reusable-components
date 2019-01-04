import * as React from "react";
import { Panel } from "react-bootstrap";
import { LibraryData } from "../interfaces";
import LibraryDetailContainer from "./LibraryDetailContainer";
import { GenericWedgeIcon } from "@nypl/dgx-svg-icons";

export interface LibrariesListItemProps {
  library: LibraryData;
  active: boolean;
  select: (idx: string) => void;
  idx: string;
}
export interface LibrariesListItemState {
  open: boolean;
}

export default class LibrariesListItem extends React.Component<LibrariesListItemProps, LibrariesListItemState> {
  constructor(props: LibrariesListItemProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.colorCode = this.colorCode.bind(this);
  }

  toggle() {
    // If it's already open, just close everything.
    let idx = this.props.active ? "" : this.props.idx;
    this.props.select(idx);
  }

  header() {
    return (
      <div onClick={this.toggle}>
        <span>{this.props.library.name} ({this.props.library.short_name})</span>
        <GenericWedgeIcon className={this.props.active ? "up-icon" : "down-icon"} />
      </div>
    );
  }

  colorCode() {
    // If both stages are in production, background is green;
    // if at least one stage is cancelled, background is red;
    // otherwise, background is yellow.
    let stages = [this.props.library.registry_stage, this.props.library.library_stage];

    if (stages.every((stage) => stage === "production")) {
      return "success";
    }
    else if (stages.some((stage) => stage === "cancelled")) {
      return "danger";
    }
    else {
      return "warning";
    }
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
        { this.props.active &&
          <LibraryDetailContainer uuid={this.props.library.uuid} toggle={this.toggle} />
        }
      </Panel>
    );
  }
}
