import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

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
        <View>
            <TouchableOpacity onPress={() => Linking.openURL(url)}>
                <Text>{name}</Text>
                <Text>{snippet}</Text>
            </TouchableOpacity>
        </View>
    );
};
