/* eslint-disable no-undef */
import axios from 'axios';
import { API_BASE_DOMAIN, SECURE_KEY } from '@env';
import { UserInfoType } from '../../../types/types';
import {
    HTTPConfig,
    ImageTextTypes,
    S3ObjectTypes,
    TextSearchTypes
} from '../images/image-handlers';

const API_URL = API_BASE_DOMAIN;

export type ReportDataBlob = {
    key: {
        name: string;
        name_fallback: string;
    };
    data: {
        user_locale: string;
        image_data: ImageTextTypes;
        text_search_data: TextSearchTypes;
        updload_data: S3ObjectTypes;
        user_info: UserInfoType;
        user_email: string;
        user_email_verified: boolean;
        user_name: string;
        client_date: string;
    };
};

export type UploadDataResponseType = {
    config: HTTPConfig;
    data: { data: {}; parameters: ReportDataBlob };
    headers: any;
    request: EventTarget;
    status: number;
    statusText: undefined | string;
};

export const _getClientDate = (): string => {
    const d = new Date();
    return d.toISOString();
};

export const _formatBlobs = (
    user: any,
    reportData: any
): ReportDataBlob | null => {
    const { userInfo, isLoggedIn } = user;
    if (!isLoggedIn) {
        // do not continue if the user is not logged in
        return null;
    }
    const { imageData, textSearch, uploadData } = reportData;
    const data: any = {};
    data.user_locale = userInfo.locale;
    data.image_data = imageData.data;
    data.text_search_data = textSearch.data;
    data.upload_data = uploadData;
    data.user_info = userInfo;
    data.user_email = userInfo.email;
    data.user_email_verified = userInfo.email_verified;
    data.user_name = userInfo.name;
    data.client_time = _getClientDate();
    const key: any = {};
    key.name = userInfo.email;
    key.name_fallback = userInfo.nickname;

    const blob = {
        key: key,
        data: data
    };
    return blob;
};

export const uploadReportData = async (
    blob: ReportDataBlob
): Promise<UploadDataResponseType> => {
    const config = {
        headers: {
            Authorization: `Bearer ${SECURE_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    const r: any = await axios.post(
        `${API_URL}/user/upload-report-data`,
        blob,
        config
    );
    return r;
};
