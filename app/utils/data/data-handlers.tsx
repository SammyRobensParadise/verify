export const _formatBlobs = (user: any, reportData: any) => {
    const { userInfo, isLoggedIn } = user;
    if (!isLoggedIn) {
        // do not continue if the user is not logged in
        return;
    }
    const { imageData, textSearch, uploadData } = reportData;
    const blob: any = {};
    blob.user_locale = userInfo.locale;
    blob.image_data = imageData.data;
    blob.text_search_data = textSearch.data;
    blob.upload_data = uploadData;
    blob.user_info = userInfo;
    return blob;
};
