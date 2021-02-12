import React, { useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';

import theme from '../../components/theme/theme';
import { useAuth } from '../../utils/auth/auth-context';
import { useData } from '../../utils/data/data-context';

const ProfilePageGrid = ({
    data,
    navigation
}: {
    data: any;
    navigation: any;
}): JSX.Element => {
    console.log(data);
    const Items = data.reportInfo.Items;
    return (
        <View>
            <FlatGrid
                itemDimension={140}
                data={Items}
                spacing={10}
                style={{
                    paddingRight: 20,
                    backgroundColor: theme.colors.white
                }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: theme.colors.primaryPurple,
                            borderRadius: 3
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Core', {
                                    screen: 'Viewer',
                                    params: {
                                        search: item.info.text_search_data,
                                        image: item.info.upload_data.Location
                                    }
                                });
                            }}
                        >
                            <Image
                                source={{ uri: item.info.upload_data.Location }}
                                resizeMode={'contain'}
                                style={{ height: 150, width: 'auto' }}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const ProfilePage = ({ navigation }: { navigation: any }): JSX.Element => {
    const { state } = useAuth();
    const { getAllData, state: data } = useData();

    useEffect(() => {
        const getData = async () => {
            const r = await getAllData(state.userInfo.email);
            return r;
        };
        if (state) {
            getData();
        }
    }, []);

    if (state.isLoggedIn) {
        const { userInfo } = state;
        return (
            <SafeAreaView style={styles.container}>
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
                <ScrollView style={styles.gridView}>
                    {data?.reportInfo && !data.isLoading ? (
                        <ProfilePageGrid data={data} navigation={navigation} />
                    ) : (
                        <View style={{ paddingTop: 40 }}>
                            <ActivityIndicator
                                size="large"
                                color={theme.colors.primaryPurple}
                            />
                        </View>
                    )}
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
    },
    gridView: {
        marginTop: 10,
        flex: 1
    }
});

export default ProfilePage;
