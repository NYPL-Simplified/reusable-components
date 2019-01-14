import { expect } from "chai";
import { spy } from "sinon";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { mount } from "enzyme";

const RegistryAdmin = require("../index");
import ContextProvider from "../components/ContextProvider";
import { Router } from "react-router";

describe("RegistryAdmin", () => {
  it("renders ContextProvider", () => {
    const renderSpy = spy(ReactDOM, "render");
    new RegistryAdmin({ username: "admin" });
    expect(renderSpy.callCount).to.equal(1);
    const component = renderSpy.args[0][0];
    const wrapper = mount(component);
    const provider = wrapper.find(ContextProvider);
    expect(provider.length).to.equal(1);
    renderSpy.restore();
  });

  it("renders Router", () => {
    const renderSpy = spy(ReactDOM, "render");
    new RegistryAdmin({ username: "admin" });
    expect(renderSpy.callCount).to.equal(1);
    const component = renderSpy.args[0][0];
    const wrapper = mount(component);
    const router = wrapper.find(Router);
    expect(router.length).to.equal(1);
    renderSpy.restore();
  });

  it("renders log in form", () => {
    const renderSpy = spy(ReactDOM, "render");
    new RegistryAdmin({ username: "" });
    expect(renderSpy.callCount).to.equal(1);
    const component = renderSpy.args[0][0];
    const wrapper = mount(component);
    let form = wrapper.find("form");
    expect(form.length).to.equal(1);
    expect(form.find(".form-title").text()).to.equal("Library Registry Interface");
  });
});
