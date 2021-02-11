import React, { useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import {
    WebpagePreview,
    SearchPreviewReference
} from '../../components/elements/WebpagePreview';
import theme from '../../components/theme/theme';
import { useImage } from '../../utils/images/image-context';
import { useAuth } from '../../utils/auth/auth-context';
import { useData } from '../../utils/data/data-context';
import { ReportDataBlob, _formatBlobs } from '../../utils/data/data-handlers';

interface LoadingProps {
    route: any;
    navigation?: any;
}

const ViewerPage = ({ route }: LoadingProps): JSX.Element => {
    if (route?.params) {
        const { state: imageState } = useImage();
        const { state: authState, user } = useAuth();
        const { sendData } = useData();
        const { search, image } = route.params;
        const { webPages } = search?.data;

        useEffect(() => {
            const data = async () => {
                await user(authState.authToken);
            };
            data();
        }, []);

        useEffect(() => {
            const saveImageData = async () => {
                const blob: ReportDataBlob | null = _formatBlobs(
                    authState,
                    imageState
                );
                if (blob) {
                    await sendData(blob);
                }
            };
            if (authState?.userInfo && authState.isLoggedIn && imageState) {
                saveImageData();
            }
        }, [authState]);
        if (webPages !== undefined) {
            const { value: pages, totalEstimatedMatches } = webPages;
            const typePages: Array<SearchPreviewReference> = pages;
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <Image
                            source={{ uri: image }}
                            resizeMode={'contain'}
                            style={styles.imgWrapper}
                        />
                        <View style={{ alignItems: 'center', marginTop: 40 }}>
                            <Text>{`Showing top ${typePages?.length} of ${totalEstimatedMatches} Results`}</Text>
                        </View>
                        {typePages.length > 0 ? (
                            typePages.map((s) => {
                                return <WebpagePreview search={s} key={s.id} />;
                            })
                        ) : (
                            <Text>No Search Results Detected</Text>
                        )}
                    </ScrollView>
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Text>
                            No Search Results Detected. Try cropping the
                            picture.
                        </Text>
                    </View>
                </SafeAreaView>
            );
        }
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Text>Choose an Image to begin a Search</Text>
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
    imgWrapper: {
        marginHorizontal: 30,
        marginVertical: 10,
        borderRadius: 20,
        shadowColor: theme.colors.black,
        height: 250,
        width: 'auto',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    }
});

export default ViewerPage;
