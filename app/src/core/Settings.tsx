/* eslint-disable react-native/split-platform-components */
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { getDataObject } from '../../utils/store/store-handlers';
import { createOneButtonAlert } from '../../components/alerts/Alerts';
import theme from '../../components/theme/theme';
import { KEYS } from '../../utils/store/keys';
import AvatarIcon from '../../components/elements/Avatar';
import { Slime, Settings } from '../../components/svg/Vectors';

const SettingsPage = ({ route }: { route: any }) => {
    const { authUser } = route.params;
    const [userInfo, setUserInfo] = useState({});

    const handleLogout = async (): Promise<Boolean> => {
        authUser(false);
        return true;
    };
    useEffect(() => {
        getDataObject(KEYS.USER_INFO.toString())
            .then((data) => {
                setUserInfo(data);
            })
            .catch((e) => {
                createOneButtonAlert({
                    buttons: [
                        { title: 'OK', event: () => {}, style: 'cancel' }
                    ],
                    title: 'Unable to load user information',
                    message: e.toString()
                });
            });
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
            <View
                style={{
                    backgroundColor: theme.colors.offWhite,
                    width: '100%',
                    padding: 0
                }}
            >
                <Slime />
                <View style={styles.container}>
                    <Text
                        style={{
                            fontFamily: theme.typeface.fontFamily,
                            fontSize: theme.typeface.textMedium,
                            fontWeight: theme.typeface.textBold,
                            color: theme.colors.primaryPurple,
                            flex: 0,
                            paddingBottom: 20
                        }}
                    >
                        Settings
                    </Text>

                    <View style={styles.card}>
                        <TouchableOpacity
                            style={styles.buttonReverse}
                            onPress={handleLogout}
                        >
                            <Text
                                style={{
                                    color: theme.colors.primaryPurple,
                                    fontSize: theme.typeface.textMedium,
                                    fontFamily: theme.typeface.fontFamily
                                }}
                            >
                                Logout
                            </Text>
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
        borderColor: theme.colors.primaryPurple,
        borderRadius: 10,
        borderWidth: 1,
        color: theme.colors.offWhite,
        fontSize: 30,
        marginTop: 20,
        padding: 25,
        width: 300
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
    container: {
        backgroundColor: theme.colors.offWhite,
        height: '100%',
        marginTop: 0,
        padding: 30
    }
});

export default SettingsPage;
