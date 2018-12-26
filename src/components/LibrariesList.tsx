import * as React from "react";
import { Store } from "redux";
import { State } from "../reducers/index";
import { LibrariesData, LibraryData } from "../interfaces";
import { connect } from "react-redux";
import ActionCreator from "../actions";
import LibrariesListItem from "./LibrariesListItem";

export interface LibrariesListStateProps {
  libraries?: LibrariesData;
}

export interface LibrariesListOwnProps {
  store?: Store<State>;
  csrfToken?: string;
}

export interface LibrariesListDispatchProps {
  fetchData: () => Promise<LibrariesData>;
}

export interface LibrariesListProps extends LibrariesListStateProps, LibrariesListOwnProps, LibrariesListDispatchProps {};

export class LibrariesList extends React.Component<LibrariesListProps, void> {

  render(): JSX.Element {
    return(
      <div id="list" className="list-group">
        { this.props.libraries &&
          this.props.libraries.libraries.map(library =>
            <LibrariesListItem library={library} />
          )
        }
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchData();
  }

}

function mapStateToProps(state, ownProps) {
  return {
    libraries: state.editor.libraries && state.editor.libraries.data
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  let actions = new ActionCreator(null, ownProps.csrfToken);
  return {
    fetchData: () => dispatch(actions.fetchLibraries()),
  };
}

const ConnectedLibrariesList = connect<LibrariesListStateProps, LibrariesListDispatchProps, LibrariesListOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(LibrariesList);

export default ConnectedLibrariesList;
