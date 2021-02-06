import React from 'react';
import { UserInfoType } from 'types/types';
import {
    _getUserInfo,
    _onLogin,
    _onLoginWithInfo,
    _onLogout
} from './auth-handlers';

const AuthContext = React.createContext(null);

const AuthActionId = {
    LOGIN: 1,
    LOGIN_SUCCESS: 2,
    LOGIN_ERROR: 3,
    LOGIN_WITH_INFO: 4,
    LOGIN_WITHINFO_SUCCESS: 5,
    LOGIN_WITHINFO_ERROR: 6,
    LOGOUT: 7,
    LOGOUT_SUCCESS: 8,
    LOGOUT_FAILURE: 9,
    GET_USER_INFO: 10,
    GET_USER_INFO_SUCCESS: 11,
    GET_USER_INFO_ERROR: 12,
    GET_BASE_AUTH_URL: 13
};

type AuthState = {
    isLoggedIn: boolean;
    userInfo: UserInfoType | null;
    isLoading: boolean;
    authToken: string;
};

type accessToken = any;

type ActionType = {
    type: number;
    payload: Partial<AuthState> | accessToken;
};

const AuthDefaultState: AuthState = {
    isLoggedIn: false,
    userInfo: null,
    isLoading: false,
    authToken: ''
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
        case AuthActionId.LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                authToken: action.payload
            };
        }
        case AuthActionId.LOGIN_ERROR: {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                error: true,
                authToken: action.payload
            };
        }
        case AuthActionId.LOGIN_WITH_INFO: {
            return {
                ...state,
                isLoading: true,
                isLoggedIn: false,
                authToken: action.payload
            };
        }
        case AuthActionId.LOGIN_WITHINFO_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                userInfo: action.payload.userInfo,
                authToken: action.payload.accessToken
            };
        }
        case AuthActionId.LOGIN_WITHINFO_ERROR: {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                error: true,
                authToken: action.payload
            };
        }
        case AuthActionId.LOGOUT: {
            return {
                ...state,
                isLoading: true,
                isLoggedIn: true
            };
        }
        case AuthActionId.LOGOUT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false
            };
        }
        case AuthActionId.LOGOUT_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true
            };
        }
        case AuthActionId.GET_USER_INFO: {
            return {
                ...state,
                isLoading: true,
                isLoggedIn: true
            };
        }
        case AuthActionId.GET_USER_INFO_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                userInfo: action.payload
            };
        }
        case AuthActionId.GET_USER_INFO_ERROR: {
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                userInfo: action.payload
            };
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
};

const login = (dispatch: React.Dispatch<ActionType>) => async () => {
    dispatch({ type: AuthActionId.LOGIN, payload: {} });
    const raw = await _onLogin();
    dispatch({ type: AuthActionId.LOGIN_SUCCESS, payload: raw.accessToken });
};

const loginInfo = (dispatch: React.Dispatch<ActionType>) => async () => {
    dispatch({ type: AuthActionId.LOGIN_WITH_INFO, payload: {} });
    const raw = await _onLoginWithInfo();
    dispatch({
        type: AuthActionId.LOGIN_WITHINFO_SUCCESS,
        payload: raw
    });
};

const logout = (dispatch: React.Dispatch<ActionType>) => async () => {
    dispatch({ type: AuthActionId.LOGOUT, payload: {} });
    const raw = await _onLogout();
    dispatch({ type: AuthActionId.LOGOUT_SUCCESS, payload: raw });
};

const user = (dispatch: React.Dispatch<ActionType>) => async (
    token: string
) => {
    dispatch({ type: AuthActionId.GET_USER_INFO, payload: {} });
    const raw = await _getUserInfo(token);
    dispatch({ type: AuthActionId.GET_USER_INFO_SUCCESS, payload: raw });
};

type AuthProviderProps = {
    children?: React.ReactNode;
    [key: string]: any; // there are some props passed to Provider which are necessary and will not load component.
};

export const AuthProvider = (props: AuthProviderProps) => {
    // @ts-ignore
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
        login: login(dispatch),
        loginInfo: loginInfo(dispatch),
        logout: logout(dispatch),
        user: user(dispatch)
    };
};
