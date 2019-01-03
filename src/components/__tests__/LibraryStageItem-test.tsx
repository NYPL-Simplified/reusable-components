import { expect } from "chai";
import { stub } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import { shallow, mount } from "enzyme";
import LibraryStageItem from "../LibraryStageItem";

describe("LibraryStageItem", () => {
  let wrapper: Enzyme.ShallowWrapper<any, {}>;
  let label;
  let value;
  beforeEach(() => {
    label = "Registry Stage";
    value = "cancelled";
    wrapper = shallow(
      <LibraryStageItem
        label={label}
        value={value}
      />
    );
  });
  it("should display a label", () => {
    let label = wrapper.find("label");
    expect(label.length).to.equal(1);
    expect(label.text()).to.equal("Registry Stage: cancelled");
  });
  it("should display a dropdown", () => {
    let dropdown = wrapper.find("select") as any;
    expect(dropdown.length).to.equal(1);
    expect(dropdown.props().name).to.equal("Registry Stage");
    expect(dropdown.props().defaultValue).to.equal("cancelled");

    let options = dropdown.find("option");
    expect(options.length).to.equal(3);
    expect(options.at(0).html()).to.contain("Testing");
    expect(options.at(1).html()).to.contain("Production");
    expect(options.at(2).html()).to.contain("Cancelled");
  });
  it("should update when the value prop changes", () => {
    wrapper.setProps({ value: "production" });

    let label = wrapper.find("label");
    expect(label.text()).to.equal("Registry Stage: production");

    let dropdown = wrapper.find("select") as any;
    expect(dropdown.props().defaultValue).to.equal("production");
  });
});
