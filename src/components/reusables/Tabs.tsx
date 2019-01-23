import * as React from "react";

export interface TabsProps {
  items: {
    [key: string]: JSX.Element;
  };
}

export interface TabsState {
  tab: string;
}

export default class Tabs extends React.Component<TabsProps, TabsState> {
  constructor(props: TabsProps) {
    super(props);
    this.select = this.select.bind(this);
    this.makeTabs = this.makeTabs.bind(this);
    this.state = { tab: Object.keys(this.props.items)[0] };
  }

  select(e: __React.SyntheticEvent) {
    let tabName = (e.currentTarget as HTMLElement).innerText;
    this.setState({ tab: tabName });
  }

  makeTabs(): Array<Array<JSX.Element>> {
    let navs = [] as Array<JSX.Element>;
    let content = [] as Array<JSX.Element>;
    Object.entries(this.props.items).map(item => {
      let [name, data] = item;
      let hidden = name === this.state.tab ? "" : "hidden";
      let current = name === this.state.tab ? "current" : "";
      let navItem = (
        <li key={name} className={`tab-nav ${current}`}>
          <button className="btn btn-default" onClick={this.select}>
            {name}
          </button>
        </li>
      );
      navs.push(navItem);
      let contentItem = <section key={name} className={`tab-content ${hidden}`}>{data}</section>;
      content.push(contentItem);
    });
    return [navs, content];
  }

  render(): JSX.Element {
    let [navs, content] = this.makeTabs();
    return (
      <section className="tabs">
        <ul className="tab-navs">
          {navs}
        </ul>
        {content}
      </section>
    );
  }
}
