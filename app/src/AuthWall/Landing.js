import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from 'react-native'
import theme from '../../components/theme/theme'
import { _onLoginWithInfo } from '../../utils/auth/auth-handlers'
import { TYPES, setStore } from '../../utils/store/store-handlers'
import { KEYS } from '../../utils/store/keys'
import { LogoV } from '../../components/svg/Vectors'

const Landing = ({ authUser }) => {
  const _handleLogin = async () => {
    const res = await _onLoginWithInfo()
    if (res.accessToken) {
      console.log(res)
      await setStore(KEYS.USER_INFO, res.userInfo, TYPES.JSON)
      authUser(true)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Verify the accuracy of social content</Text>
      <View style={styles.card}>
        <LogoV />
        <View style={{ color: theme.colors.primaryPurple }}>
          <TouchableOpacity style={styles.button} onPress={_handleLogin} title={'Log In to Verify'}>
            <Text
              style={{
                color: theme.colors.primaryPurple,
                fontSize: theme.typeface.textMedium,
                fontFamily: theme.typeface.fontFamily,
              }}
            >
              Login to Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

Landing.propTypes = { authUser: PropTypes.func }

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.offWhite,
    borderRadius: 10,
    color: theme.colors.primaryPurple,
    fontSize: 30,
    marginTop: 20,
    padding: 15,
    width: 200,
  },
  card: {
    alignItems: 'center',
    backgroundColor: theme.colors.primaryPurple,
    borderRadius: 7,
    elevation: 5,
    height: '30%',
    justifyContent: 'center',
    padding: 50,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,

    shadowRadius: 3.84,
  },
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.offWhite,

    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.primaryPurple,
    fontFamily: theme.typeface.fontFamily,
    fontSize: theme.typeface.textMedium,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
})

export default Landing
