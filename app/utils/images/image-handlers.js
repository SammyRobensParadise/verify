import { SECURE_KEY } from '@env'
import axios from 'axios'
import { API_BASE_URL } from '../urls/urls'
import ImgToBase64 from 'react-native-image-base64'

export const getBlob = async (dataUri) => {
  const encodedImage = `data:image/jpeg;base64,${await ImgToBase64.getBase64String(dataUri)}`
  return encodedImage
}

export const getImageInfo = (file) => {
  const { fileName, type, uri } = file
  const File = { name: fileName, uri: uri, type: type }
  const body = new FormData()
  body.append('file', File)
  return body
}

export const uploadImageToS3 = async (file) => {
  const imageBody = getImageInfo(file)
  const uploadedToS3 = await axios.put(
    `${API_BASE_URL}/upload`,
    { file: imageBody },
    {
      headers: {
        Authorization: `Bearer ${SECURE_KEY}`,
      },
    },
  )
  console.log(uploadedToS3)
}
