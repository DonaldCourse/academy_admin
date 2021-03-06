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
                swal({ title: "Th??nh c??ng", text: 'T???o m?? gi???m gi?? th??nh c??ng !', icon: 'success', button: '?????ng ??' })
                window.location.reload();
            } else {
                swal({ title: "L???i", text: 'T???o m?? gi???m gi?? th???t b???i !', icon: 'error', button: '?????ng ??' })
            }
        } catch (error) {
            swal({ title: "L???i", text: 'T???o m?? gi???m gi?? th???t b???i !', icon: 'error', button: '?????ng ??' })
        }
    }

    return (
        <div>
            <CModal
                show={open}
                onClose={onClose}>
                <CModalHeader closeButton>
                    <CModalTitle>Th??m m?? gi???m gi??</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CRow>
                            <CCol xs="12" md="12">
                                <div className="mb-3">
                                    <CLabel htmlFor="select">Ch???n lo???i gi???m gi??</CLabel>
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
                                    <CLabel htmlFor="select">Ch???n s??? gi???m gi??</CLabel>
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
                                    <CLabel htmlFor="exampleFormControlInput1">M?? t???</CLabel>
                                    <Controller
                                        control={control}
                                        id="description"
                                        name="description"
                                        rules={{ required: 'Vui l??ng nh???p m?? t??? m?? gi???m gi?? !' }}
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
                                        <CLabel htmlFor="exampleFormControlInput1">Ng??y b???t ?????u</CLabel>
                                        <Controller
                                            control={control}
                                            id="startdate"
                                            name="startdate"
                                            rules={{ required: 'Vui l??ng nh???p ng??y b???t ?????u !' }}
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
                                        <CLabel htmlFor="exampleFormControlInput1">Ng??y k???t th??c</CLabel>
                                        <Controller
                                            control={control}
                                            id="expiredate"
                                            name="expiredate"
                                            rules={{ required: 'Vui l??ng nh???p ng??y k???t th??c !' }}
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