import { expect } from "chai";

import * as React from "react";
import * as Enzyme from "enzyme";
import Panel from "../Panel";

describe("Panel", () => {
  let wrapper;
  let style;
  let headerText;
  let body;

  beforeEach(() => {
    headerText = "test panel header!";
    body = <div>Test panel body</div>;
    wrapper = Enzyme.mount(
      <Panel headerText={headerText} body={body} />
    );
  });

  it("should have a default class if there is no style prop", () => {
    expect(wrapper.hasClass("panel-default")).to.be.true;
  });

  it("should accept a style prop", () => {
    wrapper.setProps({ style: "success" });
    expect(wrapper.hasClass("panel-success")).to.be.true;
  });

  it("should render a header with title and icon", () => {
    let header = wrapper.find(".panel-heading");
    expect(header.length).to.equal(1);

    let title = header.find(".panel-title");
    expect(title.length).to.equal(1);
    expect(title.text()).to.equal("test panel header!");

    let svg = header.find("svg");
    expect(svg.length).to.equal(1);
    expect(svg.find("title").text()).to.equal("NYPL Wedge Down Icon");
  });

  it("should render a body", () => {
    let panelBody = wrapper.find("section");
    expect(panelBody.length).to.equal(1);
    let bodyContent = panelBody.children().at(0).html();
    expect(bodyContent).to.contain("Test panel body");
  });

  it("should toggle the display and the icon on click", () => {
    expect(wrapper.state().display).to.equal("collapse");
    expect(wrapper.find("section").hasClass("collapse")).to.be.true;
    expect(wrapper.state().icon).to.equal("down-icon");
    expect(wrapper.find("svg").hasClass("down-icon")).to.be.true;

    wrapper.find("button").simulate("click");

    expect(wrapper.state().display).to.equal("");
    expect(wrapper.find("section").hasClass("collapse")).to.be.false;
    expect(wrapper.state().icon).to.equal("up-icon");
    expect(wrapper.find("svg").hasClass("up-icon")).to.be.true;
  });

});
