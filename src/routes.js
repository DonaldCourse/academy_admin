import React from 'react';
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const Courses = React.lazy(() => import('./components/courses/Courses'));
const CreateCourse = React.lazy(() => import('./components/courses/CreateCourse'));
const Promotions = React.lazy(() => import('./components/promotion/Promotion'));
const PromotionType = React.lazy(() => import('./components/promotion/promotion-type/PromotionType'));
const PromotionDiscount = React.lazy(() => import('./components/promotion/promotion-discount/PromotionDiscount'));
const ListTutor = React.lazy(() => import('./components/tutors/list-tutors/ListTutor'));
const ListTutorWaiting = React.lazy(() => import('./components/tutors/list-tutor-waiting/ListTutorWaiting'));
const AddTutor = React.lazy(() => import('./components/tutors/add-tutors/AddTutor'));

const Curriculums = React.lazy(() => import('./components/curriculums/Curriculums'));
const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/dashboard', name: 'Trang chủ', component: Dashboard },
  { path: '/courses', exact: true, name: 'Khoá học', component: Courses },
  { path: '/courses/add', exact: true, name: 'Tạo khoá học', component: CreateCourse },
  { path: '/promotions', exact: true, name: 'Mã giảm giá', component: Promotions },
  { path: '/promotion-types', exact: true, name: 'Loại giảm giá', component: PromotionType },
  { path: '/promotion-discounts', exact: true, name: 'Đơn vị giảm giá', component: PromotionDiscount },
  { path: '/tutors', exact: true, name: 'Danh sách giáo viên', component: ListTutor },
  { path: '/tutors/add', exact: true, name: 'Thêm giáo viên', component: AddTutor },
  { path: '/tutors/waiting', exact: true, name: 'Mã giảm giá', component: ListTutorWaiting },
  { path: '/categories', name: 'Danh mục', component: Curriculums }
];

export default routes;
