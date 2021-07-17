import { postAPI, getAPI } from './index';

const GetCurriculumsTutor = () => {
  return getAPI('/api/admin/categories');
}

const CreateCurriculumsTutor = (body) => {
  return postAPI('/api/admin/categories', body);
}
export default {
    GetCurriculumsTutor,
    CreateCurriculumsTutor
};
