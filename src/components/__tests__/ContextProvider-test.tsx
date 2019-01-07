import { expect } from "chai";
import * as Enzyme from "enzyme";

import * as React from "react";
import { shallow } from "enzyme";

import ContextProvider from "../ContextProvider";
class FakeChild extends React.Component<any, any> {}

describe("ContextProvider", () => {
  let wrapper: Enzyme.ShallowWrapper<any, {}>;

  beforeEach(() => {
    wrapper = shallow(
      <ContextProvider csrfToken="token">
        <FakeChild />
      </ContextProvider>
    );
  });

  it("provides child context", () => {
    let instance = wrapper.instance() as any;
    let context = instance.getChildContext();
    expect(context.store.getState().libraries).to.be.ok;
    expect(context.store.getState().library).to.be.ok;
    expect(context.pathFor).to.equal(instance.pathFor);
  });

  it("renders child", () => {
    let children = wrapper.find(FakeChild);
    expect(children.length).to.equal(1);
  });

});
