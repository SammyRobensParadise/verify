import React from 'react';
import { ReportDataBlob, uploadReportData } from './data-handlers';

const DataContext = React.createContext(null);

const DataActionId = {
    SEND_REPORT_DATA: 1,
    SEND_REPORT_DATA_SUCCESS: 2,
    SEND_REPORT_DATA_ERROR: 3
};

type DataState = {
    reportBlob: ReportDataBlob | null;
    hasUploadedLastPost: boolean;
    isUploading: boolean;
    error: boolean;
};

type ActionType = {
    type: number;
    payload: Partial<DataState | ReportDataBlob>;
};

const DataDefaultState: DataState = {
    reportBlob: null,
    hasUploadedLastPost: false,
    isUploading: false,
    error: false
};

const DataReducer = (state: DataState, action: ActionType) => {
    switch (action.type) {
        case DataActionId.SEND_REPORT_DATA: {
            return {
                ...state,
                reportBlob: action.payload,
                hasUploadedLastPost: false,
                isUploading: true,
                error: false
            };
        }
        case DataActionId.SEND_REPORT_DATA_SUCCESS: {
            return {
                ...state,
                reportBlob: action.payload,
                hasUploadedLastPost: true,
                isUploading: false,
                error: false
            };
        }
        case DataActionId.SEND_REPORT_DATA_ERROR: {
            return {
                ...state,
                reportBlob: action.payload,
                hasUploadedLastPost: false,
                isUploading: false,
                error: true
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
    const raw = await uploadReportData(blob);
    if (!raw) {
        dispatch({ type: DataActionId.SEND_REPORT_DATA_ERROR, payload: blob });
        return false;
    }
    dispatch({ type: DataActionId.SEND_REPORT_DATA_SUCCESS, payload: blob });
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
        sendData: sendData(dispatch)
    };
};
