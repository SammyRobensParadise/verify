import React from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
import {
    WebpagePreview,
    SearchPreviewReference
} from '../../components/elements/WebpagePreview';
import theme from '../../components/theme/theme';
interface LoadingProps {
    route: any;
    navigation?: any;
}

const ViewerPage = ({ route }: LoadingProps): JSX.Element => {
    const { search } = route.params;
    const { webPages } = search.data;
    console.log(search);
    const { value: pages, totalEstimatedMatches } = webPages;
    const typePages: Array<SearchPreviewReference> = pages;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Text>{`Showing top ${typePages.length} of ${totalEstimatedMatches} Results`}</Text>
                </View>
                {typePages.map((s) => {
                    return <WebpagePreview search={s} />;
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        height: '100%',
        marginTop: 0,
        padding: 30
    }
});

export default ViewerPage;
