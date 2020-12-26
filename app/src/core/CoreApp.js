import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import HomePage from './Home'
import SettingsPage from './Settings'
import LoadingPage from './Loading'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const Core = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Verify ⚡️" component={HomePage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  )
}

const CoreApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Core" component={Core} />
        <Stack.Screen name="Loading" component={LoadingPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default CoreApp
