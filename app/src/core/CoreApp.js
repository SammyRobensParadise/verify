import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomePage from './Home'

const Stack = createStackNavigator()

const CoreApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Verify ⚡️" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default CoreApp
