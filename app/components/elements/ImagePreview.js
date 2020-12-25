import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, SafeAreaView, Text } from 'react-native'
import theme from '../theme/theme'

const ImagePreview = ({ uri, imageName }) => {
  const u = uri
  console.log(u)
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: theme.colors.white, width: '100%', padding: 0 }}>
        <Image
          source={{ uri: 'https://reactjs.org/logo-og.png' }}
          style={{ width: 400, height: 400 }}
        />
        <Text>{imageName}</Text>
      </View>
    </SafeAreaView>
  )
}

ImagePreview.propTypes = {
  uri: PropTypes.string,
  imageName: PropTypes.string,
}

export default ImagePreview
