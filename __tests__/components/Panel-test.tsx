import { expect } from "chai";

import * as React from "react";
import * as Enzyme from "enzyme";
import * as Sinon from "sinon";
import Panel from "../../src/components/Panel";

describe("Panel", () => {
  let wrapper: Enzyme.CommonWrapper<{}, {}, {}>;
  let style;
  let headerText;
  let content;

  beforeEach(() => {
    headerText = "test panel header!";
    content = <div>Test panel content</div>;
    wrapper = Enzyme.mount(
      <Panel headerText={headerText} content={content} />
    );
  });

  it("should have a default class if there is no style prop", () => {
    expect(wrapper.find(".panel-default").length).to.equal(1);
  });

  it("should accept a style prop", () => {
    wrapper.setProps({ style: "success" });
    expect(wrapper.find(".panel-success").length).to.equal(1);
  });

  it("should render a header with title and icon", () => {
    let header = wrapper.find(".panel-heading");
    expect(header.length).to.equal(1);
    expect(header.type()).to.equal("button");
    expect(header.prop("type")).to.equal("button");

    let title = header.find(".panel-title");
    expect(title.length).to.equal(1);
    expect(title.text()).to.equal("test panel header!");

    let svg = header.find("svg");
    expect(svg.length).to.equal(1);
    expect(svg.find("title").text()).to.equal("NYPL Wedge Down Icon");
  });

  it("should optionally render a JSX component passed to it as a 'content' prop", () => {
    let panelBody = wrapper.find("section");
    expect(panelBody.length).to.equal(1);
    let bodyContent = panelBody.children().at(0).html();
    expect(bodyContent).to.contain("Test panel content");
  });

  it("should optionally render an HTML string", () => {
    let text = "<form><label>Here is a label!</label><input type='text' /></form>";
    wrapper.setProps({ content: text });
    let panelBody = wrapper.find(".panel-body");
    expect(panelBody.prop("dangerouslySetInnerHTML")["__html"]).to.equal(text);
    expect(panelBody.text()).to.equal("Here is a label!");
  });

  it("should optionally be open by default", () => {
    wrapper = Enzyme.mount(
      <Panel headerText={"OPEN"} openByDefault={true} content={<div></div>} />
    );
    expect(wrapper.state()["display"]).not.to.equal("collapse");
    let panelBody = wrapper.find(".panel-body");
    expect(panelBody.hasClass("collapse")).to.be.false;
    let icon = wrapper.find("svg");
    expect(icon.hasClass("up-icon")).to.be.true;
  });

  it("should toggle the display and the icon on click", () => {
    let spyToggle = Sinon.spy(wrapper.instance(), "toggle");
    wrapper.setProps({ toggle: spyToggle });
    expect(wrapper.state().display).to.equal("collapse");
    expect(wrapper.find("section").hasClass("collapse")).to.be.true;
    expect(wrapper.find("svg").hasClass("down-icon")).to.be.true;

    wrapper.find("button").simulate("click");
    expect(spyToggle.callCount).to.equal(1);

    expect(wrapper.state().display).to.equal("");
    expect(wrapper.find("section").hasClass("collapse")).to.be.false;
    expect(wrapper.find("svg").hasClass("up-icon")).to.be.true;

    wrapper.find("button").simulate("click");
    expect(spyToggle.callCount).to.equal(2);

    expect(wrapper.state().display).to.equal("collapse");
    expect(wrapper.find("section").hasClass("collapse")).to.be.true;
    expect(wrapper.find("svg").hasClass("down-icon")).to.be.true;

    spyToggle.restore();
  });

  it("should optionally render a static panel", () => {
    wrapper = Enzyme.mount(
      <Panel headerText={"STATIC"} collapsible={false} content={<div></div>} />
    );

    expect(wrapper.state()["display"]).not.to.equal("collapse");
    expect(wrapper.find(".panel-heading").type()).to.equal("div");
    expect(wrapper.find(".panel-heading").prop("type")).to.be.null;
    expect(wrapper.find(".panel-body").hasClass("collapse")).to.be.false;
    expect(wrapper.find("svg").length).to.equal(0);

    let spyToggle = Sinon.spy(wrapper.instance(), "toggle");
    wrapper.find(".panel-heading").simulate("click");
    expect(spyToggle.callCount).to.equal(0);

    spyToggle.restore();
  });

  it("should optionally accept a callback", () => {
    let spyToggle = Sinon.spy(wrapper.instance(), "toggle");
    let spyOverride = Sinon.spy(wrapper.instance(), "overrideEnter");
    let onEnter = Sinon.stub();
    let input = <input />;
    wrapper.setProps({
      onEnter: onEnter,
      content: input
    });

    wrapper.find("input").simulate("submit");
    expect(spyToggle.callCount).to.equal(0);
    expect(spyOverride.callCount).to.equal(1);
    expect(onEnter.callCount).to.equal(1);
  });

  it("should update its display if the openByDefault prop changes", () => {
    expect(wrapper.state()["display"]).to.equal("collapse");
    wrapper.setProps({ openByDefault: true });
    expect(wrapper.state()["display"]).to.equal("");
  });

  it("should not update its display if it is not collapsible", () => {
    wrapper.setProps({ collapsible: false });
    expect(wrapper.state()["display"]).to.equal("");
    wrapper.setProps({ openByDefault: true });
    expect(wrapper.state()["display"]).to.equal("");
  });

});
