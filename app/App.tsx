/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import Landing from './src/AuthWall/Landing';
import CoreApp from './src/core/CoreApp';
import { AuthProvider, useAuth } from './utils/auth/auth-context';

const Authenticator = () => {
    const { state } = useAuth();
    const { isLoggedIn } = state;
    return !isLoggedIn ? <Landing /> : <CoreApp />;
};

const App = () => (
    <AuthProvider>
        <Authenticator />
    </AuthProvider>
);

export default App;
