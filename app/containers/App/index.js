/**
 *
 * App
 *
 * This component is the skeleton around the actual screen, and should only
 * contain code that should be seen on all screen. (e.g. navigation bar)
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar, Dimensions } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperLightTheme,
  DarkTheme as PaperDarkTheme,
  configureFonts,
} from 'react-native-paper';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectCurrentSession } from './selectors';
import SplashScreen from '../SplashScreen/SplashScreen';
import { checkForToken, signOut } from './actions';
import AuthenticationScreenStack from '../../navigators/AuthenticationScreenStack';
import { screenNames } from '../../navigators/RouteNames';
import Animated from 'react-native-reanimated';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AppScreenTabs from '../../navigators/AppScreenTabs';
import { PERSISTENCE_KEY, THEME_PERSISTENCE_KEY } from './constants';
import { navigationRef, isMountedRef } from '../../navigators/RootNavigation';
import DrawerSettingsItem from '../../components/common/DrawerSettingsItem';
import { fontConfig } from '../../theme/Fonts';
import { setLocalStorageItem, getLocalStorageItem } from '../../utils/helpers';
import { useInjectSaga, SagaInjectionModes } from 'redux-injectors';
import saga from './saga';

const RootStack = createStackNavigator();
const AppDrawer = createDrawerNavigator();

function AppDrawerContent({ dispatchSignOut, setTheme, theme, progress, ...rest }) {
  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView {...rest}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <DrawerItem
          onPress={() => dispatchSignOut()}
          label="Sign Out"
          icon={({ focused, color, size }) => (
            <AwesomeIcon color={color} size={size} name={focused ? 'lock' : 'lock'} />
          )}
        />
        <DrawerSettingsItem
          label="Dark theme"
          value={theme.dark}
          onValueChange={() => {
            setLocalStorageItem(THEME_PERSISTENCE_KEY, theme.dark ? 'light' : 'dark').then(() =>
              setTheme((t) => (t.dark ? DefaultTheme : DarkTheme)),
            );
          }}
        />
        <DrawerItemList {...rest} />
      </Animated.View>
    </DrawerContentScrollView>
  );
}

function RootStackScreen({ dispatch, currentSession, dispatchSignOut }) {
  useInjectSaga({ key: 'rootScreen', saga, mode: SagaInjectionModes.DAEMON });
  const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
  const [theme, setTheme] = React.useState(DefaultTheme);
  const dispatchCheckForToken = React.useCallback(() => {
    dispatch(checkForToken());
  }, [dispatch]);
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await getLocalStorageItem(PERSISTENCE_KEY);
        let state =
          savedStateString && typeof savedStateString === 'string'
            ? JSON.parse(savedStateString)
            : undefined;

        if (state !== undefined) {
          setInitialState(state);
        }
      } finally {
        try {
          const themeName = await getLocalStorageItem(THEME_PERSISTENCE_KEY);

          setTheme(themeName === 'dark' ? DarkTheme : DefaultTheme);
        } catch (e) {
          // Ignore
        }

        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  const paperTheme = React.useMemo(() => {
    const selectedTheme = theme.dark ? PaperDarkTheme : PaperLightTheme;

    return {
      ...selectedTheme,
      colors: {
        ...selectedTheme.colors,
        ...theme.colors,
        surface: theme.colors.card,
        fonts: configureFonts(fontConfig),
        accent: theme.dark ? 'rgb(255, 55, 95)' : 'rgb(255, 45, 85)',
      },
    };
  }, [theme.colors, theme.dark]);

  React.useEffect(() => {
    // check if the user is logged in or not
    dispatchCheckForToken && dispatchCheckForToken();
  }, [currentSession, dispatchCheckForToken]);

  React.useEffect(() => {
    isMountedRef.current = true;
    const onDimensionsChange = ({ window }) => {
      setDimensions(window);
    };

    Dimensions.addEventListener('change', onDimensionsChange);

    return () => Dimensions.removeEventListener('change', onDimensionsChange);
  }, []);

  if (!isReady || currentSession.loading) {
    return <SplashScreen />;
  }

  if (currentSession.token) {
    return (
      <PaperProvider
        theme={paperTheme}
        settings={{
          icon: (props) => <AwesomeIcon {...props} />,
        }}
      >
        {Platform.OS === 'ios' && (
          <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
        )}
        <NavigationContainer
          ref={navigationRef}
          initialState={initialState}
          onStateChange={(state) => setLocalStorageItem(PERSISTENCE_KEY, JSON.stringify(state))}
          theme={theme}
        >
          <AppDrawer.Navigator
            name={screenNames.APP}
            drawerPosition="right"
            drawerContent={(props) => (
              <AppDrawerContent
                {...props}
                theme={theme}
                setTheme={setTheme}
                dispatchSignOut={dispatchSignOut}
              />
            )}
          >
            <AppDrawer.Screen
              name={screenNames.HOME_SCREEN}
              component={AppScreenTabs}
              options={{
                drawerLabel: 'Home',
                drawerIcon: ({ size, color }) => (
                  <AwesomeIcon size={size} color={color} name="bars" />
                ),
              }}
            />
          </AppDrawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen
          name={screenNames.AUTHENTICATION}
          component={AuthenticationScreenStack}
          options={() => ({
            animationEnabled: false,
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

RootStackScreen.propTypes = {
  dispatch: PropTypes.func,
  dispatchSignOut: PropTypes.func,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    currentSession: makeSelectCurrentSession(state, props),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    dispatchSignOut: () => {
      dispatch(signOut());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RootStackScreen);
