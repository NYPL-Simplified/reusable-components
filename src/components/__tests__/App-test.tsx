import { expect } from "chai";

import * as React from "react";
import * as Enzyme from "enzyme";
import App from "../App";
import Header from "../Header";
import LibrariesListContainer from "../LibrariesListContainer";

describe("App", () => {
  let wrapper: Enzyme.ShallowWrapper<any, {}>;
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <App />
    );
  });
  it("should render the header", () => {
    let header = wrapper.find(Header);
    expect(header.length).to.equal(1);
  });
  it("should render the libraries list container", () => {
    let container = wrapper.find(LibrariesListContainer);
    expect(container.length).to.equal(1);
  });
});
