import * as React from "react";

export interface TabsProps {
  items: {
    [key: string]: JSX.Element;
  };
}

export interface TabsState {
  tab: number;
}

export default class Tabs extends React.Component<TabsProps, TabsState> {
  constructor(props: TabsProps) {
    super(props);
    this.select = this.select.bind(this);
    this.makeTabs = this.makeTabs.bind(this);
    this.state = { tab: 0 };
  }

  select(e:  __React.KeyboardEvent & __React.MouseEvent) {
    let tabs = Object.keys(this.props.items);
    let idx = parseInt((e.currentTarget as HTMLElement).id);

    if (e.keyCode) {
      // Keyboard navigation with arrow keys
      let newIdx: number;
      if (e.keyCode === 39) {
        // Right arrow key: go to the next tab, or go back to the beginning if you were already on the last tab
        newIdx = idx < tabs.length - 1 ? idx + 1 : 0;
      }
      else if (e.keyCode === 37) {
        // Left arrow key: go to the previous tab, or go to the end if you were already on the first tab
        newIdx = idx === 0 ? tabs.length - 1 : idx - 1;
      }
      else {
        return;
      }
      this.setState({ tab: newIdx });
      (this.refs[newIdx] as HTMLElement).focus();
    }
    else {
      // Click
      this.setState({ tab: idx });
    }
  }

  makeTabs(): Array<Array<JSX.Element>> {
    let navs = [] as Array<JSX.Element>;
    let content = [] as Array<JSX.Element>;
    let items = Object.entries(this.props.items);

    items.map((item, idx) => {
      let [name, data] = item;
      let current = idx === this.state.tab;
      let navItem = (
        <li key={name} role="presentation" className={`tab-nav ${current ? "current" : ""}`}>
          <button
            aria-controls={`panel-${idx}`}
            aria-selected={current.toString()}
            className="btn btn-default"
            id={idx.toString()}
            onClick={this.select}
            onKeyDown={this.select}
            role="tab"
            tabIndex={current ? 0 : -1}
            ref={`${idx}`}
          >
            {name}
          </button>
        </li>
      );

      navs.push(navItem);

      let contentItem = (
        <section
          aria-labelledby={idx.toString()}
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
