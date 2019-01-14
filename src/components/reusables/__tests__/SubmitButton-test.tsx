import { expect } from "chai";
import { stub } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import { shallow, mount } from "enzyme";

import SubmitButton from "../SubmitButton";

describe("SubmitButton", () => {
  let wrapper: Enzyme.ShallowWrapper<any, {}>;
  let callback = stub();
  beforeEach(() => {
    wrapper = shallow(
      <SubmitButton
        callback={callback}
      />
    );
  });
  it("calls the callback", () => {
    wrapper.simulate("click");
    expect(callback.callCount).to.equal(1);
  });
  it("optionally renders custom text", () => {
    expect(wrapper.text()).to.equal("Submit");
    wrapper.setProps({ text: "Some other string" });
    expect(wrapper.text()).to.equal("Some other string");
  });
});
