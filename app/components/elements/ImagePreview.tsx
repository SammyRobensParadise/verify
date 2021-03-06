import React from 'react';
import {
    View,
    Image,
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import theme from '../theme/theme';

interface ImagePreviewProps {
    file: any;
    cancel: any;
    navigation: any;
}

const ImagePreview = ({ file, cancel, navigation }: ImagePreviewProps) => {
    return (
        <SafeAreaView>
            <View
                style={{
                    backgroundColor: theme.colors.offWhite,
                    width: '100%',
                    padding: 0,
                    height: '100%'
                }}
            >
                <Image
                    source={{ uri: file.uri }}
                    resizeMode={'contain'}
                    style={styles.image}
                />
                <Text
                    style={{
                        fontFamily: theme.typeface.fontFamily,
                        fontSize: theme.typeface.textMedium,
                        fontWeight: theme.typeface.textLight,
                        color: theme.colors.primaryPurple,
                        textAlign: 'center'
                    }}
                >
                    Analyze Image? 🧠
                </Text>
                <View style={styles.card}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('Loading', { ifile: file });
                            cancel(false);
                        }}
                    >
                        <Text
                            style={{
                                color: theme.colors.offWhite,
                                fontSize: theme.typeface.textMedium,
                                fontFamily: theme.typeface.fontFamily
                            }}
                        >
                            Analyze
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonReverse}
                        onPress={() => cancel(false)}
                    >
                        <Text
                            style={{
                                color: theme.colors.primaryPurple,
                                fontSize: theme.typeface.textMedium,
                                fontFamily: theme.typeface.fontFamily
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: theme.colors.primaryPurple,
        borderRadius: 10,
        color: theme.colors.offWhite,
        fontSize: 30,
        marginTop: 15,
        padding: 25,
        width: 300
    },
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
        height: '40%',
        marginTop: 20,
        padding: 50,
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,

        shadowRadius: 3.84
    },
    image: {
        height: 350,
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        width: '100%'
    }
});

export default ImagePreview;
