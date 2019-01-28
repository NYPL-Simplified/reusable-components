import { expect } from "chai";

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Enzyme from "enzyme";
import * as Sinon from "sinon";

const RegistryAdmin = require("../index");
import ContextProvider from "../components/ContextProvider";
import { Router, Route } from "react-router";

describe("RegistryAdmin", () => {
  it("renders ContextProvider", () => {
    const renderSpy = Sinon.spy(ReactDOM, "render");
    new RegistryAdmin({ username: "" });
    expect(renderSpy.callCount).to.equal(1);
    const component = renderSpy.args[0][0];
    const wrapper = Enzyme.mount(component);
    const provider = wrapper.find(ContextProvider);
    expect(provider.length).to.equal(1);
    renderSpy.restore();
  });

  it("renders Router", () => {
    const renderSpy = Sinon.spy(ReactDOM, "render");
    new RegistryAdmin({ username: "Admin" });
    expect(renderSpy.callCount).to.equal(1);
    const component = renderSpy.args[0][0];
    const wrapper = Enzyme.mount(component);
    const router = wrapper.find(Router);
    expect(router.length).to.equal(1);
    renderSpy.restore();
  });

  it("renders log in form", () => {
    const renderSpy = Sinon.spy(ReactDOM, "render");
    new RegistryAdmin({ username: "" });
    expect(renderSpy.callCount).to.equal(1);
    const component = renderSpy.args[0][0];
    const wrapper = Enzyme.mount(component);
    let form = wrapper.find("form");
    expect(form.length).to.equal(1);
    expect(form.find(".form-title").text()).to.equal("Library Registry Interface");
    renderSpy.restore();
  });
});
