import React from 'react';
import Auth0 from 'react-native-auth0';
import { Auth0Credentials, UserInfoType } from 'types/types';
var credentials: Auth0Credentials = require('../../auth0-configuration');
const auth0 = new Auth0(credentials);

const AuthContext = React.createContext(null);
const AuthActionId = {
    LOGIN: 1,
    LOGIN_SUCCESS: 2,
    LOGIN_WITH_INFO: 3,
    LOGIN_WITHINFO_SUCCESS: 4,
    LOGOUT: 5,
    LOGOUT_SUCCESS: 6,
    GET_USER_INFO: 7,
    GET_USER_INFO_SUCCESS: 8,
    GET_BASE_AUTH_URL: 9
};

type AuthState = {
    isLoggedIn: boolean;
    userInfo: UserInfoType | null;
    isLoading: boolean;
};

type ActionType = {
    type: number;
    payload: Partial<AuthState>;
};

const AuthDefaultState: AuthState = {
    isLoggedIn: false,
    userInfo: null,
    isLoading: false
};

const AuthReducer = (state: AuthState, action: ActionType) => {
    switch (action.type) {
        case AuthActionId.LOGIN: {
            return {
                ...state,
                isLoading: true,
                isLoggedIn: false
            };
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
};

const loginUser = (dispatch: React.Dispatch<ActionType>) => async () => {
    dispatch({ type: AuthActionId.LOGIN, payload: {} });
    const raw = await auth0.webAuth
        .authorize({
            scope: 'openid profile email'
        })
        .then((credentials: any) => {
            return credentials;
        })
        .catch((error: Error) => {
            return error;
        });
    if (!raw.email) {
        return;
    }
    dispatch({ type: AuthActionId.LOGIN_SUCCESS, payload: raw });
};

type AuthProviderProps = {
    children?: React.ReactNode;
    [key: string]: any; // there are some props passed to Provider which are necessary and will not load component.
};

export const AuthProvider = (props: AuthProviderProps) => {
    const [state, dispatch] = React.useReducer(AuthReducer, AuthDefaultState);
    const value: any = React.useMemo(() => [state, dispatch], [state]);
    return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
    const context: any = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    const [state, dispatch] = context;

    return {
        state,
        dispatch,
        loginUser: loginUser(dispatch)
    };
};
