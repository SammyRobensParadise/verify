import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import {
    getImageText,
    uploadImageToS3,
    S3ObjectReference,
    ImageTextReference
} from '../../utils/images/image-handlers';
import theme from '../../components/theme/theme';

const HTTP_OK: number = 200;
type PhaseType = 1 | 2 | 3 | 4 | 5 | 6;

const LoadingPage = ({ route }: { route: any }): JSX.Element => {
    const { ifile } = route.params;
    const [
        currentAnalysisStatus,
        updateCurrentAnalysisStatus
    ] = useState<PhaseType>(1);
    useEffect(() => {
        const analyzeText = async (): Promise<Boolean> => {
            try {
                updateCurrentAnalysisStatus(2);
                const uploadResponse: S3ObjectReference = await uploadImageToS3(
                    ifile
                );
                if (uploadResponse.err) {
                    throw new Error('Unable to upload photo');
                }
                updateCurrentAnalysisStatus(3);
                const textResponse: ImageTextReference = await getImageText(
                    uploadResponse
                );
                if (textResponse.status !== HTTP_OK) {
                    throw new Error('Unable to extract text from image');
                }
                updateCurrentAnalysisStatus(4);
                console.log(textResponse);
                return true;
            } catch (error) {
                alert(`${error}`);
                return false;
            }
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
                    <CurrentAnalysisState phase={currentAnalysisStatus} />
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
