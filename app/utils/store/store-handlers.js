import AsyncStorage from '@react-native-async-storage/async-storage'

export const TYPES = {
  JSON: 'json',
  STRING: 'string',
}

export const setStore = async (key, value, type) => {
  let V
  const K = `@${key.replace(/\s/g, '')}`
  if (type === TYPES.JSON) {
    V = JSON.stringify(value)
    try {
      await AsyncStorage.setItem(K, V)
    } catch (e) {
      throw new Error('Failed to store value')
    }
    return true
  } else if (type === TYPES.STRING) {
    V = value
    try {
      await AsyncStorage.setItem(K, V)
    } catch (e) {
      throw new Error('Failed to store value')
    }
    return true
  } else {
    throw new Error(`Cannot store value of type ${value}`)
  }
}

export const getStore = async (key, type) => {
  let value
  let err
  try {
    value = await AsyncStorage.getItem(`@${key}`)
  } catch (e) {
    value = e
    err = e
  }
  return type === TYPES.JSON && value !== err ? JSON.parse(value) : value
}
