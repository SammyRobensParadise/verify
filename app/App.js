/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Auth0 from 'react-native-auth0'
import { _onLogin, _onLogout } from './utils/auth/auth-handlers'

var credentials = require('./auth0-configuration')
const auth0 = new Auth0(credentials)

const App = () => {
  // let loggedIn = this.state.accessToken === null ? false : true
  const [loggedIn, AuthUser] = useState(false)

  const _handleLogin = async () => {
    const res = await _onLogin()
    if (res.accessToken) {
      AuthUser(true)
    }
  }

  const _handleLogout = async () => {
    const success = await _onLogout()
    if (success) {
      AuthUser(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login to Verify </Text>
      <Text>You are{loggedIn ? ' ' : ' not '}logged in to Verify. </Text>
      <Button
        onPress={loggedIn ? _handleLogout : _handleLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </View>
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
