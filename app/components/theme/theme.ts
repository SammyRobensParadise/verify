import { StyleSheet } from 'react-native';
const weightsBold:
    | '500'
    | '200'
    | '700'
    | 'normal'
    | 'bold'
    | '100'
    | '300'
    | '400'
    | '600'
    | '800'
    | '900'
    | undefined = '500';
const weightsLight:
    | '500'
    | '200'
    | '700'
    | 'normal'
    | 'bold'
    | '100'
    | '300'
    | '400'
    | '600'
    | '800'
    | '900'
    | undefined = '200';
const weightsHeavy:
    | '500'
    | '200'
    | '700'
    | 'normal'
    | 'bold'
    | '100'
    | '300'
    | '400'
    | '600'
    | '800'
    | '900'
    | undefined = '700';
const theme = {
    colors: {
        white: '#ffffff',
        primaryPurple: '#7000FF',
        offWhite: '#F5FCFF',
        black: '#000000'
    },
    typeface: {
        fontFamily: 'Helvetica',
        textSmall: 16,
        textMedium: 20,
        textLarge: 30,
        textBold: weightsBold,
        textLight: weightsLight,
        textHeavy: weightsHeavy
    },
    styles: StyleSheet.create({
        safeArea: {
            backgroundColor: '#7000FF',
            flex: 0
        }
    })
};

export default theme;
