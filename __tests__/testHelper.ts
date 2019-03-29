import { jsdom } from "jsdom";

/** Set up the DOM and global variables for tests. */
const doc = jsdom("<!doctype html><html><body></body></html>");
const win = doc.defaultView;

declare const global: any;
declare const require: any;

global["document"] = doc;
global["window"] = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

// Ignore imported stylesheets.
let noop = () => {};
require.extensions[".scss"] = noop;
