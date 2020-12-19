/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from 'react-native'

import { _onLoginWithInfo, _onLogout } from '../../utils/auth/auth-handlers'
import { LogoV } from '../../components/svg/Vectors'

const Landing = ({ authUser }) => {
  const _handleLogin = async () => {
    const res = await _onLoginWithInfo()
    if (res.accessToken) {
      console.log(res)
      authUser(true)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <LogoV />
        <TouchableOpacity style={styles.button} onPress={_handleLogin} title={'Log In to Verify'}>
          <Text>Login to Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  button: {
    marginTop: 20,
    width: 200,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 15,
    borderRadius: 10,
    color: '#7000FF',
    fontSize: 30,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7000FF',
    height: '30%',
    borderRadius: 7,
    padding: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})

export default Landing
