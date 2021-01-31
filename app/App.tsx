/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import Landing from './src/AuthWall/Landing';
import CoreApp from './src/core/CoreApp';
import { AuthProvider, useAuth } from './utils/auth/auth-context';
import { ImageProvider } from './utils/images/image-context';

const Authenticator = () => {
    const { state } = useAuth();
    const { isLoggedIn } = state;
    return !isLoggedIn ? <Landing /> : <CoreApp />;
};

const App = () => (
    <AuthProvider>
        <ImageProvider>
            <Authenticator />
        </ImageProvider>
    </AuthProvider>
);

export default App;
