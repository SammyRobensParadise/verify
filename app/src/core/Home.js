import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { getDataObject } from '../../utils/store/store-handlers'
import { createOneButtonAlert } from '../../components/alerts/Alerts'
import theme from '../../components/theme/theme'
import { KEYS } from '../../utils/store/keys'
import AvatarIcon from '../../components/elements/Avatar'

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
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: theme.typeface.fontFamily,
            fontSize: theme.typeface.textMedium,
            fontWeight: theme.typeface.textBold,
            color: theme.colors.primaryPurple,
          }}
        >{`Hi ${userInfo.name}! 👋`}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.offWhite,
    height: '100%',
    marginTop: 0,
    padding: 30,
  },
})

export default HomePage
