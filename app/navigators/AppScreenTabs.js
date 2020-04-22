import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenNames } from './RouteNames';
import HomeScreen from '../containers/HomeScreen/index';
import { WelcomeScreen } from '../containers/WelcomeScreen';

const AppTabs = createBottomTabNavigator();

export default function AppScreenTabs() {
  return (
    <AppTabs.Navigator initialRouteName={screenNames.WELCOME_SCREEN}>
      <AppTabs.Screen
        name={screenNames.HOME_SCREEN}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Icon name="github" size={size} color={color} />,
        }}
      >
        {(props) => <HomeScreen {...props} />}
      </AppTabs.Screen>
      <AppTabs.Screen
        options={{
          title: 'Welcome',
          tabBarIcon: ({ color, size }) => <Icon name="info-circle" size={size} color={color} />,
        }}
        name={screenNames.WELCOME_SCREEN}
      >
        {(props) => <WelcomeScreen {...props} />}
      </AppTabs.Screen>
    </AppTabs.Navigator>
  );
}
