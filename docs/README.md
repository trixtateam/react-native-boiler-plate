# Documentation

## Table of Contents

- [General](general)
  - [**CLI Commands**](general/commands.md)
  - [Introduction ](general/introduction.md)
  - [Tool Configuration](general/files.md)
  - [Debugging](general/debugging.md)
  - [FAQ](general/faq.md)
  - [Gotchas](general/gotchas.md)
  - [Remove](general/remove.md)
- [Testing](testing)
  - [Unit Testing](testing/unit-testing.md)
  - [Component Testing](testing/component-testing.md)
- [JS](js)
  - [Phoenix-to-redux](https://github.com/trixtateam/phoenix-to-redux)
  - [Redux](js/redux.md)
  - [Immer](docs/js/immer.md)
  - [reselect](js/reselect.md)
  - [redux-saga](js/redux-saga.md)
- [Maintenance](maintenance)
  - [Dependency Update](maintenance/dependency.md)

## Overview

### Structure

The [`app/`](../../../tree/master/app) directory contains your entire application code, theme styles, sagas, screens, navigators

The rest of the folders and files only exist to make your life easier, and
should not need to be touched.

### JS

We bundle all your clientside scripts and chunk them into several files using
code splitting where possible. We then automatically optimize your code when
building for production so you don't have to worry about that.

See the [JS documentation](./js/README.md) for more information about the
JavaScript side of things.

### Testing

For a thorough explanation of the testing procedure, see the
[testing documentation](./testing/README.md)!

#### Unit testing

Unit tests live in `test/` directories right next to the components being tested
and are run with `npm run test`.
