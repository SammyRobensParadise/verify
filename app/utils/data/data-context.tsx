import React from 'react';
import {
    getAllReportData,
    ReportDataBlob,
    UploadDataResponseType,
    uploadReportData
} from './data-handlers';

const DataContext = React.createContext(null);

const DataActionId = {
    SEND_REPORT_DATA: 1,
    SEND_REPORT_DATA_SUCCESS: 2,
    SEND_REPORT_DATA_ERROR: 3,
    GET_ALL_REPORT_DATA: 4,
    GET_ALL_REPORT_DATA_SUCCESS: 5,
    GET_ALL_REPORT_DATA_ERROR: 6
};

type DataState = {
    reportBlob: ReportDataBlob | null;
    hasUploadedLastPost: boolean;
    isLoading: boolean;
    error: boolean;
    reportInfo: Array<any>;
};

type ActionType = {
    type: number;
    payload: Partial<DataState | ReportDataBlob> | [];
};

const DataDefaultState: DataState = {
    reportBlob: null,
    hasUploadedLastPost: false,
    isLoading: false,
    error: false,
    reportInfo: []
};

const DataReducer = (state: DataState, action: ActionType) => {
    switch (action.type) {
        case DataActionId.SEND_REPORT_DATA: {
            return {
                ...state,
                reportBlob: action.payload,
                hasUploadedLastPost: false,
                isLoading: true,
                error: false
            };
        }
        case DataActionId.SEND_REPORT_DATA_SUCCESS: {
            return {
                ...state,
                reportBlob: action.payload,
                hasUploadedLastPost: true,
                isLoading: false,
                error: false
            };
        }
        case DataActionId.SEND_REPORT_DATA_ERROR: {
            return {
                ...state,
                reportBlob: action.payload,
                hasUploadedLastPost: false,
                isLoading: false,
                error: true
            };
        }
        case DataActionId.GET_ALL_REPORT_DATA: {
            return {
                ...state,
                isLoading: true,
                error: false,
                reportInfo: []
            };
        }
        case DataActionId.GET_ALL_REPORT_DATA_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                error: false,
                reportInfo: action.payload
            };
        }
        case DataActionId.SEND_REPORT_DATA_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true,
                reportInfo: action.payload
            };
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
};

const sendData = (dispatch: React.Dispatch<ActionType>) => async (
    blob: ReportDataBlob
) => {
    dispatch({ type: DataActionId.SEND_REPORT_DATA, payload: blob });
    const raw: UploadDataResponseType = await uploadReportData(blob);
    if (raw.status !== 200) {
        dispatch({ type: DataActionId.SEND_REPORT_DATA_ERROR, payload: blob });
        return false;
    }
    dispatch({ type: DataActionId.SEND_REPORT_DATA_SUCCESS, payload: blob });
    return true;
};

const getAllData = (dispacth: React.Dispatch<ActionType>) => async (
    email: string
) => {
    dispacth({
        type: DataActionId.GET_ALL_REPORT_DATA,
        payload: []
    });
    const raw: any = await getAllReportData(email);
    if (raw.status !== 200) {
        dispacth({ type: DataActionId.SEND_REPORT_DATA_ERROR, payload: raw });
        return false;
    }
    dispacth({ type: DataActionId.SEND_REPORT_DATA_SUCCESS, payload: raw });
    return true;
};

type DataProviderProps = {
    children?: React.ReactNode;
    [key: string]: any; // there are some props passed to Provider which are necessary and will not load component.
};

export const DataProvider = (props: DataProviderProps) => {
    // @ts-ignore
    const [state, dispatch] = React.useReducer(DataReducer, DataDefaultState);
    const value: any = React.useMemo(() => [state, dispatch], [state]);
    return <DataContext.Provider value={value} {...props} />;
};

export const useData = () => {
    const context: any = React.useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    const [state, dispatch] = context;

    return {
        state,
        dispatch,
        sendData: sendData(dispatch),
        getAllData: getAllData(dispatch)
    };
};
