import * as React from "react";
import { Store } from "redux";
import buildStore from "../store";
import { State } from "../reducers/index";

export interface ContextProviderProps extends React.Props<any> {
  csrfToken: string;
  showCircEventsDownload?: boolean;
  settingUp?: boolean;
  email?: string;
  roles?: {
    role: string;
    library?: string;
  }[];
}

/** Provides a redux store, configuration options, and a function to create URLs
    as context to admin interface pages. */
export default class ContextProvider extends React.Component<ContextProviderProps, void> {
  store: Store<State>;

  constructor(props) {
    super(props);
    this.store = buildStore();
  }


  static childContextTypes: React.ValidationMap<any> = {
    editorStore: React.PropTypes.object.isRequired,
    csrfToken: React.PropTypes.string.isRequired,
  };

  getChildContext() {
    return {
      editorStore: this.store,
      csrfToken: this.props.csrfToken
    };
  }

  render() {
    return React.Children.only(this.props.children) as JSX.Element;
  };
};
