# Frequently Asked Questions

- [Frequently Asked Questions](#frequently-asked-questions)
  - [Where are Babel, Prettier and ESLint configured?](#where-are-babel-prettier-and-eslint-configured)
    - [Where do I put the reducer?](#where-do-i-put-the-reducer)
  - [How to keep my project up-to-date with `react-native-boiler-plate`?](#how-to-keep-my-project-up-to-date-with-react-native-boiler-plate)
  - [Have another question?](#have-another-question)

## Where are Babel, Prettier and ESLint configured?

ESLint, Babel and Prettier all have their own config files in the root of the project. Same for Jest and stylelint.

### Where do I put the reducer?

While you can include the reducer statically in `reducers.js`, we don't recommend this as you lose
the benefits of code splitting. Instead, add it as a _composed reducer_. This means that you
pass actions onward to a second reducer from a lower-level route reducer like so:

```JS
// Main route reducer

function myReducerOfRoute(state, action) {
  switch (action.type) {
    case SOME_OTHER_ACTION:
      return someOtherReducer(state, action);
  }
}
```

That way, you still get the code splitting at route level, but avoid having a static `combineReducers`
call that includes all of them by default.

_See [this and the following lesson](https://egghead.io/lessons/javascript-redux-reducer-composition-with-arrays?course=getting-started-with-redux) of the egghead.io Redux course for more information about reducer composition!_


## How to keep my project up-to-date with `react-native-boiler-plate`?

While it's possible to keep your project up-to-date or "in sync" with `react-native-boiler-plate`, it's usually
very difficult and is therefore **_at your own risk_** and not recommended. You should not need to do it either, as
every version you use will be amazing! There is a long term goal to make this much easier but no ETA at the moment.

## Have another question?

Submit an [issue](https://github.com/trixtateam/react-native-boiler-plate/issues)
