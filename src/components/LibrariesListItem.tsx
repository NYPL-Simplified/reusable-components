import * as React from "react";
import { LibraryData } from "../interfaces";


export interface LibrariesListItemProps {
  library: LibraryData;
}

export default class LibrariesListItem extends React.Component<LibrariesListItemProps, void> {
  render(): JSX.Element {
    return(
      <a href="#" className="list-group-item">{this.props.library.name}</a>
    )
  }
}
