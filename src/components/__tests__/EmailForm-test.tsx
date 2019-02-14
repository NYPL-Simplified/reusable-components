import { expect } from "chai";
import * as Sinon from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import buildStore from "../../store";
import { EmailForm } from "../EmailForm";

describe("EmailForm", () => {
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  let store;
  let email: Sinon.SinonSpy;

  beforeEach(() => {
    let library = {
      uuid: "UUID1",
      basic_info: {
        "name": "Test Library 1",
        "short_name": "lib1",
        "description": undefined
      },
      urls_and_contact: {
        "authentication_url": "auth1",
        "contact_email": "email1",
        "opds_url": "opds1",
        "web_url": "web1",
        "validated": "Not validated"
      },
      stages: {
        "library_stage": "production",
        "registry_stage": "testing"
      }
    };
    store = buildStore();
    email = Sinon.stub();
    wrapper = Enzyme.mount(
      <EmailForm store={store} library={library} email={email}/>
    );
  });

  it("renders a form with a title, a hidden value, and a button", () => {
    expect(wrapper.find(".validation").length).to.equal(1);

    let title = wrapper.find(".form-title");
    expect(title.length).to.equal(1);
    expect(title.text()).to.equal("Validation");

    let hiddenInput = wrapper.find("[type='hidden']");
    expect(hiddenInput.length).to.equal(1);
    expect(hiddenInput.prop("name")).to.equal("uuid");
    expect(hiddenInput.prop("value")).to.equal("UUID1");

    let button = wrapper.find("button");
    expect(button.length).to.equal(1);
  });

  it("displays the correct button content", () => {
    let button = wrapper.find("button");
    expect(button.text()).to.contain("Send Validation Email");
    expect(button.prop("disabled")).not.to.be.true;

    let library = wrapper.prop("library");
    let validated = Object.assign(library.urls_and_contact, { "validated": "validation time" });
    wrapper.setProps({ library: Object.assign(library, { urls_and_contact: validated })});
    button = wrapper.find("button");
    expect(button.text()).to.contain("Send Validation Email");
    expect(button.prop("disabled")).not.to.be.true;

    let noEmail = Object.assign(library.urls_and_contact, { contact_email: null });
    wrapper.setProps({ library: Object.assign(library, { urls_and_contact: noEmail })});
    button = wrapper.find("button");
    expect(button.text()).to.equal("No email address configured");
    expect(button.prop("disabled")).to.be.true;
  });

  it("displays the correct button icon", () => {
    let icon = wrapper.find("button").find("svg");
    expect(icon.length).to.equal(0);

    wrapper.setState({ sent: true });

    icon = wrapper.find("button").find("svg");
    expect(icon.length).to.equal(1);
    expect(icon.hasClass("check-solo-icon")).to.be.true;
  });

  it("displays an info message", () => {
    let info = wrapper.find(".alert-info");
    expect(info.length).to.equal(0);

    let library = wrapper.prop("library");
    let validated = Object.assign(library.urls_and_contact, { "validated": "validation time" });
    wrapper.setProps({ library: Object.assign(library, { urls_and_contact: validated })});

    info = wrapper.find(".alert-info");
    expect(info.length).to.equal(1);
    expect(info.text()).to.equal("Already validated");

    // Hide the info message if there's a success message or an error message to display instead
    wrapper.setState({ sent: true });
    info = wrapper.find(".alert-info");
    expect(info.length).to.equal(0);

    wrapper.setProps({ error: { response: "Failed to send email" } });
    info = wrapper.find(".alert-info");
    expect(info.length).to.equal(0);
  });

  it("submits on click", async () => {
    expect(wrapper.state()["sent"]).to.be.false;
    wrapper.find("button").simulate("click");
    expect(email.callCount).to.equal(1);
    expect(email.args[0][0].get("uuid")).to.equal("UUID1");

    const pause = (): Promise<void> => {
      return new Promise<void>(resolve => setTimeout(resolve, 0));
    };
    await pause();

    expect(wrapper.state()["sent"]).to.be.true;
  });

  it("does not set 'sent' to true if there is an error", async () => {
    expect(wrapper.state()["sent"]).to.be.false;
    wrapper.find("button").simulate("click");


    const pause = (): Promise<void> => {
      return new Promise<any>((resolve, reject) => {
        reject({ message: "email failure" });
      });
    };

    expect(wrapper.state()["sent"]).to.be.false;
    expect(wrapper.find("button").find("svg").length).to.equal(0);
  });

  it("displays a success message", () => {
    let successMessage = wrapper.find(".alert-success");
    expect(successMessage.length).to.equal(0);

    wrapper.setState({ sent: true });

    successMessage = wrapper.find(".alert-success");
    expect(successMessage.length).to.equal(1);
    expect(successMessage.text()).to.equal("Validation email successfully sent to email1");
  });

  it("displays an error message", () => {
    let errorMessage = wrapper.find(".alert-danger");
    expect(errorMessage.length).to.equal(0);

    wrapper.setProps({ error: { response: "Failed to send email" } });

    errorMessage = wrapper.find(".alert-danger");
    expect(errorMessage.length).to.equal(1);
    expect(errorMessage.text()).to.equal("Failed to send email");
  });

});
