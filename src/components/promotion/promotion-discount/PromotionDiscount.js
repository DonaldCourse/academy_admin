import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react';
import PromotionService from '../../../services/PromotionService';
import { formatUnit } from '../../../utils/unitUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import PromotionDiscountPopup from './PromotionDiscountPopup';

PromotionDiscount.propTypes = {

};
const fieldsDiscount = [
    { key: 'id', label: 'STT', sorter: false, filter: false },
    { key: 'discounts', label: 'Giảm giá' },
    { key: 'unit', label: 'Đơn vị' },
]
function PromotionDiscount(props) {
    const [openPromotionDiscountPopup, setOpenPromotionDiscountTypePopup] = useState(false);
    const [promotionDiscounts, setPromotionDiscounts] = useState([]);

    useEffect(() => {
        getPromotionDiscount();
    }, [])

    const getPromotionDiscount = () => {
        PromotionService.GetAllPromotionDiscount().then(res => {
            if (res.status == 200) {
                setPromotionDiscounts(res.data);
            }
        }).catch(err => {

        })
    };

    const onClosePromotionDiscountPopup = () => {
        setOpenPromotionDiscountTypePopup(!openPromotionDiscountPopup);
    }

    return (
        <div>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Danh sách các đơn vị giảm giá
                            <CButton onClick={onClosePromotionDiscountPopup} style={{ 'float': 'right' }} title="Thêm mã giảm giá" className="action" color="danger" size="sm">
                                <FontAwesomeIcon icon={faPlusCircle} />
                                Thêm
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={promotionDiscounts}
                                fields={fieldsDiscount}
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
                                    'discounts': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.discounts} </td>
                                    },
                                    'unit': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {formatUnit(item.unit, true)} </td>
                                    },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <PromotionDiscountPopup
                open={openPromotionDiscountPopup}
                onClose={onClosePromotionDiscountPopup}
            >
            </PromotionDiscountPopup>
        </div>
    );
}

export default PromotionDiscount;