import { postAPI, getAPI, delAPI, postAPIConfig } from './index';

const target = '/api/auth/login'

const login = data => {
    return postAPI(target, data);
};

const logout = () => {
    return postAPI('/api/auth/logout', {});
};

const validateUser = () => {
    return getAPI('/api/auth/validate-user', {});
};

export default {
    login,
    logout,
    validateUser
};
