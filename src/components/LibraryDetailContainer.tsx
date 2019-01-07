import * as React from "react";
import LibraryDetailPage from "./LibraryDetailPage";
import { Store } from "redux";
import { State } from "../reducers/index";
import { LibraryData } from "../interfaces";
import { connect } from "react-redux";
import ActionCreator from "../actions";

export interface LibraryDetailContainerContext {
  store: Store<State>;
}

export interface LibraryDetailContainerOwnProps {
  uuid: string;
  toggle: (event: __React.MouseEvent) => void;
}

export interface LibraryDetailContainerProps extends LibraryDetailContainerOwnProps {};

export default class LibraryDetailContainer extends React.Component<LibraryDetailContainerProps, void> {

  context: LibraryDetailContainerContext;
  static contextTypes: React.ValidationMap<LibraryDetailContainerContext> = {
      store: React.PropTypes.object.isRequired,
  };

  render(): JSX.Element {
    return(
      <div id="library-detail-container">
        <LibraryDetailPage store={this.context.store} uuid={this.props.uuid} toggle={this.props.toggle}/>
      </div>
    );
  }

}
