import { expect } from "chai";

import * as React from "react";
import * as Enzyme from "enzyme";
import Header from "../../reusables/Header";

describe.only("Header", () => {
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <Header text="Test Header!" />
    );
  });
  it("should render text", () => {
    let text = wrapper.find("span");
    expect(text.text()).to.equal("Test Header!");
  });
});
