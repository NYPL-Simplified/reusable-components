import { expect } from "chai";
import { stub } from "sinon";

import * as React from "react";
import * as Enzyme from "enzyme";
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
  let store;
  describe("rendering", () => {
    beforeEach(() => {
      store = buildStore();
      wrapper = Enzyme.mount(
        <LibrariesListItem
          library={library}
          store={store}
        />
      );
    });
    it("should display a panel", () => {
      expect(wrapper.find(".panel").length).to.equal(1);
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
      wrapper = Enzyme.mount(
        <LibrariesListItem
          library={library}
          store={store}
        />
      );
    });
    it("should determine background color based on registry_stage and library_stage", () => {
      expect(wrapper.state().color).to.equal("warning");
      expect(wrapper.find(".panel-warning").length).to.equal(1);

      (wrapper.instance() as any).updateColor("cancelled", "production");
      expect(wrapper.state().color).to.equal("danger");
      expect(wrapper.find(".panel-danger").length).to.equal(1);

      (wrapper.instance() as any).updateColor("production", "production");
      expect(wrapper.state().color).to.equal("success");
      expect(wrapper.find(".panel-success").length).to.equal(1);
    });
  });
});
