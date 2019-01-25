import { expect } from "chai";
import * as Sinon from "sinon";
import buildStore from "../../../store";
import * as Enzyme from "enzyme";
import * as React from "react";
import { LogInForm } from "../LogInForm";

describe("LogInForm", () => {
  let wrapper;
  let store;
  let context;
  let logIn;
  beforeEach(() => {
    store = buildStore();
    context = { store };
    logIn = Sinon.stub();
    wrapper = Enzyme.mount(
      <LogInForm logIn={logIn} />, { context }
    );
  });
  it("should display a default title", () => {
    let title = wrapper.find(".form-title");
    expect(title.length).to.equal(1);
    expect(title.text()).to.equal("Log In");
  });
  it("should optionally display a custom title", () => {
    wrapper.setProps({ title: "Custom Title!" });
    let title = wrapper.find(".form-title");
    expect(title.length).to.equal(1);
    expect(title.text()).to.equal("Custom Title!");
  });
  it("should display a default legend", () => {
    let legend = wrapper.find("legend");
    expect(legend.length).to.equal(1);
    expect(legend.text()).to.equal("Credentials");
  })
  it("should optionally display a custom legend", () => {
    wrapper.setProps({ legend: "Something else..." });
    let legend = wrapper.find("legend");
    expect(legend.length).to.equal(1);
    expect(legend.text()).to.equal("Something else...");
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
  it("should optionally display an extra field", () => {
    let extra = <input type="text" key="extra" name="extra"/>;
    wrapper.setProps({ extraFields: [extra] });
    let inputs = wrapper.find("input");
    expect(inputs.length).to.equal(3);
    expect(inputs.at(2).props().name).to.equal("extra");
  });
  it("should display a button", () => {
    let button = wrapper.find("button");
    expect(button.text()).to.equal("Log In");
  });
  it("should submit on click", () => {
    let spySubmit = Sinon.spy(wrapper.instance(), "submit");
    wrapper.setProps({ submit: spySubmit });
    wrapper.find("button").simulate("click");
    expect(spySubmit.callCount).to.equal(1);
    spySubmit.restore();
  });
  it("should call logIn when the form is submitted", () => {
    const formData = new (window as any).FormData();
    formData.append("username", "Admin");
    formData.append("password", "12345");

    wrapper.instance().submit(formData);

    expect(logIn.callCount).to.equal(1);
    expect(logIn.args[0][0]).to.equal(formData);
    expect(logIn.args[0][0].get("username")).to.equal("Admin");
    expect(logIn.args[0][0].get("password")).to.equal("12345");
  });
});
