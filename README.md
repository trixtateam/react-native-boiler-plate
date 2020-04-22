<img src="https://hackernoon.com/hn-images/1*ub1DguhAtkCLvhUGuVGr6w.png" alt="react native boilerplate banner" align="center" />

<br />

<div align="center"><strong>Start your next react native project in seconds</strong></div>
<br />

<div align="center">
  <!-- Dependency Status -->
  <a href="https://david-dm.org/trixtateam/react-native-boiler-plate">
    <img src="https://david-dm.org/trixtateam/react-native-boiler-plate.svg" alt="Dependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/trixtateam/react-native-boiler-plate#info=devDependencies">
    <img src="https://david-dm.org/trixtateam/react-native-boiler-plate/dev-status.svg" alt="devDependency Status" />
  </a>
</div>
<br />
<br />
<div align="center">
  <sub>Inspired by <a href="https://twitter.com/mxstbr">Max Stoiber's</a> <a href="https://github.com/react-boilerplate/react-boilerplate">React Boiler Plate</a>.</sub>
</div>

<br />

<div align="center">
  <sub>Created by <a href="https://github.com/jacqueswho">Jacques Nel</a>.</sub>
  <br/>
  <sub>Integrating React Native with <a href="https://hexdocs.pm/phoenix/channels.html#the-moving-parts">Phoenix Channels</a></sub>
</div>

## Features

<dl>
  <dt>Quick scaffolding</dt>
  <dd>Create components, containers, navigators, selectors and sagas - and their tests - right from the CLI!</dd>

  <dt>Instant feedback</dt>
  <dd>Enjoy the best DX (Developer eXperience) and code your app at the speed of thought! Your saved changes to the styles and JS are reflected instantaneously without refreshing the app. Preserve application state even when you update something in the underlying code!</dd>

  <dt>Predictable state management</dt>
  <dd>Unidirectional data flow allows for change logging and time travel debugging.</dd>

  <dt>Next generation JavaScript</dt>
  <dd>Use template strings, object destructuring, arrow functions, JSX syntax and more.</dd>
  
  <dt>Redux Integration</dt>
    <dd>Use template strings, object destructuring, arrow functions, JSX syntax and more.</dd>
    
  <dt>Redux Saga Integration</dt>
  <dd>Executing logic in an asynchronous way without ending in callback hell.
   Sagas are triggered by Redux actions and can also trigger Redux actions to alter state. By using JavaScript generators (`yield`), sagas are written in a synchronous-like manner while still executing asynchronously.</dd>
  
</dl>

## Quick start

1.  Make sure that you have Node.js v8.10 and npm v5 or above installed.
2.  Follow the [getting started guide](https://reactnative.dev/docs/environment-setup)
3.  Clone this repo using `git clone --depth=1 https://github.com/trixtateam/react-native-boiler-plate.git <YOUR_PROJECT_NAME>`
4.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.<br />
5.  Run `npm run install` in order to install dependencies and clean the git repo.<br />


### Android

- only the first time you run the project, you need to generate a debug key with:
  - `cd android/app`
  - `keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000`
  - `cd ../..` to come back to the root folder
- `npm run start` to start the metro bundler, in a dedicated terminal
- `npm run android` to run the Android application (remember to start a simulator or connect an Android phone)

### iOS

- `cd ios`
- `pod install` to install pod dependencies
- `cd ..` to come back to the root folder
- `npm run start` to start the metro bundler, in a dedicated terminal
- `npm run ios` to run the iOS application (remember to start a simulator or connect an iPhone phone)

Now you're ready to rumble!
## Documentation

- [**The Hitchhikers Guide to `react-native-boiler-plate`**](docs/general/introduction.md): An introduction for newcomers to this boilerplate.
- [Overview](docs/general): A short overview of the included tools
- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [Testing](docs/testing): How to work with the built-in test harness
- [Your app](docs/js): Supercharging your app with Navigation, Redux, simple
  asynchronicity helpers, etc.
- [**Troubleshooting**](docs/general/gotchas.md): Solutions to common problems faced by developers.

## Supporters

<a href="https://github.com/jacqueswho" target="_blank"><img src="https://avatars1.githubusercontent.com/u/4375492?s=460&u=647ce553024114d52deea71dd01303f70fe68805&v=4" height="50px"></a>

## License

This project is licensed under the MIT license, Copyright (c) 2019  Jacques
Nel. For more information see `LICENSE.md`.
