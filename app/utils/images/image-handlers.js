import { SECURE_KEY } from '@env'
import ImgToBase64 from 'react-native-image-base64'

export const getBlob = async (dataUri) => {
  const stagedEncoded = await ImgToBase64.getBase64String(dataUri)
  console.log(stagedEncoded)
  const binary = atob(stagedEncoded)
  const array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: 'image/jpeg' })
}

export const uploadImageToS3 = async (presignedUrl, data) => {
  const imageBody = await getBlob(data)
  console.log('image body= ' + imageBody)
  return fetch(presignedUrl, {
    method: 'PUT',
    body: imageBody,
  })
}
