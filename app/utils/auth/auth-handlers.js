import Auth0 from 'react-native-auth0'
var credentials = require('../../auth0-configuration')
const auth0 = new Auth0(credentials)

/**
 * @returns {credentials}
 */
export const _onLogin = async () => {
  return auth0.webAuth
    .authorize({
      scope: 'openid profile email',
    })
    .then((credentials) => {
      return credentials
    })
    .catch((error) => {
      return error
    })
}

/**
 * @returns {success}
 */
export const _onLogout = async () => {
  return auth0.webAuth
    .clearSession({})
    .then((success) => {
      return success
    })
    .catch((error) => {
      return error
    })
}
