import { expect } from "chai";

import * as React from "react";
import * as Enzyme from "enzyme";
import Header from "../Header";

describe("Header", () => {
  let wrapper: Enzyme.ShallowWrapper<any, {}>;
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <Header text="Test Header!" logOut="logout_url"/>
    );
  });
  it("should render text", () => {
    let text = wrapper.find("span");
    expect(text.text()).to.equal("Test Header!");
  });
  it("should render a logout button", () => {
    let logout = wrapper.find(".navbar-btn");
    expect(logout.length).to.equal(1);
    expect(logout.find(".logoutIcon").length).to.equal(1);
    expect((logout.props() as any).href).to.equal("logout_url");
  });
});
