import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './Home';
import SettingsPage from './Settings';
import LoadingPage from './Loading';
import ViewerPage from './Viewer';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Core = ({ route }: { route: any }) => {
    const { authUser } = route.params;
    return (
        <Tab.Navigator>
            <Tab.Screen name="Verify ⚡️" component={HomePage} />
            <Tab.Screen
                name="Settings ⚙️"
                component={SettingsPage}
                initialParams={{ authUser: authUser }}
            />
            <Stack.Screen name="Viewer" component={ViewerPage} />
        </Tab.Navigator>
    );
};

const CoreApp = ({
    authUser
}: {
    authUser: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="Core"
                    component={Core}
                    initialParams={{ authUser: authUser }}
                />
                <Stack.Screen name="Loading" component={LoadingPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default CoreApp;
