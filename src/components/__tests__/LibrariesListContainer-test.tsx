import { expect } from "chai";
import buildStore from "../../store";
import * as React from "react";
import * as Enzyme from "enzyme";
import LibrariesListContainer from "../LibrariesListContainer";
import LibrariesList from "../LibrariesList";

describe("LibrariesListContainer", () => {
  let wrapper;
  let store;
  let context;
  beforeEach(() => {
    store = buildStore();
    context = { store };
    wrapper = Enzyme.mount(
      <LibrariesListContainer />,
      { context }
    );
  });
  it("should render the LibrariesList", () => {
    expect(wrapper.find("LibrariesList").length).to.equal(1);
  });
  it("should pass down the store", () => {
    expect(wrapper.find("LibrariesList").props()["store"]).to.equal(wrapper.context()["store"]);
  });
});
