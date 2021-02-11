import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import { useImage } from '../../utils/images/image-context';
import theme from '../../components/theme/theme';

const HTTP_OK: number = 200;
type PhaseType = 1 | 2 | 3 | 4 | 5 | 6;

interface LoadingProps {
    route: any;
    navigation: any;
}

const LoadingPage = ({ route, navigation }: LoadingProps): JSX.Element => {
    const { ifile } = route.params;
    const [status, statusUpdate] = useState<PhaseType>(1);
    const { upload, imageText, searchResults } = useImage();

    useEffect(() => {
        const analyzeText = async (): Promise<Boolean> => {
            statusUpdate(2);
            const d = await upload(ifile);
            if (d) {
                statusUpdate(3);
                const txt = await imageText(d);
                if (txt) {
                    statusUpdate(4);
                    const r = await searchResults(txt);
                    statusUpdate(5);
                    if (r) {
                        statusUpdate(6);
                        const { Location: imageUri } = d;
                        navigation.navigate('Core', {
                            screen: 'Viewer',
                            params: { search: r, image: imageUri }
                        });
                        return true;
                    }
                }
            }
            return false;
        };
        analyzeText();
    }, []);
    return (
        <SafeAreaView>
            <View style={{ height: '100%' }}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <Text
                        style={{
                            fontFamily: theme.typeface.fontFamily,
                            fontSize: theme.typeface.textMedium,
                            fontWeight: theme.typeface.textBold,
                            color: theme.colors.primaryPurple,
                            flex: 0,
                            paddingBottom: 40
                        }}
                    >
                        Loading...
                    </Text>
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.primaryPurple}
                    />
                    <CurrentAnalysisState phase={status} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const CurrentAnalysisState = ({ phase }: { phase: PhaseType }): JSX.Element => {
    let message = '';
    switch (phase) {
        case 1:
            message = `Getting image information...`;
            break;
        case 2:
            message = `Uploading Image...`;
            break;
        case 3:
            message = `Extracting text from image...`;
            break;
        case 4:
            message = `Analyzing Results...`;
            break;
        case 5:
            message = `Almost done...`;
            break;
        case 6:
            message = `Done!`;
            break;
        default:
            message = `Analyzing...`;
            break;
    }

    return (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text
                style={{
                    fontFamily: theme.typeface.fontFamily,
                    fontSize: theme.typeface.textMedium,
                    fontWeight: theme.typeface.textLight,
                    color: theme.colors.primaryPurple,
                    flex: 0,
                    paddingBottom: 10
                }}
            >{`Step ${phase.toString()}/6`}</Text>
            <Text
                style={{
                    fontFamily: theme.typeface.fontFamily,
                    fontSize: theme.typeface.textMedium,
                    fontWeight: theme.typeface.textLight,
                    color: theme.colors.primaryPurple,
                    flex: 0,
                    paddingBottom: 0
                }}
            >
                {message}
            </Text>
        </View>
    );
};

export default LoadingPage;
