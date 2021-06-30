import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import CurriculumPopup from './CurriculumPopup';
import CurriculumEditPopup from './CurriculumEditPopup';
import CurriculumService from '../../services/CurriculumService';
import CIcon from '@coreui/icons-react';

Curriculums.propTypes = {

};

const fieldsType = [
    { key: 'id', label: 'STT', sorter: false, filter: false },
    { key: 'title', label: 'Tên' },
    { key: 'description', label: 'Mô tả' },
    { key: 'avatar', label: 'Ảnh', _style: { minWidth: '130px' }, sorter: false, filter: false },
    { key: 'actions', label: 'Hoạt động', _style: { minWidth: '50px' }, filter: false },
]

function Curriculums(props) {
    const [openCurriculumPopup, setOpenCurriculumPopup] = useState(false);
    const [openCurriculumEditPopup, setOpenCurriculumEditPopup] = useState(false);
    const [curriculums, setCurriculums] = useState([]);
    const [defaultValue, setDefaultValue] = useState({});
    useEffect(() => {
        getPromotionType();
    }, []);

    const getPromotionType = () => {
        CurriculumService.GetCurriculumsTutor().then(res => {
            if (res.status == 200) {
                setCurriculums(res.data);
            }
        }).catch(err => {

        })
    };

    const onCloseCurriculumPopup = () => {
        setOpenCurriculumPopup(!openCurriculumPopup);
        setDefaultValue({});
    }

    const onCloseCurriculumEditPopup = () => {
        setOpenCurriculumEditPopup(!openCurriculumEditPopup);
    }

    const updateCurriculum = (item) => {
        setDefaultValue({title: item.title, description: item.description, file: item.avatar});
        setOpenCurriculumEditPopup(!openCurriculumEditPopup);
    }
    return (
        <div>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Danh sách các danh mục
                            <CButton onClick={onCloseCurriculumPopup} style={{ 'float': 'right' }} title="Thêm mã giảm giá" className="action" color="danger" size="sm">
                                <FontAwesomeIcon icon={faPlusCircle} />
                                Thêm
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={curriculums}
                                fields={fieldsType}
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
                                    'title': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.title} </td>
                                    },
                                    'description': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.description} </td>
                                    },
                                    'avatar': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}>
                                            <img style={{ width: 100, height: 100 }} src={item.avatar}></img>
                                        </td>
                                    },
                                    'actions':
                                        (item, index) => {
                                            return (
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <CButton onClick={() => updateCurriculum(item)} title="Chỉnh promotion" variant="outline" className="action" color="info" size="sm">
                                                        <CIcon name="cil-pencil" />
                                                    </CButton>
                                                </td>
                                            )
                                        },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CurriculumPopup open={openCurriculumPopup}
                onClose={onCloseCurriculumPopup}
                defaultValue={defaultValue}>
            </CurriculumPopup>

            <CurriculumEditPopup open={openCurriculumEditPopup}
                onClose={onCloseCurriculumEditPopup}
                defaultValue={defaultValue}>
            </CurriculumEditPopup>
        </div>
    );
}

export default Curriculums;