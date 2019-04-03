import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Tabs from '../src/components/Tabs';

const tabs = storiesOf('Components/Tabs', module)
  .add('with items', () => {
    const makeTabItems = () => {
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
        items[colorCategory] = makeColorList(COLORS[colorCategory]);
      });
      return items;
    };
  
    const makeColorList = (colors: {}) => (
      <ul className="clearfix" style={{margin: "0", backgroundColor: "#fff"}}>
        { Object.entries(colors).map(color => makeColorSwatch(color)) }
      </ul>
    );
  
    const makeColorSwatch = (info: string[] | {}) => {
      const liStyle = {
        display: "flex",
        float: "left",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
        color: "#000"
      };
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
      };
      let style = {...swatch, ...{background: info[0]}};
      return (
        <li className="clearfix" style={liStyle} key={`${info}`}>
          <label>{info[1]}</label>
          <div style={style}><span style={hexCodeStyle}>{info[0]}</span></div>
        </li>
      );
    }

    return <Tabs items={makeTabItems()} />;
  });

export default tabs;
