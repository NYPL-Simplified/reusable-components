import * as React from "react";
import { LibraryData } from "../interfaces";
import { connect } from "react-redux";
import ActionCreator from "../actions";
import { Store } from "redux";
import { State } from "../reducers/index";
import LibraryDetailItem from "./LibraryDetailItem";
import LibraryStageItem from "./LibraryStageItem";
import SaveButton from "./SaveButton";

export interface LibraryDetailPageDispatchProps {
  editStages: (data: FormData) => Promise<void>;
}

export interface LibraryDetailPageStateProps {
  fullLibrary?: LibraryData;
}

export interface LibraryDetailPageOwnProps {
  library: LibraryData;
  store: Store<State>;
  uuid: string;
  updateColor: (library_stage: string, registry_stage: string) => void;
}

export interface LibraryDetailPageState {
  libraryStage: string;
  registryStage: string;
}

export interface LibraryDetailPageProps extends LibraryDetailPageStateProps, LibraryDetailPageDispatchProps, LibraryDetailPageOwnProps {}

export class LibraryDetailPage extends React.Component<LibraryDetailPageProps, LibraryDetailPageState> {

  constructor(props: LibraryDetailPageProps) {
    super(props);
    this.submit = this.submit.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.renderStages = this.renderStages.bind(this);
    this.state = { libraryStage: this.props.library.library_stage, registryStage: this.props.library.registry_stage }
  }

  renderInfo() {
    let fields = Object.keys(this.props.library).map(label =>
      <LibraryDetailItem key={label} label={label} value={this.props.library[label]} />
    );
    return fields;
  }

  renderStages() {

    return (
      <form ref="form" className="well">
        <input
          type="hidden"
          name="uuid"
          value={this.props.uuid}
        />
        <LibraryStageItem label={"Library Stage"} value={this.state.libraryStage} />
        <LibraryStageItem label={"Registry Stage"} value={this.state.registryStage} />
        <SaveButton
          submit={this.submit}
        />
      </form>
    )
  }

  async submit(event: __React.MouseEvent): Promise<void> {
    event.preventDefault();
    let form = (this.refs["form"] as any);
    const data = new (window as any).FormData(form);
    this.props.updateColor(data.get("Library Stage"), data.get("Registry Stage"));
    await this.props.editStages(data);
    this.setState({ libraryStage: data.get("Library Stage"), registryStage: data.get("Registry Stage") });
  }

  render(): JSX.Element {
    if (!this.props.library) {
      return null;
    }

    return(
      <div>
        { this.renderStages() }
        <ul id="info" className="list-group">
          { this.renderInfo() }
        </ul>
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
    editStages: (data: FormData) => dispatch(actions.editStages(data))
  };
}

const ConnectedLibraryDetailPage = connect<LibraryDetailPageStateProps, LibraryDetailPageDispatchProps, LibraryDetailPageOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(LibraryDetailPage);

export default ConnectedLibraryDetailPage;
