import { postAPI, getAPI, putAPI } from './index';

const GetAllStudent = (limit, page) => {
    return getAPI(`/api/admin/students?limit=${limit}&page=${page}`);
}

export default {
    GetAllStudent,
};
