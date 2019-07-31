import { expect } from "chai";

import * as React from "react";
import * as Enzyme from "enzyme";
import Header from "../../src/components/Header";

describe("Header", () => {
  let wrapper: Enzyme.ShallowWrapper<{}, {}>;
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <Header text="Test Header!" loggedIn={true} />
    );
  });
  it("should render text", () => {
    let text = wrapper.find("span").at(0);
    expect(text.text()).to.equal("Test Header!");
  });
  it("should render a logout button", () => {
    let logout = wrapper.find(".header-btn");
    expect(logout.length).to.equal(1);
    expect(logout.find(".logoutIcon").length).to.equal(1);
    expect(logout.find("span").text()).to.contain("Log Out");
  });
});
