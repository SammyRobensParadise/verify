import React from 'react';

import {
    getImageSearchResults,
    getImageText,
    ImageTextTypes,
    S3ObjectTypes,
    TextSearchTypes,
    uploadImageToS3
} from './image-handlers';

const ImageContext = React.createContext(null);

const ImageActionId = {
    UPLOAD: 1,
    UPLOAD_SUCCESS: 2,
    UPLOAD_ERROR: 3,
    GET_IMAGE_TEXT: 4,
    GET_IMAGE_TEXT_SUCCESS: 5,
    GET_IMAGE_TEXT_ERROR: 6,
    GET_IMAGE_SEARCH_RESULTS: 7,
    GET_IMAGE_SEARCH_RESULTS_SUCCESS: 8,
    GET_IMAGE_SEARCH_RESULTS_ERROR: 9
};
type ImageState =
    | null
    | ImageTypes
    | S3ObjectTypes
    | ImageTextTypes
    | TextSearchTypes;

type ImageTypes = {
    uploadedToS3: boolean;
    textExtracted: boolean;
    searchResultsExtracted: boolean;
    isLoading: boolean;
    error: boolean;
    uploadData: ImageState;
    imageData: ImageState;
    textSearch: ImageState;
};

type ActionType = {
    type: number;
    payload: Partial<ImageState>;
};

const ImageDefaultState: ImageState = {
    uploadedToS3: false,
    textExtracted: false,
    searchResultsExtracted: false,
    isLoading: false,
    error: false,
    uploadData: null,
    imageData: null,
    textSearch: null
};

const ImageReducer = (state: ImageState, action: ActionType) => {
    switch (action.type) {
        case ImageActionId.UPLOAD: {
            return {
                ...state,
                uploadedToS3: false,
                textExtracted: false,
                searchResultsExtracted: false,
                isLoading: true,
                error: false
            };
        }
        case ImageActionId.UPLOAD_SUCCESS: {
            return {
                ...state,
                uploadedToS3: true,
                textExtracted: false,
                searchResultsExtracted: false,
                isLoading: false,
                error: false,
                uploadData: action.payload
            };
        }
        case ImageActionId.UPLOAD_ERROR: {
            return {
                ...state,
                uploadedToS3: true,
                textExtracted: false,
                searchResultsExtracted: false,
                isLoading: false,
                error: true,
                uploadData: action.payload
            };
        }
        case ImageActionId.GET_IMAGE_TEXT: {
            return {
                ...state,
                uploadedToS3: true,
                textExtracted: false,
                searchResultsExtracted: false,
                isLoading: true,
                error: false
            };
        }
        case ImageActionId.GET_IMAGE_TEXT_SUCCESS: {
            return {
                ...state,
                uploadedToS3: true,
                textExtracted: true,
                searchResultsExtracted: false,
                isLoading: false,
                error: false,
                imageData: action.payload
            };
        }
        case ImageActionId.GET_IMAGE_TEXT_ERROR: {
            return {
                ...state,
                uploadedToS3: true,
                textExtracted: false,
                searchResultsExtracted: false,
                isLoading: false,
                error: true,
                imageData: action.payload
            };
        }
        case ImageActionId.GET_IMAGE_SEARCH_RESULTS: {
            return {
                ...state,
                uploadedToS3: true,
                textExtracted: true,
                searchResultsExtracted: false,
                isLoading: true,
                error: false
            };
        }
        case ImageActionId.GET_IMAGE_SEARCH_RESULTS_SUCCESS: {
            return {
                ...state,
                uploadedToS3: true,
                textExtracted: true,
                searchResultsExtracted: true,
                isLoading: false,
                error: false,
                textSearch: action.payload
            };
        }
        case ImageActionId.GET_IMAGE_SEARCH_RESULTS_ERROR: {
            return {
                ...state,
                uploadedToS3: true,
                textExtracted: true,
                searchResultsExtracted: false,
                isLoading: false,
                error: true,
                textSearch: action.payload
            };
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
};

const upload = (dispatch: React.Dispatch<ActionType>) => async (file: any) => {
    dispatch({ type: ImageActionId.UPLOAD, payload: {} });
    const raw = await uploadImageToS3(file);
    if (raw.err) {
        dispatch({ type: ImageActionId.UPLOAD_ERROR, payload: raw });
        alert('Unable to Upload Photo to S3');
        return null;
    }
    dispatch({ type: ImageActionId.UPLOAD_SUCCESS, payload: raw });
    return raw;
};

const imageText = (dispatch: React.Dispatch<ActionType>) => async (
    data: S3ObjectTypes
) => {
    dispatch({ type: ImageActionId.GET_IMAGE_TEXT, payload: {} });
    const raw = await getImageText(data);
    if (raw.err) {
        dispatch({ type: ImageActionId.GET_IMAGE_TEXT_ERROR, payload: raw });
        alert('Unable to Get Text from Image');
        return null;
    }
    dispatch({ type: ImageActionId.GET_IMAGE_TEXT_SUCCESS, payload: raw });
    return raw;
};

const searchResults = (dispatch: React.Dispatch<ActionType>) => async (
    data: ImageTextTypes
) => {
    dispatch({ type: ImageActionId.GET_IMAGE_SEARCH_RESULTS, payload: {} });
    const raw = await getImageSearchResults(data);
    if (raw.err) {
        dispatch({
            type: ImageActionId.GET_IMAGE_SEARCH_RESULTS_ERROR,
            payload: raw
        });
        alert('Unable to Get Search Results');
        return null;
    }
    dispatch({
        type: ImageActionId.GET_IMAGE_SEARCH_RESULTS_SUCCESS,
        payload: raw
    });
    return raw;
};

type ImageProviderProps = {
    children?: React.ReactNode;
    [key: string]: any; // there are some props passed to Provider which are necessary and will not load component.
};

export const ImageProvider = (props: ImageProviderProps) => {
    // @ts-ignore
    const [state, dispatch] = React.useReducer(ImageReducer, ImageDefaultState);
    const value: any = React.useMemo(() => [state, dispatch], [state]);
    return <ImageContext.Provider value={value} {...props} />;
};

export const useImage = () => {
    const context: any = React.useContext(ImageContext);
    if (!context) {
        throw new Error('useImage must be used within a ImageProvider');
    }
    const [state, dispatch] = context;
    return {
        state,
        dispatch,
        upload: upload(dispatch),
        imageText: imageText(dispatch),
        searchResults: searchResults(dispatch)
    };
};
