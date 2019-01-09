import * as React from "react";
import Panel from "./Panel";
import { Store } from "redux";
import { State } from "../reducers/index";
import { LibraryData } from "../interfaces";
import LibraryDetailPage from "./LibraryDetailPage";
import { GenericWedgeIcon } from "@nypl/dgx-svg-icons";

export interface LibrariesListItemProps {
  library: LibraryData;
  store: Store<State>;
}

export interface LibrariesListItemState {
  color: string;
}

export default class LibrariesListItem extends React.Component<LibrariesListItemProps, LibrariesListItemState> {
  constructor(props: LibrariesListItemProps) {
    super(props);
    this.state = { color: this.colorCode(this.props.library.library_stage, this.props.library.registry_stage) };
    this.colorCode = this.colorCode.bind(this);
    this.updateColor = this.updateColor.bind(this);
    this.body = this.body.bind(this);
  }

  body() {
    return (
        <LibraryDetailPage
          uuid={this.props.library.uuid}
          library={this.props.library}
          updateColor={this.updateColor}
          store={this.props.store}
        />
    );
  }

  updateColor(library_stage: string, registry_stage: string): void {
      let color = this.colorCode(library_stage, registry_stage);
      this.setState({ color: color });
  }

  colorCode(library_stage: string, registry_stage: string): string {
    // If both library_stage and registry_stage are in production, background is green;
    // if at least one of them is cancelled, background is red;
    // otherwise, background is yellow.

    let stages = [library_stage, registry_stage];
    if (stages.every((stage) => stage === "production")) {
      return "success";
    } else if (stages.some((stage) => stage === "cancelled")) {
      return "danger";
    }
    return "warning";
  }

  render(): JSX.Element {
    let style = this.state.color;
    let headerText = `${this.props.library.name} (${this.props.library.short_name})`;

    return(
      <Panel style={style} headerText={headerText} body={this.body()} />
    );
  }
}
