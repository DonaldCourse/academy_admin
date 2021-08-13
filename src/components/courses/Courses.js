import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CDropdown, CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CPagination,
  CSpinner
} from '@coreui/react';
import PromotionService from '../../services/PromotionService';
import { DocsLink } from '../../reusable';
import { formatUnit } from '../../utils/unitUtils';
import { formatDate, formatDateTime } from '../../utils/datetimeFormatter';
import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import CourseServices from '../../services/CourseServices';

// Spinner : Import
import { css, jsx } from '@emotion/react'
import HashLoader from "react-spinners/HashLoader";
import { useHistory } from 'react-router-dom';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

Courses.propTypes = {};

const fieldsCourses = [
  { key: 'id', label: 'STT', sorter: false, filter: false },
  { key: 'name', label: 'Tên khoá học', sorter: false, filter: false },
  { key: 'categories_id', label: 'Danh mục', _style: { minWidth: '130px' }, sorter: false, filter: false },
  { key: 'overview', label: 'Tổng quan', _style: { minWidth: '130px' }, sorter: false, filter: false },
  { key: 'lecturer_id', label: 'Giáo viên' },
  { key: 'is_published', label: 'Trạng thái', _style: { minWidth: '100px' }, filter: false },
  { key: 'actions', label: 'Hoạt động', _style: { minWidth: '50px' }, filter: false },
]

const getBadge = isActive => {
  return isActive ? 'success' : 'danger'
}

const getShowStatus = isActive => {
  return isActive ? 'Đã phát hành' : 'Chưa phát hành'
}

function Courses(props) {
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#3c4b64");

  useEffect(() => {
    getListCourse(limit, page);
  }, [page])

  const getListCourse = async (limit, page) => {
    CourseServices.GetAllCourse(page, limit).then(res => {
      setCourses(res.data.list);
      setTotalPage(res.data.totalPages);
    }).catch(err => {

    });
  }

  const pageChange = newPage => {
    setPage(newPage);
  }

  const publishedCourse = async item => {
    setLoading(true);
    const body = {
      is_published: !item.is_published,
      courseID: item._id
    }
    CourseServices.ActionPublishCourse(item._id, body).then(res => {
      setLoading(false);
      window.location.reload();
    }).catch(err => {
      setLoading(false);
    })
  }

  return (
    <div>
      <div className="backdrop" hidden={!loading}>
        <HashLoader color={color} loading={loading} css={override} size={50} />
      </div>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Danh sách các các khoá học
              <CButton onClick={() => history.push('/courses/add')} style={{ 'float': 'right' }} title="Thêm mã giảm giá" className="action" color="danger" size="sm">
                <FontAwesomeIcon icon={faPlusCircle} />
                Thêm
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={courses}
                fields={fieldsCourses}
                rowClicked
                hover
                sorter
                striped
                bordered
                noItemsView={{ noItems: 'Không có dữ liệu' }}
                clickableRows
                size="sm"
                itemsPerPage={100}
                pagination
                scopedSlots={{
                  'id': (item, index) => {
                    return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {index + 1} </td>
                  },
                  'name': (item) => {
                    return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.title} </td>
                  },
                  'overview': (item) => {
                    return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.overview} </td>
                  },
                  'categories_id': (item) => {
                    return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.categories_id.name} </td>
                  },
                  'lecturer_id': (item) => {
                    return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.lecturer_id.user_id.name} </td>
                  },
                  'is_published':
                    (item) => (
                      <td style={{ verticalAlign: 'middle' }}>
                        <CBadge color={getBadge(item.is_published)}>
                          {getShowStatus(item.is_published)}
                        </CBadge>
                      </td>
                    ),
                  'actions':
                    (item, index) => {
                      const canActive = item.is_published
                      return (
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                          <CDropdown>
                            <CDropdownToggle className="c-header-nav-link" caret={false}>
                              <CButton title="Hoạt động" variant="outline" className="action" color="primary" size="sm">
                                <CIcon name="cil-options" />
                              </CButton>
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="right">
                              {!canActive ?
                                <CDropdownItem onClick={() => publishedCourse(item)}>
                                  <CButton title="Phát hành" variant="outline" className="action" color="success" size="sm">
                                    <CIcon name="cil-check-circle" />
                                  </CButton>
                                  <span style={{ marginLeft: "5px" }}>Phát hành</span>
                                </CDropdownItem>
                                :
                                <CDropdownItem onClick={() => publishedCourse(item)}>
                                  <CButton title="Tắt phát hành" variant="outline" className="action" color="danger" size="sm">
                                    <CIcon name="cil-check-circle" />
                                  </CButton>
                                  <span style={{ marginLeft: "5px" }}>Tắt phát hành</span>
                                </CDropdownItem>
                              }
                            </CDropdownMenu>
                          </CDropdown>
                        </td>
                      )
                    },
                }}
              />
              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={totalPage}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default Courses;
