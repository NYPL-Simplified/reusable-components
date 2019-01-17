import * as React from "react";

export interface TabsProps {
  items: Array<string>;
  goTo?: any;
}

export default class Tabs extends React.Component<TabsProps, void> {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.makeTabs = this.makeTabs.bind(this);
  }

  select(e) {
    this.props.goTo(e.currentTarget.innerText);
  }

  makeTabs() {
    return this.props.items.map(item => <button key={item} className="btn btn-default" onClick={this.select}>{item}</button>);
  }

  render(): JSX.Element {
    return (
      <section className="tabs">
        {this.makeTabs()}
      </section>
    );
  }
}
