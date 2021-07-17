import { postAPI, getAPI, putAPI } from './index';

const GetAllTutor = (limit, page) => {
    return getAPI(`/api/admin/tutors?limit=${limit}&page=${page}`);
}

const GetAllTutorWaiting = (limit, page) => {
    return getAPI(`/api/admin/tutors/waiting?limit=${limit}&page=${page}`);
}

const GetAllTutorApproved = () => {
    return getAPI(`/api/admin/tutors/approved`);
}

const ApproveTutor = (tutorID, body) => {
    return putAPI(`/api/admin/tutors/${tutorID}`, body);
}

const RegisterTutor = (body) => {
    return postAPI(`/api/auth/tutor/register`, body);
}

export default {
    GetAllTutor,
    GetAllTutorWaiting,
    ApproveTutor,
    GetAllTutorApproved,
    RegisterTutor
};
