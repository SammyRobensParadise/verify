import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from './Home'

const Tab = createBottomTabNavigator()

const CoreApp = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Verify ⚡️" component={HomePage} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default CoreApp
