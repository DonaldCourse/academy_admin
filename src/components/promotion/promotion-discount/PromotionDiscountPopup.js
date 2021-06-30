import React from 'react';
import PropTypes from 'prop-types';
import { CButton, CCol, CForm, CInput, CInvalidFeedback, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSelect, CSwitch, CTextarea } from '@coreui/react';
import { Controller, useForm } from 'react-hook-form';
import { get, min, pick } from 'lodash';
import PromotionService from '../../../services/PromotionService';
import { useHistory } from 'react-router';
import swal from 'sweetalert';

PromotionDiscountPopup.propTypes = {

};
const defaultValue ={
    unit: "persent",
    discount: 0
}
function PromotionDiscountPopup({ open, onClose }) {
    const { register, errors, control, reset, handleSubmit } = useForm({
        defaultValue
    });

    const onSubmit = data => {
        console.log(data);
        const promotionDiscount = pick(data, [
            'unit',
            'discount'
        ]);

        const body = {
            unit: promotionDiscount.unit,
            discount: parseInt(promotionDiscount.discount)
        }

        createPromotionDiscount(body);
    }

    const createPromotionDiscount = (data) => {
        reset(defaultValue)
        PromotionService.CreatePromotionDiscount(data)
            .then(res => {
                onClose();
                if (res.status == 201) {
                    window.location.reload();
                }else{
                    swal({ title: "Lỗi", text: 'Tạo loại giảm giá thất bại !', icon: 'error', button: 'Đồng ý' })
                }
            }).catch(err => {
                swal({ title: "Lỗi", text: 'Tạo loại giảm giá thất bại !', icon: 'error', button: 'Đồng ý' })
            })
    }

    return (
        <div>
            <CModal
                show={open}
                onClose={onClose}>
                <CModalHeader closeButton>
                    <CModalTitle>Thêm loại đơn vị giảm giá</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CRow>
                            <CCol xs="12" md="12">
                                <div className="mb-3">
                                    <CLabel htmlFor="select">Chọn loại giảm giá</CLabel>
                                    <Controller
                                        control={control}
                                        id="unit"
                                        name="unit"
                                        defaultValue={"persent"}
                                        as={<CSelect>
                                            <option key={1} value={"persent"}>Phần trăm</option>
                                            <option key={2} value={"hour"}>Giờ</option>
                                        </CSelect>}>
                                    </Controller>
                                </div>

                                <div className="mb-3">
                                    <CLabel htmlFor="exampleFormControlInput1">Số lượng</CLabel>
                                    <Controller
                                        control={control}
                                        id="discount"
                                        name="discount"
                                        rules={{ 
                                            required:  'Vui lòng nhập số lượng giảm giá !',
                                            min: 1,
                                            max: 100,
                                        }}
                                        render={({ onChange, value }) => (
                                            <CInput
                                                type="number"
                                                min={1}
                                                max={100}
                                                onChange={e => onChange(e.target.value)}
                                                value={value}
                                                invalid={!!errors.name}
                                            />
                                        )}
                                    />
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `discount.message`, '')}
                                    </CInvalidFeedback>
                                </div>

                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton type="button" onClick={handleSubmit(onSubmit)} size="sm" color="danger">Submit</CButton>
                    <CButton
                        size="sm"
                        color="secondary"
                        onClick={onClose}>Cancel
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
}

export default PromotionDiscountPopup;