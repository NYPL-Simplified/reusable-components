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
    let items = Object.entries(this.props.items);

    items.map((item, idx) => {
      let [name, data] = item;
      let current = name === this.state.tab;
      let navItem = (
        <li key={name} role="presentation" className={`tab-nav ${current ? "current" : ""}`}>
          <button
            aria-controls={`panel-${idx}`}
            aria-selected={current.toString()}
            className="btn btn-default"
            id={`tab-${idx}`}
            onClick={this.select}
            role="tab"
            tabIndex={current ? 0 : -1}
          >
            {name}
          </button>
        </li>
      );

      navs.push(navItem);

      let contentItem = (
        <section
          aria-labelledby={`tab-${idx}`}
          className={`tab-content ${current ? "" : "hidden"}`}
          id={`panel-${idx}`}
          key={name}
          role="tabpanel"
          tabIndex={0}
        >
          {data}
        </section>
      );

      content.push(contentItem);
    });
    return [navs, content];
  }

  render(): JSX.Element {
    let [navs, content] = this.makeTabs();
    return (
      <section className="tabs">
        <ul role="tablist" className="tab-navs">
          {navs}
        </ul>
        {content}
      </section>
    );
  }
}
