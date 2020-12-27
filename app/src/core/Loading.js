import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SECURE_KEY } from '@env'
import { SafeAreaView, Text, View, ActivityIndicator } from 'react-native'
import { API_BASE_URL } from '../../utils/urls/urls'
import { uploadImageToS3 } from '../../utils/images/image-handlers'

import theme from '../../components/theme/theme'
import axios from 'axios'

const LoadingPage = ({ route }) => {
  const { iUri, iName } = route.params
  const [currentAnalysisStatus, updateCurrentAnalysisStatus] = useState(1)
  useEffect(() => {
    const analyzeText = async () => {
      try {
        updateCurrentAnalysisStatus(currentAnalysisStatus + 1)
        try {
          const uploadResponse = await uploadImageToS3(iUri)
          console.log(uploadResponse)
        } catch (err) {
          console.log(err)
          alert(err)
        }
      } catch (err) {
        alert('Unable to analyize photos')
        return
      }
    }
    analyzeText()
  }, [])
  return (
    <SafeAreaView>
      <View style={{ height: '100%' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Text
            style={{
              fontFamily: theme.typeface.fontFamily,
              fontSize: theme.typeface.textMedium,
              fontWeight: theme.typeface.textBold,
              color: theme.colors.primaryPurple,
              flex: 0,
              paddingBottom: 40,
            }}
          >
            Loading...
          </Text>
          <ActivityIndicator size="large" color={theme.colors.primaryPurple} />
          <CurrentAnalysisState phase={currentAnalysisStatus} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const CurrentAnalysisState = ({ phase }) => {
  let message = ''
  switch (phase) {
    case 1:
      message = `Getting image information...`
      break
    case 2:
      message = `Uploading Image...`
      break
    case 3:
      message = `Extracting text from image...`
      break
    case 4:
      message = `Analyzing Results...`
      break
    case 5:
      message = `Almost done...`
      break
    default:
      message = `Analyzing...`
      break
  }

  return (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <Text
        style={{
          fontFamily: theme.typeface.fontFamily,
          fontSize: theme.typeface.textMedium,
          fontWeight: theme.typeface.textLight,
          color: theme.colors.primaryPurple,
          flex: 0,
          paddingBottom: 10,
        }}
      >{`Step ${phase.toString()}/5`}</Text>
      <Text
        style={{
          fontFamily: theme.typeface.fontFamily,
          fontSize: theme.typeface.textMedium,
          fontWeight: theme.typeface.textLight,
          color: theme.colors.primaryPurple,
          flex: 0,
          paddingBottom: 0,
        }}
      >
        {message}
      </Text>
    </View>
  )
}

LoadingPage.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.any,
}

CurrentAnalysisState.propTypes = {
  phase: PropTypes.number,
}
export default LoadingPage
