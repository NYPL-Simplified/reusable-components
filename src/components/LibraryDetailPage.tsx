import * as React from "react";
import { LibraryData } from "../interfaces";
import { connect } from "react-redux";
import ActionCreator from "../actions";
import { Store } from "redux";
import { State } from "../reducers/index";
import LibraryDetailItem from "./LibraryDetailItem";
import LibraryStageItem from "./LibraryStageItem";
import SaveButton from "./SaveButton";

export interface LibraryDetailPageStateProps {
  fullLibrary?: LibraryData;
}

export interface LibraryDetailPageDispatchProps {
  fetchData: () => Promise<LibraryData>;
  editStages: (data: FormData) => Promise<void>;
}

export interface LibraryDetailPageOwnProps {
  store?: Store<State>;
  uuid: string;
  toggle: () => void;
}

export interface LibraryDetailPageProps extends LibraryDetailPageStateProps, LibraryDetailPageDispatchProps, LibraryDetailPageOwnProps {}

export class LibraryDetailPage extends React.Component<LibraryDetailPageProps, void> {

  constructor(props: LibraryDetailPageProps) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.fetchData();
  }

  renderInfo() {
    let fields = Object.keys(this.props.fullLibrary).map(label =>
      <LibraryDetailItem key={label} label={label} value={this.props.fullLibrary[label]} />
    );
    return fields;
  }

  renderStages() {
    let libraryStage = this.props.fullLibrary["library_stage"];
    let registryStage = this.props.fullLibrary["registry_stage"];
    return (
      <form ref="form" className="well">
        <input
          type="hidden"
          name="uuid"
          value={this.props.uuid}
        />
        <LibraryStageItem key={"libraryStage"} label={"Library Stage"} value={libraryStage} />
        <LibraryStageItem key={"registryStage"} label={"Registry Stage"} value={registryStage} />
        <SaveButton
          submit={this.submit}
        />
      </form>
    );
  }

async submit(event: __React.MouseEvent): Promise<void> {
    event.preventDefault();
    let form = (this.refs["form"] as any);
    const data = new (window as any).FormData(form);
    await this.props.editStages(data);
    this.props.toggle();
    this.props.fetchData();
  }

  render(): JSX.Element {
    if (!this.props.fullLibrary) {
      return <div></div>;
    }
    return(
      <div>
        { this.renderStages() }
        <div id="info" className="list-group">
          { this.renderInfo() }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State, ownProps: LibraryDetailPageOwnProps) {
  return {
    fullLibrary: state.library && state.library.data
  };
}

function mapDispatchToProps(dispatch: Function, ownProps: LibraryDetailPageOwnProps) {
  let actions = new ActionCreator(null, null);
  return {
    fetchData: () => dispatch(actions.fetchLibrary(ownProps.uuid)),
    editStages: (data: FormData) => dispatch(actions.editStages(data))
  };
}

const ConnectedLibraryDetailPage = connect<LibraryDetailPageStateProps, LibraryDetailPageDispatchProps, LibraryDetailPageOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(LibraryDetailPage);

export default ConnectedLibraryDetailPage;
