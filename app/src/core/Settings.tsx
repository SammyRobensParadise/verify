/* eslint-disable react-native/split-platform-components */
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import theme from '../../components/theme/theme';
import AvatarIcon from '../../components/elements/Avatar';
import { Slime } from '../../components/svg/Vectors';
import { useAuth } from '../../utils/auth/auth-context';

const SettingsPage = () => {
    const { logout, user, state } = useAuth();
    const handleLogout = async (): Promise<Boolean> => {
        await logout();
        return true;
    };
    useEffect(() => {
        const data = async () => {
            await user(state.authToken);
            console.log(state);
        };
        data();
    }, []);

    return (
        <SafeAreaView style={theme.styles.safeArea}>
            <View
                style={{
                    alignItems: 'flex-end',
                    marginRight: 20,
                    paddingTop: 10
                }}
            >
                <AvatarIcon />
            </View>
            <View style={styles.viewContainer}>
                <Slime />
                <View style={styles.container}>
                    <Text style={styles.titleText}>Profile</Text>
                    <Text style={styles.titleText}>App</Text>
                    <View style={styles.card}>
                        <TouchableOpacity
                            style={styles.buttonReverse}
                            onPress={handleLogout}
                        >
                            <Text style={styles.buttonReverseText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonReverse: {
        alignItems: 'center',
        backgroundColor: theme.colors.offWhite,
        borderColor: theme.colors.toneRed,
        borderRadius: 10,
        borderWidth: 1,
        color: theme.colors.offWhite,
        fontSize: 30,
        marginTop: 20,
        padding: 25,
        width: 300
    },
    buttonReverseText: {
        color: theme.colors.toneRed,
        fontSize: theme.typeface.textMedium,
        fontFamily: theme.typeface.fontFamily
    },
    card: {
        alignItems: 'center',
        backgroundColor: theme.colors.offWhite,
        borderRadius: 7,
        elevation: 5,
        height: '22%',
        padding: 50,
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,

        shadowRadius: 3.84
    },
    titleText: {
        fontFamily: theme.typeface.fontFamily,
        fontSize: theme.typeface.textMedium,
        fontWeight: theme.typeface.textLight,
        color: theme.colors.primaryPurple,
        flex: 0,
        paddingBottom: 20
    },
    container: {
        backgroundColor: theme.colors.offWhite,
        height: '100%',
        marginTop: 0,
        padding: 30
    },
    viewContainer: {
        backgroundColor: theme.colors.offWhite,
        width: '100%',
        padding: 0
    }
});

export default SettingsPage;
