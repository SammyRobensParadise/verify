import Auth0 from 'react-native-auth0';
import { Auth0Credentials, UserInfoType } from 'types/types';
var credentials: Auth0Credentials = require('../../auth0-configuration');
const auth0 = new Auth0(credentials);

/**
 * @returns {credentials}
 */
export const _onLogin = async () => {
    return auth0.webAuth
        .authorize({
            scope: 'openid profile email'
        })
        .then((credentials: any) => {
            return credentials;
        })
        .catch((error: Error) => {
            return error;
        });
};

export const _onLoginWithInfo = async () => {
    return auth0.webAuth
        .authorize({
            scope: 'openid profile email'
        })
        .then(async (credentials: any) => {
            const UserInfo: UserInfoType = await _getUserInfo(
                credentials.accessToken
            );
            return { ...credentials, userInfo: UserInfo };
        })
        .catch((error: Error) => {
            return error;
        });
};

export const _onLogout = async () => {
    return auth0.webAuth
        .clearSession()
        .then((success: any) => {
            return success;
        })
        .catch((error: Error) => {
            return error;
        });
};

export const _getUserInfo = async (accessToken: string) => {
    const url = `${_getBaseAuthURL()}/userinfo`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };
    return fetch(url, { ...options })
        .then((raw: Response) => {
            return raw.json();
        })
        .catch((error: Error) => {
            return error;
        });
};

export const _getBaseAuthURL = (): string => {
    return 'https://swstudios.us.auth0.com';
};
