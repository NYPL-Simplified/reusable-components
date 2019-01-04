import { expect } from "chai";
import { stub } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import { shallow, mount } from "enzyme";
import buildStore from "../../store";

import LibraryDetailContainer from "../LibraryDetailContainer";
import LibraryDetailPage from "../LibraryDetailPage";

describe("LibraryDetailContainer", () => {
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  let store;
  let context;
  let toggle;

  beforeEach(() => {
    store = buildStore();
    context = { store: store };
    toggle = stub();
    wrapper = mount(
      <LibraryDetailContainer
        id="123"
        toggle={toggle}
      />,
      { context }
    );
  });

  it("shows the detail page", () => {
    let detailPage = wrapper.find("LibraryDetailPage");
    expect(detailPage.length).to.equal(1);
    expect(detailPage.props().uuid).to.equal("123");
  });
});
