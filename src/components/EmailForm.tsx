import * as React from "react";
import Form from "./reusables/Form";
import { connect } from "react-redux";
import ActionCreator from "../actions";
import { FetchErrorData } from "opds-web-client/lib/interfaces";
import { Store } from "redux";
import { State } from "../reducers/index";
import { LibraryData } from "../interfaces";
import { CheckSoloIcon } from "@nypl/dgx-svg-icons";

export interface EmailFormState {
  sent: boolean;
}

export interface EmailFormOwnProps {
  library: LibraryData;
  store: Store<State>;
}

export interface EmailFormDispatchProps {
  email: (data: FormData) => Promise<void>;
}

export interface EmailFormStateProps {
  error?: FetchErrorData;
}

export interface EmailFormProps extends EmailFormOwnProps, EmailFormDispatchProps, EmailFormStateProps {}

export class EmailForm extends React.Component<EmailFormProps, EmailFormState> {

  constructor(props) {
    super(props);
    this.sendEmail = this.sendEmail.bind(this);
    this.state = { sent: false };
  }

  async sendEmail(data: FormData): Promise<void> {
    await this.props.email(data);
    this.setState({ sent: true });
  }

  render(): JSX.Element {
    let disabled = false;
    let icon = this.state.sent ? <CheckSoloIcon iconId="1" /> : null;
    let hasEmail = !!this.props.library.urls_and_contact.contact_email;
    let alreadyValidated = this.props.library.urls_and_contact.validated !== "Not validated";

    let buttonText = hasEmail ? "Send Validation Email" : "No email address configured";
    let buttonContent = <span>{buttonText}{icon}</span>;
    let infoText = alreadyValidated && !this.state.sent && !this.props.error && "Already validated";
    let successText = `Validation email successfully sent to ${this.props.library.urls_and_contact.contact_email}`;

    return (
        <Form
          className="validation"
          hiddenName="uuid"
          hiddenValue={this.props.library.uuid}
          title="Validation"
          onSubmit={this.sendEmail}
          buttonContent={buttonContent}
          disableButton={!hasEmail}
          infoText={alreadyValidated ? infoText : null}
          errorText={this.props.error ? this.props.error.response : null}
          successText={this.state.sent ? successText : null}
        />
    );
  }
}

function mapStateToProps(state: State, ownProps: EmailFormOwnProps) {
  return {
    error: state.email && (state.email.formError || state.email.fetchError)
  };
}

function mapDispatchToProps(dispatch: Function, ownProps: EmailFormOwnProps) {
  let actions = new ActionCreator(null);
  return {
    email: (data: FormData) => dispatch(actions.email(data)),
  };
}

const ConnectedEmailForm = connect<EmailFormStateProps, EmailFormDispatchProps, EmailFormOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(EmailForm);

export default ConnectedEmailForm;
