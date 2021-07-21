import { postAPI, getAPI, putAPI } from './index';

const GetCurriculumsTutor = () => {
  return getAPI('/api/admin/categories');
}

const CreateCurriculumsTutor = (body) => {
  return postAPI('/api/admin/categories', body);
}

const UpdateCurriculum = (id, body) => {
  return putAPI(`/api/admin/categories/${id}`, body);
}

export default {
    GetCurriculumsTutor,
    CreateCurriculumsTutor,
    UpdateCurriculum
};
