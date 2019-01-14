import { expect } from "chai";
import { stub, spy } from "sinon";
import buildStore from "../../../store";
import * as Enzyme from "enzyme";
import * as React from "react";
import LogInForm from "../LogInForm";

describe("LogInForm", () => {
  let wrapper;
  let store;
  let context;
  beforeEach(() => {
    store = buildStore();
    context = { store };
    wrapper = Enzyme.mount(
      <LogInForm/>, { context }
    );
  });
  it("should display a title", () => {
    let title = wrapper.find(".form-title");
    expect(title.length).to.equal(1);
    expect(title.text()).to.equal("Library Registry Interface");
  });
  it("should display a username field with a label", () => {
    let usernameLabel = wrapper.find("fieldset").find("label").at(0);
    expect(usernameLabel.text()).to.equal("Username");
    let username = wrapper.find("[name='username']");
    expect(username.length).to.equal(1);
  });
  it("should display a password field with a label", () => {
    let passwordLabel = wrapper.find("fieldset").find("label").at(1);
    expect(passwordLabel.text()).to.equal("Password");
    let password = wrapper.find("[name='password']");
    expect(password.length).to.equal(1);
  });
  it("should display a button", () => {
    let button = wrapper.find("button");
    expect(button.text()).to.equal("Log In");
  });
});
