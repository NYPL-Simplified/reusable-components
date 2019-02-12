import * as React from "react";
import { LibraryData } from "../interfaces";
import { connect } from "react-redux";
import ActionCreator from "../actions";
import { Store } from "redux";
import { State } from "../reducers/index";
import LibraryDetailItem from "./LibraryDetailItem";
import LibraryStageItem from "./LibraryStageItem";
import Form from "./reusables/Form";
import EmailForm from "./EmailForm";
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
  updateColor: (stages: Array<string>) => void;
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
    this.renderItems = this.renderItems.bind(this);
    this.renderStages = this.renderStages.bind(this);
    this.state = {
      libraryStage: this.props.library.stages.library_stage,
      registryStage: this.props.library.stages.registry_stage,
    };
  }

  renderItems(category: {[key: string]: string}): JSX.Element {

    // Only create LibraryDetailItems for fields which actually have a value.
    let fields = Object.keys(category).filter(label => category[label]).map(label =>
      <LibraryDetailItem key={label} label={label} value={`${category[label]}`} />
    );

    return (
      <ul className={`list-group`}>
        {fields}
      </ul>
    );
  }

  renderStages(): JSX.Element {
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

  async submit(data: FormData): Promise<void> {
    await this.props.editStages(data);
    await this.props.fetchLibrary(this.props.library.uuid);

    let libraryStage = this.props.fullLibrary.stages.library_stage;
    let registryStage = this.props.fullLibrary.stages.registry_stage;
    this.props.updateColor([libraryStage, registryStage]);
    this.setState(Object.assign(this.state, { libraryStage, registryStage }));
  }

  render(): JSX.Element {
    if (!this.props.library) {
      return null;
    }
    let library = this.props.fullLibrary || this.props.library;
    let tabItems = {};

    const categories = {
      "Basic Information": "basic_info",
      "Contact & URLs": "urls_and_contact"
    };

    Object.keys(categories).forEach(tabName => {
      tabItems[tabName] = this.renderItems(library[categories[tabName]]);
    });

    return(
      <div>
        { this.renderStages() }
        <hr></hr>
        <EmailForm store={this.props.store} library={library} />
        <hr></hr>
        <div className="detail-content">
          <Tabs items={tabItems}/>
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
  let actions = new ActionCreator(null);
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
