import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { getDataObject } from '../../utils/store/store-handlers'
import { createOneButtonAlert } from '../../components/alerts/Alerts'
import theme from '../../components/theme/theme'
import { KEYS } from '../../utils/store/keys'

const HomePage = () => {
  const [userInfo, setUserInfo] = useState({})

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
  return (
    <SafeAreaView style={theme.styles.safeArea}>
      <Text>welcome</Text>
      <Text>{userInfo.nickname}</Text>
    </SafeAreaView>
  )
}

export default HomePage
