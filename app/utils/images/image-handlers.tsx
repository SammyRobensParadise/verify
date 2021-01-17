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

export type HTTPConfig = {
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

export type TextDetection = {
    Confidence: number;
    DetectedText: string;
    Geometry: Object;
    Id: number;
    Type: string;
};
export type TextData = {
    TextDetections: Array<TextDetection>;
    TextModelVersion: String;
};

export type WebpageData = {
    id: string;
    name: string;
    url: string;
};

export type WebPagesData = {
    value: Array<WebpageData>;
    totalEstimatedMatches: number;
    webSearchUrl: URL;
};

export type SearchData = {
    _type: string;
    rankingResponse: Object;
    webPages: Array<WebPagesData>;
};

export interface S3ObjectTypes {
    Bucket: string;
    ETtag?: String;
    Key: String;
    Location: String;
    key?: String;
}

export interface ImageTextTypes {
    config: HTTPConfig;
    data: TextData;
    headers: Object;
    request: EventTarget;
    status: number;
    statusText: undefined | string;
}

export interface TextSearchTypes {
    config: HTTPConfig;
    data: {
        webPages: SearchData;
        queryContext: { originalQuery: string };
        rankingResponse: {
            mainline: {
                items: Array<{
                    answerType: string;
                    resultIndex: number;
                    value: Object;
                }>;
            };
        };
    };
    headers: Object;
    request: EventTarget;
    status: number;
    statusText: undefined | string;
}

export const uploadImageToS3 = async (file: any): Promise<S3ObjectTypes> => {
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
    const res: S3ObjectTypes = await new Promise((resolve, reject) => {
        s3Bucket.upload(params, (err: Error, data: S3ObjectTypes) =>
            err == null ? resolve(data) : reject(err)
        );
    });
    return res;
};

export const getImageText = async (
    data: S3ObjectTypes
): Promise<ImageTextTypes> => {
    const config = {
        headers: {
            Authorization: `Bearer ${SECURE_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    const r: ImageTextTypes = await axios.post(
        `${API_URL}/user/retrieve-image-text`,
        data,
        config
    );
    return r;
};

export const getImageSearchResults = async (
    data: ImageTextTypes
): Promise<TextSearchTypes> => {
    const config = {
        headers: {
            Authorization: `Bearer ${SECURE_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    const r: TextSearchTypes = await axios.post(
        `${API_URL}/user/retrieve-text-data`,
        data,
        config
    );
    return r;
};
