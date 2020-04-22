# Gotchas

These are some things to be aware of when using this boilerplate.
- [Load reducers optimistically](#load-reducers-optimistically)
- [Cleaning up cache](#cleaning-up-cache)


## Load reducers optimistically

If you have containers that should be available throughout the app, like a `NavigationBar` (they aren't route specific), you need to add their respective reducers to the root reducer with the help of `combineReducers`.

```js
// In app/reducers.js

...
import { combineReducers } from 'redux';
...

import navigationBarReducer from 'containers/NavigationBar/reducer';

export default combineReducers({
  global: globalReducer,
  navigationBar: navigationBarReducer,
  ...injectedReducers,
});
```

## Cleaning up cache

`npm run reset`
