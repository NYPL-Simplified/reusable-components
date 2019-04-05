import { expect } from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import Fieldset from "../../src/components/Fieldset";

describe("Fieldset", () => {
  const legend = "TEST_LEGEND";
  const input1 = <input value="A" />;
  const input2 = <input value="B" />;
  let wrapper: Enzyme.ShallowWrapper<{}, {}>;

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <Fieldset legend={legend} elements={[input1, input2]} />
    );
  });
  it("displays a legend", () => {
    const legend = wrapper.find("legend");
    expect(legend.length).to.equal(1);
    expect(legend.text()).to.equal("TEST_LEGEND");
  });
  it("displays elements", () => {
    const inputs = wrapper.find("input");
    expect(inputs.length).to.equal(2);
    expect(inputs.at(0).prop("value")).to.equal("A");
    expect(inputs.at(1).prop("value")).to.equal("B");
  });
  it("optionally displays a badge", () => {
    wrapper.setProps({ badgeText: "here's a badge!" });
    const badge = wrapper.find(".badge");
    expect(badge.length).to.equal(1);
    expect(badge.text()).to.equal("here's a badge!");
    expect(badge.hasClass("badge-default")).to.be.true;
  });
  it("optionally specifies a class for the badge", () => {
    wrapper.setProps({ badgeText: "Success!", badgeClass: "success" });
    const badge = wrapper.find(".badge");
    expect(badge.length).to.equal(1);
    expect(badge.text()).to.equal("Success!");
    expect(badge.hasClass("badge-success")).to.be.true;
  });
});
