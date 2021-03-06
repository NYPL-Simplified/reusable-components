import * as React from "react";
import Panel from "./components/Panel";
import Header from "./components/Header";
import Form from "./components/Form";
import Fieldset from "./components/Fieldset";
import Input from "./components/Input";
import Tabs from "./components/Tabs";
import Button from "./components/Button";

export interface DemoState {
  lights: boolean;
  errorText: string;
  successText: string;
  infoText: string;
}

export default class Demo extends React.Component<{}, DemoState> {
  constructor(props) {
    super(props);
    this.state = { lights: true, errorText: null, successText: null, infoText: null };
    this.toggleLights = this.toggleLights.bind(this);
    this.makeTabItems = this.makeTabItems.bind(this);
    this.setError = this.setError.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.setInfo = this.setInfo.bind(this);
  }

  makeTabItems() {
    const COLORS = {
      "Red": {
        "#D0343A": "$red",
        "#97272C": "$red_dark",
        "#DE7175": "$red_tint",
        "#F6D6D8": "$red_error"
      },
      "Orange/Yellow": {
        "#FFB81D": "$orange",
        "#D2A74A": "$orange_desaturated",
        "#FEE24A": "$yellow",
        "#FFF1A5": "$yellow_tint"
      },
      "Green": {
        "#799A05": "$green",
        "#497629": "$green_dark",
        "#008918": "$green_bright",
        "#F3F7E6": "$green_tint"
      },
      "Blue": {
        "#07818D": "$teal",
        "#047074": "$teal-dark",
        "#83C0C6": "$teal-tint",
        "#1B7FA7": "$blue",
        "#135772": "$blue-dark",
        "#73C7E8": "$light-blue",
        "#D1E5ED": "$blue-tint"
      },
      "Gray": {
        "#776E64": "$gray",
        "#D7D4D0": "$light-gray",
        "#DDDDDD": "$medium-gray",
        "#080807": "$dark-gray",
        "#54514A": "$gray-brown",
        "#111111": "$black",
        "#F5F4F3": "$gray-tint"
      }
    };

    let items = {};
    Object.keys(COLORS).forEach((colorCategory: string) => {
      items[colorCategory] = this.makeColorList(COLORS[colorCategory]);
    });
    return items;
  }

  toggleLights() {
    this.setState({...this.state, ...{ lights: !this.state.lights }});
  }

  makeColorList(colors: {}): JSX.Element {
    return (
      <ul
        className="clearfix"
        style={{margin: "0", backgroundColor: `${this.state.lights ? "#fff" : "#000"}`}}
      >
        { Object.entries(colors).map(color => this.makeColorSwatch(color)) }
      </ul>
    );
  }

  makeColorSwatch(info: string[] | {}): JSX.Element {
    const liStyle = {
      display: "flex",
      float: "left",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px",
      color: `${this.state.lights ? "#000" : "#fff"}`
    } as React.CSSProperties;
    const swatch = {
      height: "140px",
      width: "140px",
      clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
      display: "flex",
      alignItems: "center"
    };
    const hexCodeStyle = {
      display: "block",
      width: "100%",
      padding: "30px 0",
      textAlign: "center",
      color: "#000",
      background: "rgba(255, 255, 255, 0.7)",
      clipPath: "polygon(100% 50%, 0% 0%, 0% 50%, 100% 100%)"
    } as React.CSSProperties;
    let style = {...swatch, ...{background: info[0]}};
    return (
      <li className="clearfix" style={liStyle} key={`${info}`}>
        <label>{info[1]}</label>
        <div style={style}><span style={hexCodeStyle}>{info[0]}</span></div>
      </li>
    );
  }

  setError() {
    this.setState({lights: this.state.lights, errorText: "ERROR", successText: null, infoText: null});
  }
  setSuccess() {
    this.setState({lights: this.state.lights, errorText: null, successText: "SUCCESS", infoText: null});
  }
  setInfo() {
    this.setState({lights: this.state.lights, errorText: null, successText: null, infoText: "INFO"});
  }

  render(): JSX.Element {
    let panelBody = <span>Your panel content goes here!</span>;

    let fieldset: JSX.Element = (
      <Fieldset
        key="fieldset"
        legend="This is a fieldset"
        elements={[
          <Input key="input" label="An input field" name="name" id="input-demo" />
        ]}
      />
    );

    return (
      <div id="demo">
        <Header text="Welcome to the demo page!" imgSrc="./logo.png" logOut="#" />
        <div className="list">
          <Panel id="default" headerText="The default panel" content={panelBody} />
          <Panel id="success" headerText="Success panel" style="success" content={panelBody} />
          <Panel id="warning" headerText="Warning panel" style="warning" content={panelBody} />
          <Panel id="danger" headerText="Danger panel" style="danger" content={panelBody} />
          <hr></hr>
          <section style={{display: "flex", justifyContent: "space-between", width: "42%", margin: "20px"}}>
            <Button callback={this.setError} content="Error message" />
            <Button callback={this.setSuccess} content="Success message" />
            <Button callback={this.setInfo} content="Info message" />
          </section>
          <Form
            title="This is a form"
            onSubmit={() => alert("You have submitted the form!")}
            content={[fieldset]}
            buttonContent="This is a submit button"
            errorText={this.state.errorText}
            successText={this.state.successText}
            infoText={this.state.infoText}
          />
          <hr></hr>
          <div style={{marginLeft: "20px"}}>
            <p>
              This is the Tabs component!
              It is being used here to display the custom colors used throughout this package.
              Click the button to see how the colors look against a {this.state.lights ? "black" : "white"} background.
            </p>
            <Button
              callback={this.toggleLights}
              content={`Turn ${this.state.lights ? "off" : "on"} the lights!`}
            />
          </div>
          <Tabs items={this.makeTabItems()} uniqueId="demo"/>
        </div>
      </div>
    );
  }
}
