import * as React from "react";
import LibrariesList from "./LibrariesList";
import { Store } from "redux";
import { State } from "../reducers/index";
import { LibrariesData, LibraryData } from "../interfaces";
import { connect } from "react-redux";
import ActionCreator from "../actions";

export interface LibrariesListContainerContext {
  store: Store<State>;
  csrfToken?: string;
}

export default class LibrariesListContainer extends React.Component<void, void> {
  context: LibrariesListContainerContext;
  static contextTypes: React.ValidationMap<LibrariesListContainerContext> = {
    store: React.PropTypes.object.isRequired
  };

  render(): JSX.Element {
    return(
      <LibrariesList store={this.context.store} />
    );
  }

}
