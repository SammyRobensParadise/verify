/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import Landing from './src/AuthWall/Landing';
import CoreApp from './src/core/CoreApp';
import { AuthProvider, useAuth } from './utils/auth/auth-context';
import { ImageProvider } from './utils/images/image-context';
import { DataProvider } from './utils/data/data-context';
const Authenticator = () => {
    const { state } = useAuth();
    const { isLoggedIn } = state;
    return !isLoggedIn ? <Landing /> : <CoreApp />;
};

const App = () => (
    <AuthProvider>
        <DataProvider>
            <ImageProvider>
                <Authenticator />
            </ImageProvider>
        </DataProvider>
    </AuthProvider>
);

export default App;
