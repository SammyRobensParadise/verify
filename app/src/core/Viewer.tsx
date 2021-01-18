import React from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';

interface LoadingProps {
    route: any;
    navigation?: any;
}

const ViewerPage = ({ route }: LoadingProps): JSX.Element => {
    const { search } = route.params;
    const { webPages } = search.data;
    const { value: pages, totalEstimatedMatches, webSearchUrl } = webPages;
    console.log(pages);
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Text>{totalEstimatedMatches}</Text>
                    <Text>{webSearchUrl}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ViewerPage;
