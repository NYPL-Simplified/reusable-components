import { expect } from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import Fieldset from "../Fieldset";

describe("Fieldset", () => {
  let wrapper: Enzyme.ShallowWrapper<any, {}>;
  let legend = "TEST_LEGEND";
  let input1 = <input value="A" />;
  let input2 = <input value="B" />;
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <Fieldset legend={legend} elements={[input1, input2]} />
    );
  });
  it("displays a legend", () => {
    let legend = wrapper.find("legend");
    expect(legend.length).to.equal(1);
    expect(legend.text()).to.equal("TEST_LEGEND");
  })
  it("displays elements", () => {
    let inputs = wrapper.find("input");
    expect(inputs.length).to.equal(2);
    expect(inputs.at(0).prop("value")).to.equal("A");
    expect(inputs.at(1).prop("value")).to.equal("B");
  });
  it("optionally displays a label", () => {
    wrapper.setProps({ labelText: "here's a label!" });
    let label = wrapper.find("legend").find("label");
    expect(label.length).to.equal(1);
    expect(label.text()).to.equal("here's a label!");
    expect(label.hasClass("label-default")).to.be.true;
  });
  it("optionally specifies a class for the label", () => {
    wrapper.setProps({ labelText: "Success!", labelClass: "success" });
    let label = wrapper.find("legend").find("label");
    expect(label.length).to.equal(1);
    expect(label.text()).to.equal("Success!");
    expect(label.hasClass("label-success")).to.be.true;
  });
});
