import { expect } from "chai";
import { stub, spy } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import buildStore from "../../store";

import { LibrariesList } from "../LibrariesList";

describe("LibrariesList", () => {
  let libraries = {
    libraries:
      [{
        "uuid": "UUID1",
        "name": "Test Library 1",
        "short_name": "lib1",
        "id": 1,
        "registry_stage": "testing",
        "library_stage": "production"
      },
      {
        "uuid": "UUID2",
        "name": "Test Library 2",
        "short_name": "lib2",
        "id": 2,
        "registry_stage": "cancelled",
        "library_stage": "testing"
      }]
  };
  let fetchData;
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  let store;
  describe("rendering", () => {
    fetchData = stub();
    beforeEach(() => {
      store = buildStore();
      wrapper = Enzyme.mount(
        <LibrariesList
          fetchData={fetchData}
          store={store}
          libraries={libraries}
        />
      );
    });

    it("should call fetchData on load", () => {
      expect(fetchData.callCount).to.equal(1);
    });

    it("should display a list of libraries", () => {
      let libraryItems = wrapper.find(".panel");
      expect(libraryItems.length).to.equal(2);
    });

    it("should render each library's  name and short name", () => {
      let lib1 = wrapper.find(".panel").at(0);
      expect(lib1.text()).to.contain("Test Library 1 (lib1)");
      let lib2 = wrapper.find(".panel").at(1);
      expect(lib2.text()).to.contain("Test Library 2 (lib2)");
    });

    it("should update if the libraries prop changes", () => {
      let newLib1 = Object.assign({}, libraries.libraries[0], { name: "New" });
      let newProps = Object.assign({}, libraries, { libraries: [newLib1, libraries.libraries[1]] });
      wrapper.setProps({ libraries: newProps });

      expect(fetchData.called).to.be.true;
      expect(wrapper.find(".panel").length).to.equal(2);
      expect(wrapper.find(".panel-title").at(0).text()).to.contain("New");
    });

    it("should display a header if there are no libraries", () => {
      wrapper.setProps({ libraries: [] });
      expect(fetchData.called).to.be.true;
      let header = wrapper.find(".page-header");
      expect(header.length).to.equal(1);
      expect(header.text()).to.equal("There are no libraries in this registry yet.");
    });
  });
});
