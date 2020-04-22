import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenNames } from './RouteNames';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '../containers/LoginScreen/index';
import PhoenixLoginScreen from '../containers/PhoenixLoginScreen/index';

const AuthenticationTabs = createBottomTabNavigator();

export default function AuthenticationScreenStack() {
  return (
    <AuthenticationTabs.Navigator initialRouteName={screenNames.LOGIN_SCREEN}>
      <AuthenticationTabs.Screen
        name={screenNames.LOGIN_SCREEN}
        options={{
          title: 'Login',
          tabBarIcon: ({ color, size }) => <Icon name="lock" size={size} color={color} />,
        }}
      >
        {(props) => <LoginScreen {...props} />}
      </AuthenticationTabs.Screen>
      <AuthenticationTabs.Screen
        name={screenNames.LOGIN_PHOENIX_SCREEN}
        options={{
          title: 'Login with Phoenix',
          tabBarIcon: ({ color, size }) => <Icon name="sign-in" size={size} color={color} />,
        }}
      >
        {(props) => <PhoenixLoginScreen {...props} />}
      </AuthenticationTabs.Screen>
    </AuthenticationTabs.Navigator>
  );
}
