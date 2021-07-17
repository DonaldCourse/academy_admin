import { postAPI, getAPI } from "./index";

const CreateCourse = (data) => {
  return postAPI("/api/admin/courses", data);
};

const GetAllCourse = (page, limit) => {
  return getAPI(`/api/admin/courses?page=${page}&limit=${limit}`);
};

const GetCourseDetailOfTeacher = (params) => {
  return getAPI(`/api/admin/courses/${params}`);
};

const CreateLessonTitle = (params, data) => {
  return postAPI(`api/admin/courses/${params}/lessons`, data);
};

const GetLessonTitle = (params) => {
  return getAPI(`api/admin/courses/${params}/lessons`);
};

const CreateLessonSlide = (params, data) => {
  return postAPI(`api/admin/courses/${params}/lesson-slide`, data);
};

const getLessonSlide = (params, data) => {
  return getAPI(`api/admin/lessons/${params}/lesson-slide`);
};

const CreateLessonVideo = (params, data) => {
  return postAPI(`api/admin/courses/${params}/lesson-video`, data);
};

const getLessonVideo = (params) => {
  return getAPI(`api/admin/lessons/${params}/lesson-video`);
};

const ActionPublishCourse = (params, data) => {
  return postAPI(`api/admin/courses/${params}`, data)
}

export default {
  CreateCourse,
  GetAllCourse,
  GetCourseDetailOfTeacher,
  CreateLessonTitle,
  CreateLessonSlide,
  CreateLessonVideo,
  GetLessonTitle,
  getLessonSlide,
  getLessonVideo,
  ActionPublishCourse
};
