import { expect } from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import Input from "../Input";

describe("Input", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <Input label="A label" name="inputName"/>
    );
  });
  it("displays a label", () => {
    let label = wrapper.find("label");
    expect(label.length).to.equal(1);
    expect(label.text()).to.equal("A label");
    expect(label.props().htmlFor).to.equal("inputName");
  });
  it("displays an input field with a name and id", () => {
    let input = wrapper.find("input");
    expect(input.props().name).to.equal("inputName");
    expect(input.props().id).to.equal("inputName");
  });
  it("defaults to setting the input's type as text", () => {
    let input = wrapper.find("input");
    expect(input.props().type).to.equal("text");
  });
  it("optionally accepts a type prop", () => {
    wrapper.setProps({ type: "radio" });
    let input = wrapper.find("input");
    expect(input.props().type).to.equal("radio");
  })
});
