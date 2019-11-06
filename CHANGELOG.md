## Changelog

### v1.3.17
#### Fixed
- Resized the font for centered buttons on forms.

### v1.3.16
#### Updated
- Updated the Input component to comply with accessibility standards. Added minor tweaks to the Form component and minor style updates.

### v1.3.15
#### Fixed
- Updated ref usage in the Tabs component to fix compatibility issues.

### v1.3.14
#### Updated
- Updated the Tabs component to comply with accessibility standards.

### v1.3.13
#### Updated
- Updated the Panel component to have aria attributes for accessibility. Added a static panel example to the Storybook instance.
- Added Travis CI hook to deploy Storybook to Github Pages on a successful pass on `master`.
- Updated the Header component with styling for the logo and optional nav element.

### v1.3.12
#### Updated
- Updated the Header and Tabs components for documentation purposes.

### v1.3.11
#### Updated
- Updated the Button component to render extra props, for aria-* attributes. Updated related styles for hover state.

### v1.3.10
#### Added
- Added `tslint-react-a11y` as a linter extension for checking for accessibility issues in the React components.
#### Updated
- Enabled optionally passing an onMouseDown handler to the Button

### v1.3.9
#### Updated
- Committed new version of package-lock.json

### v1.3.8
#### Added
- Updates and stories for the Form

### v1.3.7
#### Updated
- Committed new version of package-lock.json

### v1.3.6
#### Added
- More styling options for the Button component
- More stories for the Button component

### v1.3.5
#### Added
- Added `withInfo` Storybook addon to include better documentation for each component.

### v1.3.4
#### Updated
- Now React 16 for the build.

### v1.3.3
#### Fixed
- Color Contrast issue for the "danger" button style.
#### Added
- Stories for the Button component.

### v1.3.2
#### Fixed
- Fixed Button styling bug involving text color on focus.
#### Added
- Enabled optional specification of custom behavior on enter for the Panel component.  This fixes a bug whereby forms containing Panels would toggle the Panel on enter rather than submitting.

### v1.3.1
- Added additional configuration options to the Button component.

### v1.3.0
#### Added
- Storybook for documentation of the components. A static build can be seen on the [Github repo](https://nypl-simplified.github.io/reusable-components/).

### v1.2.0
#### Updated
- Updated to Webpack 4! This update also includes updates to many other npm packages.
- Tests were moved from inside the `src` folder to outside of it, that way Webpack will not include it in the build, as it is not needed in the final distribution.
#### Added
- Typescript has been updated to v2.7.2 and with that `typings` were removed and
`@types` were included.
#### Removed
- Cleaned up package.json. Many existing npm packages which are not used in this repo have not been removed as dependencies.
- The `opds-web-client` was removed from this repo as it is not needed and was only used to import scss files. The app breaks without it so one scss variable and one scss mixin were manually moved into this repo.
- `typings` were removed in favor of @types.

### v1.1.3
#### Fixed
- Fixed a minor styling bug involving the Panel component's behavior on hover

### v1.1.2
- Added additional configuration options to the Panel component

### v1.1.1
#### Updated
- Webpack configuration

### v1.1.0
- Working version to use as a package on npm
#### Added
- Added a file to export components
#### Updated
- Webpack configuration

### v1.0.0
#### Added
- Created a demo page

### v0.0.1
#### Added
- Set up the repo
