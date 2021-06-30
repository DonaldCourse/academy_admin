import React from 'react';
import PropTypes from 'prop-types';
import { CButton, CCol, CForm, CInput, CInvalidFeedback, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSelect, CSwitch, CTextarea } from '@coreui/react';
import { Controller, useForm } from 'react-hook-form';
import { get, pick } from 'lodash';
import PromotionService from '../../../services/PromotionService';
import { useHistory } from 'react-router';
import swal from 'sweetalert';

PromotionTypePopup.propTypes = {

};

function PromotionTypePopup({ open, onClose }) {
    const history = useHistory();
    const { register, errors, control, handleSubmit } = useForm({
        defaultValue: null
    });

    const onSubmit = data => {
        const promotionType = pick(data, [
            'typeName',
        ]);

        const body = {
            typeName: promotionType.typeName,
        }

        createPromotionType(body);
    }

    const createPromotionType = (data) => {
        PromotionService.CreatePromotionType(data)
            .then(res => {
                if(res.status == 201){
                    onClose();
                    window.location.reload();
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
                    <CModalTitle>Thêm loại giảm giá</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CRow>
                            <CCol xs="12" md="12">
                                <div className="mb-3">
                                    <CLabel htmlFor="exampleFormControlInput1">Tên loại</CLabel>
                                    <Controller
                                        control={control}
                                        id="typeName"
                                        name="typeName"
                                        rules={{ required: 'Vui lòng nhập tên loại giảm giá !' }}
                                        render={({ onChange, value }) => (
                                            <CInput
                                                onChange={e => onChange(e.target.value)}
                                                value={value}
                                                invalid={!!errors.name}
                                            />
                                        )}
                                    />
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `typeName.message`, '')}
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

export default PromotionTypePopup;