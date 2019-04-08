# reusable-components
Reusable React components shared across the Library Simplified interfaces. 

[![npm version](https://badge.fury.io/js/library-simplified-reusable-components.svg)](https://badge.fury.io/js/library-simplified-reusable-components)

[![Build Status](https://travis-ci.com/NYPL-Simplified/reusable-components.svg?branch=development)](https://travis-ci.com/NYPL-Simplified/reusable-components)

## Library Simplified Documentation

To see screenshots, read in-depth documentation, and find out more about the project, check out the [Confluence](https://confluence.nypl.org/display/SIM/) site hosted by The New York Public Library.

To find documentation for the components in this repo (a work in progress), find it on our [Storybook documentation page](https://nypl-simplified.github.io/reusable-components).

## npm package

This package is [published to npm](https://www.npmjs.com/package/library-simplified-reusable-components).

The `library-simplified-reusable-components` components is currently used in the Circulation Admin and the Registry Admin imported through npm. If you want to import the React components into your app, simply run `npm install --save library-simplified-reusable-components`.

### Publishing

To publish a new version, you need to have an npm account and be a collaborator on the package. Once a new feature or update has been merged into `master`, then you can run `npm publish` locally to publish a new version. Make sure it is on the `master` branch and that `package.json` is updated accordingly.

## Tests

Like the codebase, all the unit tests are written in Typescript. Tests are written for all React components and can be found in the `__tests__` folder.

To run the tests, perform `npm test`.

We use Travis CI for continuous integration. Any pull requests submitted must have tests and those tests must pass on Travis CI.

## Storybook

We are using [Storybook](https://storybook.js.org/) to document the React components found in this package.

To run Storybook locally, run `npm run storybook` and the Storybook server will start and go to localhost:6006 automatically. Any changes to the stories files under `/stories` will hot reload.

### Github Pages

You can build and deploy a static version of the Storybook documentation _without_ having to commit and push changes to master. This is not recommended as the documentation can then be ahead of the `master` branch. Once a feature branch or any updates are merged into `master`, it is recommended to _then_ deploy the static build of the Storybook documentation. This can be done by running `npm run deploy-storybook`. If you have access to the Github repo, the `gh-pages` branch will automatically be updated and you can view updates on [Github](https://nypl-simplified.github.io/reusable-components/).

## License

```
Copyright © 2015 The New York Public Library, Astor, Lenox, and Tilden Foundations

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
