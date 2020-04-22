import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './SplashScreenStyle';
import Helpers from '../../theme/Helpers';

function SplashScreen() {
  return (
    <View style={[Helpers.fillRowCenter, styles.container]}>
      <View style={[Helpers.center, styles.logo]}>
        <Image source={require('../../assets/Images/logo_splash.png')} />
        <Text>LOGO TEXT</Text>
      </View>
    </View>
  );
}

export default SplashScreen;
