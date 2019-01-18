import { expect } from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import Tabs from "../../reusables/Tabs";

describe("Tabs", () => {
  let wrapper;
  let content1 = <p>Content item #1</p>;
  let content2 = <p>Another content item</p>;
  let content3 = <p>More content!</p>;
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <Tabs items={{
        "content1": content1,
        "content2": content2,
        "content3": content3
      }}/>
    )
  });
  it("should render nav buttons", () => {
    let tabNavs = wrapper.find(".tab-nav");
    expect(tabNavs.length).to.equal(3);
    expect(tabNavs.at(0).text()).to.equal("content1");
    expect(tabNavs.at(1).text()).to.equal("content2");
    expect(tabNavs.at(2).text()).to.equal("content3");
  });
  it("should render content", () => {
    let tabContent = wrapper.find(".tab-content");
    expect(tabContent.length).to.equal(3);
    expect(tabContent.at(0).text()).to.equal("Content item #1");
    expect(tabContent.at(1).text()).to.equal("Another content item");
    expect(tabContent.at(2).text()).to.equal("More content!");
  });
  it("should start out showing only the first tab", () => {
    expect(wrapper.state()["tab"]).to.equal("content1");
    let currentTab = wrapper.find(".tab-nav").at(0);
    expect(currentTab.hasClass("current")).to.be.true;
    let currentContent = wrapper.find(".tab-content").at(0);
    expect(currentContent.hasClass("hidden")).to.be.false;
    expect(wrapper.find(".tab-content").at(1).hasClass("hidden")).to.be.true;
    expect(wrapper.find(".tab-content").at(2).hasClass("hidden")).to.be.true;
  });
  it("should switch tabs on click", () => {
    let tabNav2 = wrapper.find(".tab-nav").at(1);
    tabNav2.find("button").simulate("click", {currentTarget: {innerText: tabNav2.text()}});
    expect(wrapper.state()["tab"]).to.equal("content2");

    tabNav2 = wrapper.find(".tab-nav").at(1);
    expect(tabNav2.hasClass("current")).to.be.true;
    expect(wrapper.find(".tab-content").at(1).hasClass("hidden")).to.be.false;
  });
});
