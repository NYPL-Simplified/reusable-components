import * as React from "react";
import { LibraryData } from "../interfaces";
import { connect } from "react-redux";
import ActionCreator from "../actions";
import { Store } from "redux";
import { State } from "../reducers/index";
import LibraryDetailItem from "./LibraryDetailItem";
import LibraryStageItem from "./LibraryStageItem";
import Form from "./reusables/Form";
import Tabs from "./reusables/Tabs";

export interface LibraryDetailPageDispatchProps {
  editStages: (data: FormData) => Promise<void>;
  fetchLibrary: (uuid: string) => LibraryData;
}

export interface LibraryDetailPageStateProps {
  fullLibrary?: LibraryData;
}

export interface LibraryDetailPageOwnProps {
  library: LibraryData;
  store: Store<State>;
  updateColor: (library_stage: string, registry_stage: string) => void;
}

export interface LibraryDetailPageState {
  libraryStage?: string;
  registryStage?: string;
  tab?: string;
}

export interface LibraryDetailPageProps extends LibraryDetailPageStateProps, LibraryDetailPageDispatchProps, LibraryDetailPageOwnProps {}

export class LibraryDetailPage extends React.Component<LibraryDetailPageProps, LibraryDetailPageState> {

  constructor(props: LibraryDetailPageProps) {
    super(props);
    this.submit = this.submit.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.renderStages = this.renderStages.bind(this);
    this.goToTab = this.goToTab.bind(this);
    this.state = {
                  libraryStage: this.props.library.stages.library_stage,
                  registryStage: this.props.library.stages.registry_stage,
                  tab: "Basic Information"
                 };
  }

  renderItems(key: string) {
    let library = this.props.fullLibrary || this.props.library;
    let details = library[key];
    let detailKeys = Object.keys(details);

    // Only create LibraryDetailItems for fields which actually have a value.
    let fields = detailKeys.filter(label => details[label]).map(label =>
      <LibraryDetailItem key={label} label={label} value={details[label]} />
    );
    return fields;
  }

  renderStages() {
    return (
      <Form
        hiddenName="uuid"
        hiddenValue={this.props.library.uuid}
        onSubmit={this.submit}
        content={[
          <LibraryStageItem key="lib" label={"Library Stage"} value={this.state.libraryStage} />,
          <LibraryStageItem key="reg" label={"Registry Stage"} value={this.state.registryStage} />
        ]}
      />
    );
  }

  goToTab(tab: string) {
    this.setState({ tab: tab });
  }

  async submit(data): Promise<void> {
    await this.props.editStages(data);
    await this.props.fetchLibrary(this.props.library.uuid);

    let libraryStage = this.props.fullLibrary.stages.library_stage;
    let registryStage = this.props.fullLibrary.stages.registry_stage;
    this.props.updateColor(libraryStage, registryStage);
    this.setState({ libraryStage, registryStage });
  }

  render(): JSX.Element {
    if (!this.props.library) {
      return null;
    }

    let hidden = (tab) => tab === this.state.tab ? "" : "hidden";

    return(
      <div>
        { this.renderStages() }
        <div className="detail-content">
          <Tabs items={["Basic Information", "Contact & URLs"]} goTo={this.goToTab} />
          <ul className={`list-group ${this.state.tab === "Basic Information" ? "" : "hidden"}`}>
            { this.renderItems("basic_info") }
          </ul>
          <ul className={`list-group ${this.state.tab === "Contact & URLs" ? "" : "hidden"}`}>
            { this.renderItems("urls_and_contact") }
          </ul>
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
    editStages: (data: FormData) => dispatch(actions.editStages(data)),
    fetchLibrary: (uuid: string) => dispatch(actions.fetchLibrary(uuid))
  };
}

const ConnectedLibraryDetailPage = connect<LibraryDetailPageStateProps, LibraryDetailPageDispatchProps, LibraryDetailPageOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(LibraryDetailPage);

export default ConnectedLibraryDetailPage;
