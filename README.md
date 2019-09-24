[![Build Status](https://travis-ci.com/abdelhay90/react-challenge.svg?token=u243kVU7psJjfYSkHAJK&branch=master)](https://travis-ci.com/abdelhay90/react-challenge)

## Application Docs

#### `Tools used:`

- `React`
- `Mobx`
- `Material UI`
- `React Hooks`
- `React MapGL` (Uber's Wrapper Library for `Mapbox`)
- `Cypress`
- `Jest`, `Enzyme`
- `eslint`
- `prettier`
- `jsinspect`
- `husky` for git hooks specially `pre-commit` hook to run `lint-staged` to checklint before commit and fix what needs to be fixed
- `localforage` a library used for use application cache and its fallback mechanism if `IndexedDB` not found in browser

#### `What have been done?`

- Creating map component, adding related layers to the map
- Draw the route on map
- Binding data to the UI (Trip Information, Bookings, Statistics, Payslips)
- Faking captain movement on map
- Movement on map is 30 seconds can be redefined in app constants
- Customer has pre-defined statuses on constants
- 3 charts has been bound to screen `Passengers Statistics`, `Pick up Station Statistics`, and `Checkout Status Statistics`
- Payslip having all customer and their charges
- Writing some Unit tests with coverage `77%`
- Cypress used as `e2e` test framework but only loading app is tested
- App Responsiveness

## Available Scripts

### In the project directory, you can run:

##### `npm start`

to start application in development mode

##### `npm test`

to run unit tests

##### `npm run build`

to build and application and getting application optimized build

##### `Applicatio URL`

http://react-challenge-riding.surge.sh/
