import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, Text, View, ActivityIndicator } from 'react-native'
import theme from '../../components/theme/theme'

const LoadingPage = ({ route, navigation }) => {
  const { iUri, iName } = route.params
  const [currentAnalysisStatus, updateCurrentAnalysisStatus] = useState(1)
  console.log(`URI: ${iUri}`, `NAME: ${iName}`)

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
    <View>
      <Text>{`Step ${phase.toString()}/5`}</Text>
      <Text>{message}</Text>
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
