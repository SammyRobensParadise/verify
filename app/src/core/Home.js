/* eslint-disable react-native/split-platform-components */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { getDataObject } from '../../utils/store/store-handlers'
import { createOneButtonAlert } from '../../components/alerts/Alerts'
import theme from '../../components/theme/theme'
import ImagePreview from '../../components/elements/ImagePreview'
import { KEYS } from '../../utils/store/keys'
import AvatarIcon from '../../components/elements/Avatar'
import { Slime } from '../../components/svg/Vectors'

const HomePage = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({})
  const [file, setFile] = useState({})
  const [showImagePreview, setShowImagePreview] = useState(false)

  useEffect(() => {
    getDataObject(KEYS.USER_INFO.toString())
      .then((data) => {
        setUserInfo(data)
      })
      .catch((e) => {
        createOneButtonAlert(
          [{ title: 'OK', event: () => {}, style: 'cancel' }],
          'Unable to load user information',
          e.toString(),
        )
      })
  }, [])

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        })
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    } else return true
  }

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        alert('Write permission err', err)
      }
      return false
    } else return true
  }

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    }
    let isCameraPermitted = await requestCameraPermission()
    let isStoragePermitted = await requestExternalWritePermission()
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          alert('No Image Taken')
          return
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device')
          return
        } else if (response.errorCode == 'permission') {
          alert('Permission Denied. Grant Verify access to your camera in your device settings')
          return
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage)
          return
        }
        setFile(response)
        setShowImagePreview(true)
      })
    }
  }

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      quality: 1,
    }
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device')
        return
      } else if (response.errorCode == 'permission') {
        alert('Permission Denied. Grant Verify access to your photos in your device settings')
        return
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage)
        return
      }
      setFile(response)
      setShowImagePreview(true)
    })
  }

  if (showImagePreview) {
    return <ImagePreview file={file} cancel={setShowImagePreview} navigation={navigation} />
  }

  return (
    <SafeAreaView style={theme.styles.safeArea}>
      <View style={{ alignItems: 'flex-end', marginRight: 20, paddingTop: 10 }}>
        <AvatarIcon />
      </View>
      <View style={{ backgroundColor: theme.colors.white, width: '100%', padding: 0 }}>
        <Slime />
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: theme.typeface.fontFamily,
              fontSize: theme.typeface.textMedium,
              fontWeight: theme.typeface.textBold,
              color: theme.colors.primaryPurple,
              flex: 0,
            }}
          >{`Hi ${userInfo.name}! 👋`}</Text>
          <Text
            style={{
              fontFamily: theme.typeface.fontFamily,
              fontSize: theme.typeface.textMedium,
              fontWeight: theme.typeface.textLight,
              color: theme.colors.primaryPurple,
              marginTop: 40,
              marginBottom: 40,
            }}
          >
            Unsure about some content you&#39;ve seen on the internet? upload a screenshot of the
            post, tweet or image to see if it is accurate...🤔
          </Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.button}
              title={'Choose Photo'}
              onPress={() => chooseFile('photo')}
            >
              <Text
                style={{
                  color: theme.colors.white,
                  fontSize: theme.typeface.textMedium,
                  fontFamily: theme.typeface.fontFamily,
                }}
              >
                Verify and Image or Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonReverse}
              title={'Take Photo'}
              onPress={() => captureImage('photo')}
            >
              <Text
                style={{
                  color: theme.colors.primaryPurple,
                  fontSize: theme.typeface.textMedium,
                  fontFamily: theme.typeface.fontFamily,
                }}
              >
                Take a New Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

HomePage.propTypes = {
  navigation: PropTypes.object,
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
    height: '30%',
    padding: 50,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,

    shadowRadius: 3.84,
  },
  container: {
    backgroundColor: theme.colors.white,
    height: '100%',
    marginTop: 0,
    padding: 30,
  },
})

export default HomePage
