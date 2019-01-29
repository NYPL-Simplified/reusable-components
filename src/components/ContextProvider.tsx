import * as React from "react";
import { Store } from "redux";
import buildStore from "../store";
import { State } from "../reducers/index";

/** Provides a redux store, configuration options, and a function to create URLs
    as context to admin interface pages. */
export default class ContextProvider extends React.Component<void, void> {
  store: Store<State>;

  constructor() {
    super();
    this.store = buildStore();
  }

  static childContextTypes: React.ValidationMap<any> = {
    store: React.PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      store: this.store
    };
  }

  render() {
    return React.Children.only(this.props.children) as JSX.Element;
  };
};
