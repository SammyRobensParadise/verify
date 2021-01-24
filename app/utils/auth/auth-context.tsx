import React from 'react';

const AuthContext = React.createContext(null);

const AuthActionId = {
    UPDATE_INIT: 1
};

type AuthState = {
    isLoggedIn: boolean;
};

type ActionType = {
    type: number;
    payload: Partial<AuthState>;
};

const AuthDefaultState: AuthState = {
    isLoggedIn: false
};

const AuthReducer = (state: AuthState, action: ActionType) => {
    switch (action.type) {
        case AuthActionId.UPDATE_INIT: {
            return {
                ...state
            };
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
};

const loginUser = (dispatch: React.Dispatch<ActionType>) => async (
    AuthUserId: string
) => {
    dispatch({ type: AuthActionId.UPDATE_INIT, payload: {} });
};

type AuthAuthorizeType = {
    code: string;
    // Need redirect uri from the original request
    redirect_uri: string;
    error?: string;
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
        createAuthAssociation: loginUser(dispatch)
    };
};
