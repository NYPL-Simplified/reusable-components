import { expect } from "chai";
import { stub } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import { shallow, mount } from "enzyme";

import SaveButton from "../SaveButton";

describe("SaveButton", () => {
  let wrapper: Enzyme.ShallowWrapper<any, {}>;
  let submit = stub();
  beforeEach(() => {
    wrapper = shallow(
      <SaveButton
        submit={submit}
      />
    );
  });
  it("calls submit", () => {
    wrapper.simulate("click");
    expect(submit.callCount).to.equal(1);
  });
  it("optionally renders custom text", () => {
    expect(wrapper.text()).to.equal("Save");
    wrapper.setProps({ text: "Some other string" });
    expect(wrapper.text()).to.equal("Some other string");
  });
});
