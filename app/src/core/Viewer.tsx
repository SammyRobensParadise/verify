import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

interface LoadingProps {
    route: any;
    navigation?: any;
}

const ViewerPage = ({ route }: LoadingProps): JSX.Element => {
    const { search } = route.params;
    const { webPages } = search.data;
    const { pages: value, totalEstimatedMatches, webSearchUrl } = webPages;

    return (
        <SafeAreaView>
            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <Text>{totalEstimatedMatches}</Text>
                <Text>{webSearchUrl}</Text>
            </View>
        </SafeAreaView>
    );
};

export default ViewerPage;
