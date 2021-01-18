import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    StyleSheet
} from 'react-native';
import theme from '../theme/theme';

export type SearchPreviewReference = {
    dateLastCrawled: string;
    displayUrl: string;
    id: URL;
    isFamilyFriendly: boolean;
    isNavigational: boolean;
    language: string;
    name: string;
    snippet: string;
    url: string;
};

export interface WebpagePreviewReference {
    search: SearchPreviewReference;
}

export const WebpagePreview = ({
    search
}: WebpagePreviewReference): JSX.Element => {
    const { name, url, snippet } = search;
    return (
        <View style={styles.wrapper}>
            <View>
                <TouchableOpacity onPress={() => Linking.openURL(url)}>
                    <Text
                        style={{
                            fontFamily: theme.typeface.fontFamily,
                            fontSize: theme.typeface.textMedium,
                            fontWeight: '300',
                            color: theme.colors.primaryPurple
                        }}
                    >
                        {name}
                    </Text>
                    <Text>{snippet}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 30,
        marginVertical: 10,
        padding: 10,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    }
});
