import { expect } from "chai";
import { stub } from "sinon";

import * as React from "react";
import * as Enzyme from "enzyme";
import { shallow, mount } from "enzyme";
import buildStore from "../../store";

import LibrariesListItem from "../LibrariesListItem";

describe("LibrariesListItem", () => {
  let library = {
      "uuid": "UUID1",
      "name": "Test Library",
      "short_name": "test_lib",
      "id": 1,
      "registry_stage": "testing",
      "library_stage": "production"
  };
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  let select = stub();
  let store;
  describe("rendering", () => {
    beforeEach(() => {
      store = buildStore();
      wrapper = mount(
        <LibrariesListItem
          library={library}
          active={false}
          select={select}
          store={store}
        />
      );
    });
    it("should display a panel", () => {
      expect(wrapper.hasClass("panel")).to.be.true;
    });
    it("should render a header with a title", () => {
      let header = wrapper.find(".panel-heading");
      expect(header.length).to.equal(1);
      let title = header.find(".panel-title");
      expect(title.length).to.equal(1);
      expect(title.text()).to.contain("Test Library (test_lib)");
    });
    it("should display an icon in the header", () => {
      let header = wrapper.find(".panel-heading");
      let icon = header.find("svg");
      expect(icon.hasClass("down-icon")).to.be.true;
    });
  });
  describe("behavior", () => {
    beforeEach(() => {
      store = buildStore();
      wrapper = mount(
        <LibrariesListItem
          library={library}
          active={false}
          select={select}
          store={store}
        />
      );
    });
    it("should determine background color based on registry_stage and library_stage", () => {
      expect(wrapper.hasClass("panel-warning")).to.be.true;
      library.registry_stage = "cancelled";
      wrapper.setProps({ library: library });
      expect(wrapper.hasClass("panel-danger")).to.be.true;
      library.registry_stage = "production";
      library.library_stage = "production";
      wrapper.setProps({ library: library });
      expect(wrapper.hasClass("panel-success")).to.be.true;
    });
    it("should toggle on click", () => {
      let title = wrapper.find(".panel-title");
      title.simulate("click");
      expect(select.callCount).to.equal(1);
    });
  });
});
