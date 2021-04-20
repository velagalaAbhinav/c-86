
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import WelcomeScreen from './screens/WelconeScreen'
import AppTabNavigator from './Components/AppTabNavigator'

export default function App() {
  return (
   <AppContainer/>
  );
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
 Drawer:{screen:AddDrawerNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator)
