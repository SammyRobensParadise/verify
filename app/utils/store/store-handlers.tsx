import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInfoType } from 'types/types';

export const TYPES = {
    JSON: 'json',
    STRING: 'string'
};

export const storeData = async (key: string, value: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        alert(`Unable to get Data ${e}`);
    }
};

export const storeDataObject = async (
    key: string,
    value: UserInfoType | string
): Promise<void> => {
    try {
        const jsonValue: string = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        alert(`Unable to get Data ${e}`);
    }
};

export const getData = async (key: string): Promise<void> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // value previously stored
        }
    } catch (e) {
        alert(`Unable to get Data ${e}`);
    }
};

export const getDataObject = async (
    key: string
): Promise<UserInfoType | undefined> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        alert(`Unable to get Data ${e}`);
    }
};
