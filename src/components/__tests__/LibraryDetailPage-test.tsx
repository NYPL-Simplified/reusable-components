import { expect } from "chai";
import { stub } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import { mount } from "enzyme";
import buildStore from "../../store";
import LibraryDetailPage from "../LibraryDetailPage";

describe("LibraryDetailPage", () => {
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  let fetchData = stub();
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

  let updateColor;

  beforeEach(() => {
    store = buildStore();
    updateColor = stub();
    wrapper = mount(
      <LibraryDetailPage
        uuid={uuid}
        library={library}
        store={store}
        updateColor={updateColor}
      />
    );
  });

  it("should show the library information", () => {
    let infoList = wrapper.find(".list-group");
    expect(infoList.length).to.equal(1);
    let infoItems = infoList.find("li");
    expect(infoItems.length).to.equal(6);

    infoItems.map((item) => {
      let key = item.find(".control-label").text();
      let value = item.find(".form-control-static").text();
      expect(`${library[key]}`).to.equal(value);
    });
  });

  it("should display a form", () => {
    let form = wrapper.find("form");
    expect(form.length).to.equal(1);

    let libraryStage = form.find("fieldset").at(0);
    let libraryLegend = libraryStage.find("legend");
    let librarySelect = libraryStage.find("select");
    expect(libraryLegend.find("span").text()).to.equal("Current Library Stage:");
    expect(librarySelect.props().name).to.equal("Library Stage");
    expect(librarySelect.props().defaultValue).to.equal("production");

    let registryStage = form.find("fieldset").at(1);
    let registryLegend = registryStage.find("legend");
    let registrySelect = registryStage.find("select");
    expect(registryLegend.find("span").text()).to.equal("Current Registry Stage:");
    expect(registrySelect.props().name).to.equal("Registry Stage");
    expect(registrySelect.props().defaultValue).to.equal("testing");

    [libraryStage, registryStage].map((stage) => {
      let options = stage.find("option");
      expect(options.length).to.equal(3);
      expect(options.at(0).props().value).to.equal("testing");
      expect(options.at(1).props().value).to.equal("production");
      expect(options.at(2).props().value).to.equal("cancelled");
    });

    let submitButton = form.find("button");
    expect(submitButton.length).to.equal(1);
  });

  it("should submit a form", () => {
    let form = wrapper.find("form");
    let submitButton = form.find("button");
    submitButton.simulate("click");

    expect(updateColor.callCount).to.equal(1);
    let libStage = updateColor.args[0][0];
    let regStage = updateColor.args[0][1];
    expect(libStage).to.equal("production");
    expect(regStage).to.equal("testing");

    // Still figuring out how to test whether editStages (a dispatch prop) is getting called...
  });
});
