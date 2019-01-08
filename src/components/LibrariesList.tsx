import * as React from "react";
import { PanelGroup } from "react-bootstrap";
import { Store, Reducer } from "redux";
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

export interface LibrariesListState {
  activeKey: string;
}

export interface LibrariesListProps extends LibrariesListStateProps, LibrariesListOwnProps, LibrariesListDispatchProps {};

export class LibrariesList extends React.Component<LibrariesListProps, LibrariesListState> {

  constructor(props: LibrariesListProps) {
    super(props);
    this.state = { activeKey: "" };
    this.isActive = this.isActive.bind(this);
    this.select = this.select.bind(this);
  }

  isActive(library: LibraryData) {
    return this.props.libraries.libraries.indexOf(library) === parseInt(this.state.activeKey);
  }

  select(idx: string) {
    let key = this.state.activeKey === idx ? "" : idx;
    this.setState({ activeKey: key});
    this.props.fetchData();
  }

  render(): JSX.Element {
    let idx = (library: LibraryData): string => {
      return `${this.props.libraries.libraries.indexOf(library)}`;
    };
    return(
      <PanelGroup activeKey={this.state.activeKey}>
        { this.props.libraries &&
          this.props.libraries.libraries.map(library =>
            <LibrariesListItem
              key={library.uuid}
              library={library}
              active={this.isActive(library)}
              store={this.props.store}
              select={() => this.select(idx(library))}
            />
          )
        }
      </PanelGroup>
    );
  }

  componentWillMount() {
    this.props.fetchData();
  }

}

function mapStateToProps(state: State, ownProps: LibrariesListOwnProps) {
  return {
    libraries: state.libraries && state.libraries.data
  };
}

function mapDispatchToProps(dispatch: Function, ownProps: LibrariesListOwnProps) {
  let actions = new ActionCreator(null, ownProps.csrfToken);
  return {
    fetchData: () => dispatch(actions.fetchLibraries())
  };
}

const ConnectedLibrariesList = connect<LibrariesListStateProps, LibrariesListDispatchProps, LibrariesListOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(LibrariesList);

export default ConnectedLibrariesList;
