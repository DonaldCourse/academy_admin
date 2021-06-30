import { postAPI, getAPI } from './index';

const GetCurriculumsTutor = () => {
  return getAPI('/api/admin/curriculums');
}

const CreateCurriculumsTutor = (body) => {
  return postAPI('/api/admin/curriculums', body);
}
export default {
    GetCurriculumsTutor,
    CreateCurriculumsTutor
};
