import * as React from "react";
import LibrariesList from "./LibrariesList";
import { Store } from "redux";
import { State } from "../reducers/index";
import { LibrariesData, LibraryData } from "../interfaces";
import { connect } from "react-redux";
import ActionCreator from "../actions";

export interface LibrariesListContainerContext {
  store: Store<State>;
  csrfToken: string;
}

export interface LibrariesListContainerStateProps<T> {
  store?: Store<State>;
}

export interface LibrariesListContainerDispatchProps<T> {
  fetchData?: () => Promise<T>;
}

export interface LibrariesListContainerOwnProps {
  store?: Store<State>;
  csrfToken?: string;
}

export interface LibrariesListContainerProps<T> extends LibrariesListContainerDispatchProps<T>, LibrariesListContainerOwnProps {}

export default class LibrariesListContainer extends React.Component<LibrariesListContainerProps<LibrariesData>, void> {
  context: LibrariesListContainerContext;
  static contextTypes: React.ValidationMap<LibrariesListContainerContext> = {
      store: React.PropTypes.object.isRequired,
      csrfToken: React.PropTypes.string.isRequired,
  };

  render(): JSX.Element {
    return(
      <div className="libraries-list-container">
        <div>
          <LibrariesList store={this.context.store} />
        </div>
      </div>
    );
  }

}
