import { postAPIConfig } from './index';

const UploadFile = data => {
    const config = {
        headers: {
            'Content-type': 'multipart/form-data',
        },
        baseURL: 'https://cdn.tingtong.xyz' || process.env.REACT_APP_BASE_URL_CDN
    }
    return postAPIConfig('/files', data, config);
};

export default {
    UploadFile
};
