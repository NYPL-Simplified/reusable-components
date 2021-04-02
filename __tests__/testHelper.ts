import { JSDOM } from "jsdom";
/** Set up the DOM and global variables for tests. */
const doc = new JSDOM("<!doctype html><html><body></body></html>") as any;
const window = doc.window;
window.Date = Date;
delete window.event;
export interface Global extends NodeJS.Global {
  document: Document;
  window: Window;
  navigator: { userAgent: string };
}
declare let global: Global;
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js",
};
// Ignore imported stylesheets.
let noop = () => {};
require.extensions[".scss"] = noop;
function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}
copyProps(window, global);
