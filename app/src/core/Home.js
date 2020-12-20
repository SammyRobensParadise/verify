import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { getDataObject } from '../../utils/store/store-handlers'
import { createOneButtonAlert } from '../../components/alerts/Alerts'
import theme from '../../components/theme/theme'
import { KEYS } from '../../utils/store/keys'
import AvatarIcon from '../../components/elements/Avatar'
import { Slime } from '../../components/svg/Vectors'

const HomePage = () => {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    getDataObject(KEYS.USER_INFO.toString())
      .then((data) => {
        console.log(data)
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
  return (
    <SafeAreaView style={theme.styles.safeArea}>
      <AvatarIcon />
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
            <TouchableOpacity style={styles.button} title={'Log In to Verify'}>
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
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primaryPurple,
    borderRadius: 10,
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
