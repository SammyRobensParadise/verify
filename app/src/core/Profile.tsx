import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Image
} from 'react-native';
import theme from '../../components/theme/theme';
import { useAuth } from '../../utils/auth/auth-context';
import { useData } from '../../utils/data/data-context';

const ProfilePage = (): JSX.Element => {
    const { state } = useAuth();
    const { getAllData, state: data } = useData();
    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        if (state.isLoggedIn) {
            setShow(true);
        }
    }, []);

    useEffect(() => {
        const getData = async () => {
            const r = await getAllData(state.userInfo.email);
            if (r) {
                console.log(data);
            }
            return true;
        };
        if (state) {
            getData();
        }
    }, []);

    if (show) {
        const { userInfo } = state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View
                        style={{
                            alignContent: 'center',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <Image
                            source={{ uri: userInfo.picture }}
                            resizeMode={'contain'}
                            style={styles.image}
                        />
                        <Text style={{ paddingTop: 20, fontSize: 18 }}>
                            {userInfo.name}
                        </Text>
                        <Text style={{ paddingTop: 10, fontSize: 18 }}>
                            {userInfo.email}
                        </Text>
                    </View>
                    <View
                        style={{
                            paddingTop: 40,
                            borderBottomColor: theme.colors.primaryPurple,
                            paddingBottom: 10,
                            borderBottomWidth: 0.5
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                paddingTop: 10,
                                paddingBottom: 10,
                                paddingStart: 20
                            }}
                        >
                            Your Reports
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.primaryPurple}
                    />
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.offWhite,
        height: '100%',
        marginTop: 0,
        padding: 30
    },
    image: {
        paddingTop: 20,
        marginTop: 20,
        height: 100,
        width: 100,
        borderRadius: 50,
        overflow: 'hidden',
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    }
});

export default ProfilePage;
