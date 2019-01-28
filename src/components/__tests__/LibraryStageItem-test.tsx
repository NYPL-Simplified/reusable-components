import { expect } from "chai";
import { stub } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import LibraryStageItem from "../LibraryStageItem";

describe("LibraryStageItem", () => {
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  let label;
  let value;
  beforeEach(() => {
    label = "Registry Stage";
    value = "cancelled";
    wrapper = Enzyme.mount(
      <LibraryStageItem
        label={label}
        value={value}
      />
    );
  });
  it("should display a legend", () => {
    let legend = wrapper.find("legend");
    expect(legend.length).to.equal(1);
    expect(legend.find("span").text()).to.equal("Current Registry Stage:");
  });
  it("should display a label", () => {
    let label = wrapper.find(".label");
    expect(label.length).to.equal(1);
    expect(label.text()).to.equal("cancelled");
    expect(label.hasClass("label-danger")).to.be.true;
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

    let label = wrapper.find(".label");
    expect(label.text()).to.equal("production");
    expect(label.hasClass("label-success")).to.be.true;

    let dropdown = wrapper.find("select") as any;
    expect(dropdown.props().defaultValue).to.equal("production");
  });
});
