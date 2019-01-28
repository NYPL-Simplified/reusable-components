import { expect } from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import LibraryDetailItem from "../LibraryDetailItem";

describe("LibraryDetailItem", () => {
  let wrapper: Enzyme.ShallowWrapper<any, {}>;
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <LibraryDetailItem
        label="Name"
        value="Test library!"
      />
    );
  });
  it("should render a label", () => {
    let labelField = wrapper.find(".control-label");
    expect(labelField.length).to.equal(1);
    expect(labelField.text()).to.equal("Name");
  });
  it("should render a value", () => {
    let valueField = wrapper.find("span");
    expect(valueField.length).to.equal(1);
    expect(valueField.text()).to.equal("Test library!");
  });
});
