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
    { key: '_id', label: 'STT', sorter: false, filter: false },
    { key: 'name', label: 'Tên' },
    { key: 'parent', label: 'Danh mục cha' },
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
                setCurriculums(res.data.data);
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
                                    '_id': (item, index) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item._id} </td>
                                    },
                                    'name': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.name} </td>
                                    },
                                    'parent': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.parent} </td>
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
                defaultValues={{ parents: curriculums }}>
            </CurriculumPopup>

            <CurriculumEditPopup open={openCurriculumEditPopup}
                onClose={onCloseCurriculumEditPopup}
                defaultValue={defaultValue}>
            </CurriculumEditPopup>
        </div>
    );
}

export default Curriculums;