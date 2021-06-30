import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CButton, CCol, CForm, CInput, CInvalidFeedback, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSelect, CSwitch, CTextarea } from '@coreui/react';
import { Controller, useForm } from 'react-hook-form';
import { get, pick } from 'lodash';
import moment from 'moment';
import Select from 'react-select'
import { formatUnit } from '../../utils/unitUtils';
import PromotionService from '../../services/PromotionService';
import swal from 'sweetalert';
import { useAuth } from '../../context/auth';

PromotionPopup.propTypes = {

};

function PromotionPopup({ open, onClose, defaultValues }) {

    const defaultData = {
        types: defaultValues.types.map(({ id, type_name }, index) => {
            return { value: id, label: type_name }
        }) || [],
        discounts: defaultValues.discounts.map(({ id, unit, discounts }, index) => {
            return { value: id, label: discounts + formatUnit(unit) }
        }) || [],
        description: '',
        startdate: '',
        expiredate: '',
        typeSelected: '',
        discountSelected: ''
    }
    const { auth } = useAuth();
    console.log("donald: " + JSON.stringify(defaultData));

    const { register, errors, control, handleSubmit, reset } = useForm({
        defaultValues: defaultData
    });

    const onSubmit = data => {
        const promotion = pick(data, [
            'type',
            'discount',
            'description',
            'startdate',
            'expiredate',
        ]);
        const body = {
            promotionTypeID: promotion.type,
            promotionDiscountID: promotion.discount,
            promotionOwnerID: auth.id,
            description: promotion.description,
            startDate: promotion.startdate,
            expireDate: promotion.expiredate,
            isExpire: false
        }
        console.log("Donald : ", body);
        reset();
        createPromotion(body);
    }

    const createPromotion = async (body) => {
        try {
            const data = await PromotionService.CreatePromotion(body);
            if (data.status == 201) {
                swal({ title: "Thành công", text: 'Tạo mã giảm giá thành công !', icon: 'success', button: 'Đồng ý' })
                window.location.reload();
            } else {
                swal({ title: "Lỗi", text: 'Tạo mã giảm giá thất bại !', icon: 'error', button: 'Đồng ý' })
            }
        } catch (error) {
            swal({ title: "Lỗi", text: 'Tạo mã giảm giá thất bại !', icon: 'error', button: 'Đồng ý' })
        }
    }

    return (
        <div>
            <CModal
                show={open}
                onClose={onClose}>
                <CModalHeader closeButton>
                    <CModalTitle>Thêm mã giảm giá</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CRow>
                            <CCol xs="12" md="12">
                                <div className="mb-3">
                                    <CLabel htmlFor="select">Chọn loại giảm giá</CLabel>
                                    <Controller
                                        control={control}
                                        id="type"
                                        name="type"
                                        rules={{ required: true }}
                                        render={(props) => (
                                            <CSelect
                                                {...props}
                                                value={props.value}
                                                onChange={(e) => {
                                                    props.onChange(e.target.value)
                                                }}
                                                invalid={!!errors.type}>
                                                {defaultData.types && defaultData.types.map(({ value, label }, index) => (
                                                    <option key={index} value={value} label={label}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </CSelect>
                                        )}>
                                    </Controller>
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `name.type`, '')}
                                    </CInvalidFeedback>
                                </div>

                                <div className="mb-3">
                                    <CLabel htmlFor="select">Chọn số giảm giá</CLabel>
                                    <Controller
                                        control={control}
                                        id="discount"
                                        name="discount"
                                        rules={{ required: true }}
                                        render={(props) => (
                                            <CSelect
                                                {...props}
                                                value={props.value}
                                                onChange={(e) => {
                                                    props.onChange(e.target.value)
                                                }}
                                                invalid={!!errors.discount}>
                                                {defaultData.discounts && defaultData.discounts.map(({ value, label }, index) => (
                                                    <option key={index} value={value} label={label}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </CSelect>
                                        )}>
                                    </Controller>
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `name.discount`, '')}
                                    </CInvalidFeedback>
                                </div>

                                <div className="mb-3">
                                    <CLabel htmlFor="exampleFormControlInput1">Mô tả</CLabel>
                                    <Controller
                                        control={control}
                                        id="description"
                                        name="description"
                                        rules={{ required: 'Vui lòng nhập mô tả mã giảm giá !' }}
                                        render={({ onChange, value }) => (
                                            <CTextarea
                                                value={value}
                                                onChange={e => onChange(e.target.value)}
                                                rows="5"
                                                invalid={!!errors.description}
                                            />
                                        )}
                                    />
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `name.description`, '')}
                                    </CInvalidFeedback>
                                </div>
                                <CRow className="mb-3">
                                    <CCol sm='6'>
                                        <CLabel htmlFor="exampleFormControlInput1">Ngày bắt đầu</CLabel>
                                        <Controller
                                            control={control}
                                            id="startdate"
                                            name="startdate"
                                            rules={{ required: 'Vui lòng nhập ngày bắt đầu !' }}
                                            render={({ onChange, value }) => (
                                                <CInput
                                                    value={value}
                                                    onChange={e => onChange(e.target.value)}
                                                    type="date" placeholder="date"
                                                    invalid={!!errors.startdate}
                                                />
                                            )}
                                        />
                                        <CInvalidFeedback className="help-block">
                                            {get(errors, `name.startdate`, '')}
                                        </CInvalidFeedback>
                                    </CCol>
                                    <CCol sm='6'>
                                        <CLabel htmlFor="exampleFormControlInput1">Ngày kết thúc</CLabel>
                                        <Controller
                                            control={control}
                                            id="expiredate"
                                            name="expiredate"
                                            rules={{ required: 'Vui lòng nhập ngày kết thúc !' }}
                                            render={({ onChange, value }) => (
                                                <CInput
                                                    value={value}
                                                    onChange={e => onChange(e.target.value)}
                                                    type="date" placeholder="date"
                                                    invalid={!!errors.expiredate}
                                                />
                                            )}
                                        />
                                        <CInvalidFeedback className="help-block">
                                            {get(errors, `name.expiredate`, '')}
                                        </CInvalidFeedback>
                                    </CCol>
                                </CRow>
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
        </div >
    );
}

export default PromotionPopup;