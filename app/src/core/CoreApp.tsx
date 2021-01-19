import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

import HomePage from './Home';
import SettingsPage from './Settings';
import LoadingPage from './Loading';
import ViewerPage from './Viewer';
import theme from '../../components/theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Core = ({ route }: { route: any }) => {
    const { authUser } = route.params;
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    color: theme.colors.black
                },
                style: {
                    paddingTop: 10
                }
            }}
        >
            <Tab.Screen
                name="Verify"
                component={HomePage}
                options={{
                    tabBarLabel: 'Verify',
                    tabBarIcon: () => <AntDesign name="camerao" size={20} />
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsPage}
                initialParams={{ authUser: authUser }}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: () => <AntDesign name="setting" size={20} />
                }}
            />
            <Tab.Screen
                name="Viewer"
                component={ViewerPage}
                options={{
                    tabBarLabel: 'View',
                    tabBarIcon: () => <AntDesign name="infocirlceo" size={20} />
                }}
            />
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
