/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { _onLoginWithInfo, _onLogout } from './utils/auth/auth-handlers'
import CoreApp from './src/core/CoreApp'

const App = () => {
  const [loggedIn, AuthUser] = useState(false)

  const _handleLogin = async () => {
    const res = await _onLoginWithInfo()
    if (res.accessToken) {
      console.log(res)
      AuthUser(true)
    }
  }

  const _handleLogout = async () => {
    const success = await _onLogout()
    if (success) {
      AuthUser(false)
    }
  }

  return !loggedIn ? (
    <View style={styles.container}>
      <Text style={styles.header}>Login to Verify </Text>
      <Button
        onPress={loggedIn ? _handleLogout : _handleLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </View>
  ) : (
    <CoreApp />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

export default App
