import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CPagination, CTooltip } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { formatDate } from '../../../utils/datetimeFormatter';
import TutorService from '../../../services/TutorService';

ListTutorWaiting.propTypes = {

};
const fieldsTutor = [
    { key: 'id', label: 'STT', sorter: false, filter: false },
    { key: 'name', label: 'Họ và tên', sorter: false, filter: false },
    { key: 'username', label: 'Tên đăng nhập', sorter: false, filter: false },
    { key: 'email', label: 'Email', sorter: false, filter: false },
    { key: "is_accepted", label: 'Trạng thái', _style: { minWidth: '90px' } },
    { key: "created_at", label: 'Ngày tạo', _style: { minWidth: '90px' } },
    { key: "updated_at", label: 'Cập nhật lúc', _style: { minWidth: '90px' } },
    { key: 'actions', label: 'Hoạt động', _style: { minWidth: '50px' }, filter: false },
]

const getBadge = isActive => {
    return isActive ? 'success' : 'danger'
}

const getShowStatus = isActive => {
    return isActive ? 'Đã duyệt' : 'Chưa duyệt'
}
function ListTutorWaiting(props) {
    const [tutors, setTuotors] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        getAllTutor(limit, page);
    }, [page])

    const getAllTutor = (limit, page) => {
        TutorService.GetAllTutorWaiting(limit, page).then(res => {
            if (res.status == 200) {
                setTuotors(res.data.list);
                setTotalPage(res.data.totalPages);
            }
        }).catch(err => {

        })
    }

    const pageChange = newPage => {
        setPage(newPage);
    }

    const approveTutor = async (id, body) => {
        TutorService.ApproveTutor(id, body).then(res => {
            console.log(res);
            if (res.status == 200) {
                window.location.reload();
            }
        }).catch(err => {

        })
    }

    const onHandleOnClick = (id, is_accepted) => {
        const body = {
            is_accepted: is_accepted,
            tutorID: id
        }
        approveTutor(id, body)
    }

    return (
        <div>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Danh sách giáo viên chưa duyệt
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={tutors}
                                fields={fieldsTutor}
                                rowClicked
                                hover
                                sorter
                                striped
                                bordered
                                noItemsView={{ noItems: 'Không có dữ liệu' }}
                                clickableRows
                                size="sm"
                                itemsPerPage={limit}
                                pagination
                                scopedSlots={{
                                    'id': (item, index) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {index + 1} </td>
                                    },
                                    'name': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.first_name + " " + item.last_name} </td>
                                    },
                                    'username': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.username} </td>
                                    },
                                    'email': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.email} </td>
                                    },
                                    'is_accepted':
                                        (item) => (
                                            <td style={{ verticalAlign: 'middle' }}>
                                                <CBadge color={getBadge(item.is_accepted)}>
                                                    {getShowStatus(item.is_accepted)}
                                                </CBadge>
                                            </td>
                                        ),
                                    'created_at': ({ created_at }) => {
                                        return <td style={{ verticalAlign: 'middle' }}>{formatDate(created_at, true)}</td>;
                                    },
                                    'updated_at': ({ updated_at }) => {
                                        return <td style={{ verticalAlign: 'middle' }}>{formatDate(updated_at, true)}</td>;
                                    },
                                    'actions':
                                        (item, index) => {
                                            const canActive = item.is_accepted
                                            return (
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <CTooltip content={canActive ? 'Ngừng hoạt động' : 'Phê duyệt'} placement="right-end">
                                                        <CButton onClick={() => onHandleOnClick(item.id, !canActive)} title={canActive ? 'Ngừng hoạt động' : 'Phê duyệt'} className="action" color={canActive ? 'danger' : 'success'} size="sm">
                                                            <CIcon name="cil-check-circle" />
                                                        </CButton>
                                                    </CTooltip>
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

export default ListTutorWaiting;