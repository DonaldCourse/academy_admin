import { postAPIConfig } from './index';

const UploadFile = data => {
    const config = {
        headers: {
            'Content-type': 'multipart/form-data',
        },
        baseURL: 'http://103.130.218.153:5001' || process.env.REACT_APP_BASE_URL_CDN
    }
    return postAPIConfig('/files', data, config);
};

export default {
    UploadFile
};
