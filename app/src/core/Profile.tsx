import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import theme from '../../components/theme/theme';
import { useImage } from '../../utils/images/image-context';
import { useAuth } from '../../utils/auth/auth-context';
import { useData } from '../../utils/data/data-context';
import { ReportDataBlob, _formatBlobs } from '../../utils/data/data-handlers';
import AvatarIcon from '../../components/elements/Avatar';

const ProfilePage = (): JSX.Element => {
    const { state } = useAuth();
    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        if (state.isLoggedIn) {
            setShow(true);
        }
    }, []);
    if (show) {
        const { userInfo } = state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <AvatarIcon />
                    <View>
                        <Text>This is some text</Text>
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
    }
});

export default ProfilePage;
