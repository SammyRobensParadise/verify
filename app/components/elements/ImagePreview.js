import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import theme from '../theme/theme'

const ImagePreview = ({ uri, imageName, cancel }) => {
  const u = uri
  console.log(u)
  return (
    <SafeAreaView>
      <View
        style={{ backgroundColor: theme.colors.white, width: '100%', padding: 0, height: '100%' }}
      >
        <Image source={{ uri: u }} resizeMode={'contain'} style={styles.image} />
        <Text
          style={{
            fontFamily: theme.typeface.fontFamily,
            fontSize: theme.typeface.textMedium,
            fontWeight: theme.typeface.textLight,
            color: theme.colors.primaryPurple,
            textAlign: 'center',
          }}
        >
          Analyze Image? 🧠
        </Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.button} title={'Choose Photo'}>
            <Text
              style={{
                color: theme.colors.white,
                fontSize: theme.typeface.textMedium,
                fontFamily: theme.typeface.fontFamily,
              }}
            >
              Analyze
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonReverse} title={'Take Photo'}>
            <Text
              style={{
                color: theme.colors.primaryPurple,
                fontSize: theme.typeface.textMedium,
                fontFamily: theme.typeface.fontFamily,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

ImagePreview.propTypes = {
  uri: PropTypes.string,
  imageName: PropTypes.string,
  cancel: PropTypes.func,
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primaryPurple,
    borderRadius: 10,
    color: theme.colors.white,
    fontSize: 30,
    marginTop: 15,
    padding: 25,
    width: 300,
  },
  buttonReverse: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.primaryPurple,
    borderRadius: 10,
    borderWidth: 1,
    color: theme.colors.white,
    fontSize: 30,
    marginTop: 20,
    padding: 25,
    width: 300,
  },
  card: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 7,
    elevation: 5,
    height: '40%',
    marginTop: 20,
    padding: 50,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,

    shadowRadius: 3.84,
  },
  image: {
    height: 350,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    width: '100%',
  },
})

export default ImagePreview
