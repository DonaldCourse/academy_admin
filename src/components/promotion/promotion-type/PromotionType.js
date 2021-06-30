import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react';
import PromotionService from '../../../services/PromotionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import PromotionTypePopup from './PromotionTypePopup';

PromotionType.propTypes = {

};

// Table : Config
const fieldsType = [
    { key: 'id', label: 'STT', sorter: false, filter: false },
    { key: 'type_name', label: 'Tên' },
]

function PromotionType(props) {

    const [openPromotionTypePopup, setOpenPromotionTypePopup] = useState(false);
    const [promotionTypes, setPromotionTypes] = useState([]);

    useEffect(() => {
        getPromotionType();
    }, []);

    const getPromotionType = () => {
        PromotionService.GetAllPromotionType().then(res => {
            if (res.status == 200) {
                setPromotionTypes(res.data);
            }
        }).catch(err => {

        })
    };

    const onClosePromotionTypePopup = () => {
        setOpenPromotionTypePopup(!openPromotionTypePopup);
    }


    return (
        <div>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Danh sách các loại giảm giá
                            <CButton onClick={onClosePromotionTypePopup} style={{ 'float': 'right' }} title="Thêm mã giảm giá" className="action" color="danger" size="sm">
                                <FontAwesomeIcon icon={faPlusCircle} />
                                Thêm
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={promotionTypes}
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
                                    'name': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.type_name} </td>
                                    },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <PromotionTypePopup open={openPromotionTypePopup}
                onClose={onClosePromotionTypePopup}>
            </PromotionTypePopup>
        </div>
    );
}

export default PromotionType;