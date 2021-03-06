# Update Project Dependencies

Updating the dependencies is a tedious job. This doc is intended to help streamline the process and make it painless.

## Maintain Update Log

There's a sample `Update Log` at the end of this document. Create a new file where you can dump the Version Diff, Test results, Chrome/Node/npm versions. Mention the dependencies that you had to roll back along with the reason. Optionally you can mention the errors/warnings that you encountered while updating dependencies.

## Managing Node Versions

It is recommended that you use [Node Version Manager](https://github.com/creationix/nvm) or [Node Version Control](https://github.com/tj/n) to switch node versions quickly in order to run and test this project on multiple node versions.

## Update Tooling

**Update npm:**

1.  Run `npm install -g npm`
2.  Run `npm -v` and record npm version in `Update Log`.

**Update Chrome**

1.  Download the [latest version](https://www.google.com/chrome/browser/desktop/index.html) or go to [chrome://settings/](chrome://settings/) and update.

2.  Go to `Chrome -> About` and record version number in `Update Log`

## Update Dependencies

[npm-check-updates](https://github.com/tjunnone/npm-check-updates) is a great tool to update your dependencies. It will only update your `package.json`. Run `npm install` if you want to install updated package versions. There are 3 useful commands.

1.  `ncu -u --semverLevel minor`
2.  `ncu -u --semverLevel major`
3.  `ncu -u`

Confirm/adjust eslint-config-airbnb compatible [dependency versions](https://www.npmjs.com/package/eslint-config-airbnb)

`npm info "eslint-config-airbnb@latest" peerDependencies`

### Pinned Version Numbers

`react-native-boiler-plate` does not use "^", "~", etc., and these should be removed from `package.json`, if present.

At this point, you should copy and paste the version diff from the terminal into your `Update Log`.

## Correct Errors and Rollback Dependencies

Run `npm install` to install updated versions and then start the example app by running `npm start`. Make sure that the project is running smoothly. If not, track down the dependencies that are causing problems and try to roll them back one by one and check if the example application is running.

Note down the rolled back dependencies and state the reason in your `Update Log`.

## Full Regression Testing

Most of the errors/warnings would go away once you roll back the problematic dependencies. But we need to make sure that the internal commands, tools, scaffolding etc. are functional too.

# Sample Update Log

## Tooling Versions

- Node 8.11.4
- npm 6.4.0
- Mac OS 10.13.6
- Chrome 68.0.3440.106 (64-bit)

## :spiral_notepad: Notes

## :package: Version Diff

**[0] PATCH UPDATES**

```

```

**[1] MINOR UPDATES**

```

```

**[3] MAJOR UPDATES**

```
```

**[4] ROLLBACKS**

```
```

**[5] NEW DEPENDENCIES**

```
```

## Errors Encountered

