/* eslint-disable no-undef */
import { S3 } from 'aws-sdk';
import axios from 'axios';
import { decode } from 'base64-arraybuffer';
import {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_IMAGE_BUCKET_NAME,
    /* API_BASE_DOMAIN_DEV, */
    API_BASE_DOMAIN,
    SECURE_KEY
} from '@env';
// eslint-disable-next-line @typescript-eslint/no-var-requires
var fs = require('react-native-fs');

const API_URL = API_BASE_DOMAIN;

export interface S3ObjectReference {
    Bucket: string;
    ETtag?: String;
    Key: String;
    Location: String;
    key?: String;
}

type TextConfig = {
    adapter: any;
    data: string;
    headers: Object;
    maxBodyLength: number;
    maxContentLength: number;
    method: string;
    timeout: number;
    transformRequest: Array<any>;
    transformResponse: Array<any>;
    url: string;
    validateStatus: any;
    xsrfCookieName: string;
    xsrfHeaderName: string;
};

type TextDetection = {
    Confidence: number;
    DetectedText: string;
    Geometry: Object;
    Id: number;
    Type: string;
};
type TextData = {
    TextDetections: Array<TextDetection>;
    TextModelVersion: String;
};
export interface ImageTextReference {
    config: TextConfig;
    data: TextData;
    headers: Object;
    request: EventTarget;
    status: number;
    statusText: undefined;
}

export const uploadImageToS3 = async (
    file: any
): Promise<S3ObjectReference> => {
    const s3Bucket = new S3({
        accessKeyId: `${AWS_ACCESS_KEY_ID}`,
        secretAccessKey: `${AWS_SECRET_ACCESS_KEY}`,
        signatureVersion: 'v4',
        region: 'us-east-1'
    });
    let contentType = 'image/jpeg';
    let contentDeposition = 'inline;filename="' + file.fileName + '"';
    const base64 = await fs.readFile(file.uri, 'base64');
    const arrayBuffer = decode(base64);
    const params = {
        Bucket: `${AWS_IMAGE_BUCKET_NAME}`,
        Key: file.fileName,
        Body: arrayBuffer,
        ContentDisposition: contentDeposition,
        ContentType: contentType
    };
    const res: S3ObjectReference = await new Promise((resolve, reject) => {
        s3Bucket.upload(params, (err: Error, data: S3ObjectReference) =>
            err == null ? resolve(data) : reject(err)
        );
    });
    return res;
};

export const getImageText = async (
    data: S3ObjectReference
): Promise<ImageTextReference> => {
    var config = {
        headers: {
            Authorization: `Bearer ${SECURE_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    const r: ImageTextReference = await axios.post(
        `${API_URL}/user/retrieve-image-text`,
        data,
        config
    );
    console.log(r);
    return r;
};
