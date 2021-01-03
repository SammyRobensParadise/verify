import { S3 } from 'aws-sdk'
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_IMAGE_BUCKET_NAME } from '@env'
import { decode } from 'base64-arraybuffer'
var fs = require('react-native-fs')

export const uploadImageToS3 = async (file) => {
  let responseData
  const s3Bucket = new S3({
    accessKeyId: `${AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${AWS_SECRET_ACCESS_KEY}`,
    Bucket: `${AWS_IMAGE_BUCKET_NAME}`,
    signatureVersion: 'v4',
  })
  let contentType = 'image/jpeg'
  let contentDeposition = 'inline;filename="' + file.fileName + '"'
  const base64 = await fs.readFile(file.uri, 'base64')
  const arrayBuffer = decode(base64)
  s3Bucket.createBucket(() => {
    const params = {
      Bucket: `${AWS_IMAGE_BUCKET_NAME}`,
      Key: file.fileName,
      Body: arrayBuffer,
      ContentDisposition: contentDeposition,
      ContentType: contentType,
    }
    s3Bucket.upload(params, (err, data) => {
      if (err) {
        console.error('Unable to upload Image')
        alert('Unable to Upload Image')
      } else {
        console.log(data)
        responseData = data
      }
    })
  })
  return responseData
}
