# PhoenixJS
[Phoenix channels](https://hexdocs.pm/phoenix/channels.html#the-moving-parts) are highly reliant, fast and robust. The phoenix js 
package makes it very easy to setup a connection and listen on channels and respond on channels.

Check out the [official documentation](https://hexdocs.pm/phoenix/js/index.html)
for a good explanation of the more intricate benefits it has.

## Where it is implemented
Everything needed to connect and wire phoenix channels can be found in
[`phoenix`](./app/phoenix/) folder. 

[`actions.js`](https://github.com/trixtateam/react-phoenix-boiler-plate/blob/master/app/phoenix/actions.js)  - includes all actions that will be dispatched to the `phoenix reducer`

[`constants.js`](https://github.com/trixtateam/react-phoenix-boiler-plate/blob/master/app/phoenix/constants.js) - includes all constants related to phoenix implementation

[`reducer.js`](https://github.com/trixtateam/react-phoenix-boiler-plate/blob/master/app/phoenix/reducer.js) - includes the `phoenix reducer` which holds the socket and all connected channels

[`selectors.js`](https://github.com/trixtateam/react-phoenix-boiler-plate/blob/master/app/phoenix/selectors.js) - includes the reselect `redux selectors` from the `phoenix reducer`

[`socketSagas`](https://github.com/trixtateam/react-phoenix-boiler-plate/blob/master/app/phoenix/socketSagas.js) - includes all saga functions related to phoenix implementation

[`utils`](https://github.com/trixtateam/react-phoenix-boiler-plate/blob/master/app/phoenix/utils.js) - includes all helper methods related to phoenix implementation

## How it is implemented

In the [`phoenix reducer`](https://github.com/trixtateam/react-phoenix-boiler-plate/blob/master/app/phoenix/reducer.js) we keep the socket and all channels. This keeps a context of our phoenix socket alive we
listen for any actions dispatched to this reducer related to sockets and channels. If we join or leave a channel, we update 
the socket in the reducer with updated socket

## Usage

### Components
Include the `dispatch` function in your component with `mapDispatchToProps`
```JS
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    dispatchRequestAuthentication: (data) =>
      dispatch(requestAuthentication({ dispatch, data })),
  };
}
```

### Actions
In our actions to dispatch to the reducer we need to always include the dispatch function to pass to the phoenix channel
helper methods. `dispatchRequestAuthentication` is passing the data to our `requestAuthentication` including the dispatch function. Always
use the `data` key to pass data

```JS
import {
  REQUEST_LOGIN,
} from '/constants';

export function requestAuthentication({ dispatch, data }) {
  return {
    type: REQUEST_LOGIN,
    dispatch,
    data,
  };
}
```

### Sagas
In our saga for a container we can connect a socket and get a channel using either
`getChannel` or `getAnonymousChannel` helper methods. These helper methods create a socket using the
saved local storage locations `SOCKET_DOMAIN,PHOENIX_TOKEN,AGENT_ID` .

`getChannel` - this function gets the socket from the `phoenix reducer`, checks for the given channel if it exists, if it does and the 
eventArrayMap is not included will update the listening events for the channel with the ones specified.
```JS
  const socket = yield getChannel({
       dispatch,
       channelName: 'channel name',
       eventArrayMap: [
         {
           eventName: 'event name for phoenix channel',
           eventActionType: 'action name for event name to bind to your reducer',
         },
       ],
     });
```

`getAnonymousChannel` - this function gets a socket for a given channel without passing any parameters `PHOENIX_TOKEN,AGENT_ID` . Generally used
for obtaining an authentication token for future authenticated channel joins
```JS
    const socket = yield getAnonymousChannel({ dispatch, channelName });
```


`pushToChannel` - this function expects the socket you receive from `getChannel`. On pushing
 something to the channel if a `loadingStatusKey` is provided that connected [LoadingStatusContainer](css/react-semantic-ui.md#LoadingStatusContainer) 
 in your component will show progress. On any `CHANNEL_OK, CHANNEL_TIMEOUT,CHANNEL_ERROR,CHANNEL_JOINED` an `END_PROGRESS` action will be
 dispatched to the `app reducer` clearing  any `loadingStatusKey` or `loading` values.
 There are quite a few other parameters we can pass to this function
```
 @param{function} dispatch
 * @param{string} channelName - Name of channel/Topic
 * @param{number} loaderTimeout - timeout in milliseconds if you want to delay the end progress of the loading indicator
 * @param{string} eventName - the name of the event on channel to push to
 * @param{?string} customOKResponseEvent - action type to dispatch to on response from pushing to channel
 * @param{?string} customErrorResponseEvent -  action type to dispatch to on error from pushing to channel
 * @param{object} requestData - data payload to push on the channel
 * @param{object} socket - phoenix socket
 * @param{?object} extraData - this object will merge with the response data object received from the channel
 * for you to use on later note
 * @param{?boolean} dispatchGlobalError - false by default, determines if should an
 * on channel error occur show it to the user via a toast
 * @param{?number} defaultTimeout - timeout in milliseconds for pushing to the channel, default is 1500
 * @param{?boolean || string} customTimeoutEvent - action type to dispatch to on timeout from pushing to channel
 * @param{?string} loadingStatusKey - key to push to app reducer to set loading status on
```

```JS
const socket = yield getChannel({
       dispatch,
       channelName: 'channel name',
       eventArrayMap: [
         {
           eventName: 'event name for phoenix channel',
           eventActionType: 'action name for event name to bind to your reducer',
         },
       ],
     });
  yield pushToChannel({
          dispatch,
          channelName,
          loaderTimeout,
          eventName,
          customOKResponseEvent = null,
          customErrorResponseEvent = null,
          requestData,
          socket,
          extraData = null,
          dispatchGlobalError = false,
          defaultTimeout = 15000,
          customTimeoutEvent = false,
          loadingStatusKey = null,
        }) 
```


## Saga Example

In our saga for a container we listen for the dispatched action `REQUEST_LOGIN` and respond with `loginSaga` function

```JS
export default function* loginPageSaga() {
  // listen for REQUEST_LOGIN action 
  yield takeLatest(REQUEST_LOGIN, loginSaga);
// listen for REQUEST_LOGIN_SUCCESS action 
  yield takeLatest(REQUEST_LOGIN_SUCCESS, handleLoginSuccessSaga);
// listen for REQUEST_LOGIN_FAILURE action 
  yield takeLatest(REQUEST_LOGIN_FAILURE, handleLoginFailureSaga);
}
```


On `REQUEST_LOGIN` the below `loginSaga` function is going to do the following


```JS
/**
 *
 * @param dispatch
 * @param data
 * @returns {IterableIterator<IterableIterator<*>|void|*>}
 */
export function* loginSaga({ dispatch, data }) {
  try {
    // show loading indicator
    yield put(loggingIn());
    const channelName = socketChannels.AUTHENTICATION;
    // get the login domain data passed from the requestAuthentication action
    const domainDetails = _.get(data, 'domain', '');
    const domain = formatSocketDomain({ domainString: domainDetails });
    setLocalStorageItem(SOCKET_DOMAIN, domain);
    // get the anonymous channel and socket
    const socket = yield getAnonymousChannel({ dispatch, channelName });
    // push the data to socketChannels.AUTHENTICATION
    // domainDetails will be available on the response because its pass as extraData
    // on OK response from channel dispatch REQUEST_LOGIN_SUCCESS
    // on error response from channel dispatch REQUEST_LOGIN_FAILURE
    yield pushToChannel({
      dispatch,
      channelName,
      eventName: authenticationEvents.LOGIN,
      customOKResponseEvent: REQUEST_LOGIN_SUCCESS,
      customErrorResponseEvent: REQUEST_LOGIN_FAILURE,
      requestData: data,
      extraData: { domainDetails },
      socket,
      dispatchGlobalError: true,
      customerTimeoutEvent: REQUEST_LOGIN_TIMEOUT,
    });
  } catch (error) {
    yield put(loginFailed(error));
    yield put(updateError({ error: error.toString() }));
  }
}
```

On `REQUEST_LOGIN_SUCCESS` the below `handleLoginSuccessSaga` function is going to do the following
```JS
/**
 *
 * @param data
 * @param dispatch
 * @returns {IterableIterator<*>}
 */
export function* handleLoginSuccessSaga({ data, dispatch }) {
  // on success of login take the response data
  if (data) {
    const routeLocation = yield select(makeSelectRouteLocation());
    const redirectUrl = getAuthenticationRedirectUrl({
      routeLocation,
      defaultUrl: routePaths.HOME_PAGE,
    });
    // eslint-disable-next-line camelcase
    // extraData you passed
    const domainDetails = _.get(data, 'domainDetails');
    const agent_id = _.get(data, 'agent_id', '');
    const identity = _.get(data, 'identity', '');
    const jwt = _.get(data, 'jwt', '');
    // eslint-disable-next-line camelcase
    const role_ids = _.get(data, 'role_ids', '');
    const loginResponse = {
      agent_id,
      identity,
      jwt,
      role_ids,
    };
    yield put(updateCurrentUser(loginResponse));
    // Reset/Upgrade socket to latest authorization
    const socket = yield select(makeSelectSocket());
    disconnectSocket(socket);
    yield put(push(redirectUrl));
  } else {
    yield put(loginFailed());
  }
}
```

On `REQUEST_LOGIN_FAILURE` the below `handleLoginFailureSaga` function is going to do the following
```JS
export function* handleLoginFailureSaga(error) {
  yield put(
    updateError({
      error: _.get(error.data, 'reason', 'Authentication Failed'),
    }),
  );
  yield put(defaultLoad());
}

```

