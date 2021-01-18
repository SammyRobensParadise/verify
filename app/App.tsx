/**
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import Landing from './src/AuthWall/Landing';
import CoreApp from './src/core/CoreApp';

const App = () => {
    const [loggedIn, authUser] = useState(false);
    return !loggedIn ? <Landing authUser={authUser} /> : <CoreApp />;
};

export default App;
