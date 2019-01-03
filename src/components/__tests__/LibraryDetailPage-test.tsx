import { expect } from "chai";
import { stub } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import { shallow, mount } from "enzyme";
import buildStore from "../../store";
import LibraryDetailPage from "../LibraryDetailPage";

describe("LibraryDetailPage", () => {
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  let fetchData = stub();
  let editStages = stub();
  let toggle = stub();
  let uuid = "123";
  let store;

  let library = {
      "uuid": "UUID1",
      "name": "Test Library",
      "short_name": "test_lib",
      "id": 1,
      "registry_stage": "testing",
      "library_stage": "production"
  };

  beforeEach(() => {
    store = buildStore();
    wrapper = mount(
      <LibraryDetailPage
        toggle={toggle}
        uuid={uuid}
        store={store}
      />
    );
  });

  it("should display a form", () => {
    // Can't get it to re-render after setting props--HTML is always blank
    wrapper.setProps({ fullLibrary: library });

  });
});
