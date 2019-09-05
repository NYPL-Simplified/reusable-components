import { expect } from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import Input from "../../src/components/Input";

describe("Input", () => {
  let wrapper: Enzyme.ShallowWrapper<any, {}>;
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <Input label="A label" name="inputName" id="inputId" />
    );
  });
  it("displays a label", () => {
    let label = wrapper.find("label");
    expect(label.length).to.equal(1);
    expect(label.text()).to.equal("A label");
    expect(label.prop("htmlFor")).to.equal("inputId");
  });
  it("renders default prop values", () => {
    let input = wrapper.find("input");
    let label = wrapper.find("label");
    expect(wrapper.find("div").prop("className")).to.equal("form-group ");
    expect(input.prop("callback")).to.not.be.defined;
    expect(input.prop("readOnly")).to.equal(false);
    expect(input.prop("placeholder")).to.not.be.defined;
  });
  it("displays an input field with a name and id", () => {
    let input = wrapper.find("input");
    expect(input.prop("name")).to.equal("inputName");
    expect(input.prop("id")).to.equal("inputId");
  });
  it("defaults to setting the input's type as text", () => {
    let input = wrapper.find("input");
    expect(input.prop("type")).to.equal("text");
  });
  it("optionally accepts a type prop", () => {
    wrapper = Enzyme.shallow(
      <Input label="Radio" name="radioInputName" type="radio" id="radio" className="radio" />
    );
    let input = wrapper.find("input");
    expect(input.prop("type")).to.equal("radio");
    expect(wrapper.find("div").prop("className")).to.equal("form-group radio");
  });
  it("optionally accepts a placeholder", () => {
    wrapper = Enzyme.shallow(
      <Input id="placeholder" name="placeholder" label="some placeholder" placeholder="i am a placeholder" />
    );
    let input = wrapper.find("input");
    expect(input.prop("placeholder")).to.equal("i am a placeholder");
  });
  
  it("optionally accepts a value prop", () => {
    wrapper.setProps({ value: "ABC" });
    expect(wrapper.find("input").prop("defaultValue")).to.equal("ABC");
  });
  it("can check a checkbox by default", () => {
    wrapper.setProps({ type: "checkbox", checked: true });
    expect(wrapper.find("input").prop("defaultChecked")).to.be.true;
  });
});
