import { expect } from "chai";
import { stub, spy } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import buildStore from "../../store";
import { LibraryDetailPage } from "../LibraryDetailPage";
import LibraryDetailItem from "../LibraryDetailItem";

describe("LibraryDetailPage", () => {
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  let fetchData = stub();
  let uuid = "123";
  let store;

  let library = {
      "uuid": "123",
      "name": "Test Library",
      "short_name": "test_lib",
      "id": 1,
      "registry_stage": "testing",
      "library_stage": "production",
      "description": undefined
  };

  let updateColor;
  let editStages;
  let fetchLibrary;

  beforeEach(() => {
    store = buildStore();
    updateColor = stub();
    editStages = stub();
    fetchLibrary = stub();
    wrapper = Enzyme.mount(
      <LibraryDetailPage
        uuid={uuid}
        library={library}
        store={store}
        updateColor={updateColor}
        editStages={editStages}
        fetchLibrary={fetchLibrary}
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

  it("should not display blank values", () => {
    let infoLabels = wrapper.find(".list-group-item .control-label").map(label => label.text());
    expect(infoLabels.indexOf("description")).to.equal(-1);
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

    let saveButton = form.find("button");
    expect(saveButton.length).to.equal(1);
  });

  it("should submit a form and fetch new data", async () => {
    let form = wrapper.find("form");
    let saveButton = form.find("button");
    saveButton.simulate("click");

    let newStages = { library_stage: "cancelled", registry_stage: "production" };
    let fullLibrary = Object.assign({}, wrapper.props()["library"], newStages);
    wrapper.setProps({ fullLibrary });

    expect(editStages.callCount).to.equal(1);

    const pause = (): Promise<void> => {
      return new Promise<void>(resolve => setTimeout(resolve, 0));
    };
    await pause();

    expect(fetchLibrary.callCount).to.equal(1);
    expect(fetchLibrary.args[0][0]).to.equal(wrapper.props()["uuid"]);

    expect(updateColor.callCount).to.equal(1);
    expect(updateColor.args[0][0]).to.equal("cancelled");
    expect(updateColor.args[0][1]).to.equal("production");
  });

  it("should re-render to reflect changes", async() => {
    let form = wrapper.find("form");

    expect(wrapper.state()["libraryStage"]).to.equal("production");
    expect(wrapper.state()["registryStage"]).to.equal("testing");
    expect(form.find("label").at(0).props().className).to.contain("success");
    expect(form.find("label").at(1).props().className).to.contain("warning");

    let items = wrapper.find("LibraryDetailItem");
    let libStage = items.findWhere(item => item.props().label === "library_stage");
    let regStage = items.findWhere(item => item.props().label === "registry_stage");
    expect(libStage.props().value).to.equal("production");
    expect(libStage.find("p").text()).to.equal("production");
    expect(regStage.props().value).to.equal("testing");
    expect(regStage.find("p").text()).to.equal("testing");

    let saveButton = form.find("button");
    saveButton.simulate("click");
    let newStages = { library_stage: "testing", registry_stage: "cancelled" };
    let fullLibrary = Object.assign({}, wrapper.props()["library"], newStages);
    wrapper.setProps({ fullLibrary });

    const pause = (): Promise<void> => {
      return new Promise<void>(resolve => setTimeout(resolve, 0));
    };
    await pause();

    expect(wrapper.state()["libraryStage"]).to.equal("testing");
    expect(wrapper.state()["registryStage"]).to.equal("cancelled");
    expect(form.find("label").at(0).props().className).to.contain("warning");
    expect(form.find("label").at(1).props().className).to.contain("danger");
    expect(libStage.props().value).to.equal("testing");
    expect(libStage.find("p").text()).to.equal("testing");
    expect(regStage.props().value).to.equal("cancelled");
    expect(regStage.find("p").text()).to.equal("cancelled");
  });

});
