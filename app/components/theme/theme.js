/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native'
const theme = {
  colors: {
    white: '#ffffff',
    primaryPurple: '#7000FF',
    offWhite: '#F5FCFF',
    black: '#000000',
  },
  typeface: {
    fontFamily: 'Helvetica',
    textSmall: 16,
    textMedium: 20,
    textLarge: 30,
    textBold: '500',
    textLight: '200',
    textHeavy: '700',
  },
  styles: StyleSheet.create({
    safeArea: {
      backgroundColor: '#7000FF',
      flex: 0,
    },
  }),
}

export default theme
