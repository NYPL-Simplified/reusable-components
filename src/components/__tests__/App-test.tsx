import { expect } from "chai";

import * as React from "react";
import * as Enzyme from "enzyme";
import App from "../App";
import Header from "../reusables/Header";
import LibrariesListContainer from "../LibrariesListContainer";

describe("App", () => {
  let wrapper: Enzyme.ShallowWrapper<any, {}>;
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <App />
    );
  });
  it("should render the header and pass it the correct props", () => {
    let header = wrapper.find(Header);
    expect(header.length).to.equal(1);
    console.log(header.prop("text"));
    expect(header.prop("text")).to.equal("Library Registry Interface");
    expect(header.prop("imgSrc")).to.equal("./logo.png");
    expect(header.prop("logOut")).to.equal("/admin/log_out");
  });
  it("should render the libraries list container", () => {
    let container = wrapper.find(LibrariesListContainer);
    expect(container.length).to.equal(1);
  });
});
