import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Trang chủ',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản lí giáo trình',
    to: '/curriculums',
    icon: <CIcon name="cil-inbox" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lí khoá học',
    route: '/courses',
    icon: 'cil-layers',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách khoá học',
        to: '/courses',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tạo khoá học',
        to: '/courses/add',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lí mã giảm giá',
    route: '/promotions',
    icon: 'cil-bookmark',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách mã giảm giá',
        to: '/promotions',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Loại giảm giá',
        to: '/promotion-types',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Đơn vị giảm giá',
        to: '/promotion-discounts',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lí giáo viên',
    route: '/tutors',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách giáo viên',
        to: '/tutors',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách giáo viên chờ duyệt',
        to: '/tutors/waiting',
      },
    ],
  },
]

export default _nav
