import React, { useState, useEffect } from 'react'
import { getDataObject } from '../../utils/store/store-handlers'
import { KEYS } from '../../utils/store/keys'
import { ActivityIndicator } from 'react-native'
import { Avatar } from 'react-native-elements'

import theme from '../theme/theme'
const NO_IMAGE = 'no-image'
const AvatarIcon = () => {
  const [Loading, isLoading] = useState(true)
  const [source, setSource] = useState('')

  useEffect(() => {
    getDataObject(KEYS.USER_INFO.toString())
      .then((data) => {
        setSource(data.picture)
        isLoading(false)
      })
      .catch(() => {
        setSource(NO_IMAGE)
        isLoading(false)
      })
  }, [])

  const getAvatar = () => {
    return source === NO_IMAGE ? (
      <Avatar rounded size="small" activeOpacity={0.7} />
    ) : (
      <Avatar
        rounded
        source={{
          uri: source,
        }}
        activeOpacity={0.7}
      />
    )
  }
  return Loading ? <ActivityIndicator color={theme.colors.primaryPurple} /> : getAvatar()
}

export default AvatarIcon
