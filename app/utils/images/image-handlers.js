import { S3 } from 'aws-sdk'
import axios from 'axios'
import { decode } from 'base64-arraybuffer'

import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_IMAGE_BUCKET_NAME,
  API_BASE_DOMAIN_DEV,
  SECURE_KEY,
} from '@env'
var fs = require('react-native-fs')

const API_URL = API_BASE_DOMAIN_DEV

export const uploadImageToS3 = async (file) => {
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
  /* s3Bucket.createBucket(() => { */
  const params = {
    Bucket: `${AWS_IMAGE_BUCKET_NAME}`,
    Key: file.fileName,
    Body: arrayBuffer,
    ContentDisposition: contentDeposition,
    ContentType: contentType,
  }
  const res = await new Promise((resolve, reject) => {
    s3Bucket.upload(params, (err, data) => (err == null ? resolve(data) : reject(err)))
  })
  return res
}

export const getImageText = async (data) => {
  var config = {
    headers: {
      Authorization: `Bearer ${SECURE_KEY}`,
      'Content-Type': 'application/json',
    },
  }
  try {
    const r = await axios.post(`${API_URL}/user/retrieve-image-text`, data, config)
    console.log(r)
  } catch (err) {
    console.log(err)
  }
}
