# Command Line Commands
## Development
### IOS
```Shell
npm run ios
```
### Android
```Shell
npm run android
```
Starts the metro server running on `http://localhost:8081`

## Reset
Reset react native cache
```Shell
npm run reset
```

## Generators

```Shell
npm run generate
```

Allows you to auto-generate boilerplate code for common parts of your
application, specifically `component`s, and `container`s. You can
also run `npm run generate <part>` to skip the first selection. (e.g. `npm run generate container`)

## Testing

See the [testing documentation](../testing/README.md) for detailed information
about our testing setup!

## Unit testing

```Shell
npm test
```

Tests your application with the unit tests specified in the `**/tests/*.js` files
throughout the application.
All the `test` commands allow an optional `-- [string]` argument to filter
the tests run by Jest. Useful if you need to run a specific test only.

```Shell
# Run only the Button component tests
npm test -- Button
```

## Linting

```Shell
npm run lint
```

Lints your JavaScript and your CSS.

```Shell
npm run lint-fix
```

Lints your code and tries to fix any errors it finds.

```Shell
npm run pretier-fix
```

Pretify your code and tries to fix any errors it finds.


## Rename app
[react-native-rename](https://github.com/junedomingo/react-native-rename)
Rename your application to whatever you want. Beaware of the [issue](https://github.com/junedomingo/react-native-rename/issues/72) deleting your android files. Discard local git changes and move the files
over to the new folder name location. android\app\src\main\java\
```Shell
npx react-native-rename 'nameofapp'
```

## Debugging

### Android
```Shell
npm run android-logging
```

### IOS
```Shell
npm run ios-logging
```
