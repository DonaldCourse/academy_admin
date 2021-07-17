import React from 'react';
import PropTypes from 'prop-types';
import { CButton, CCol, CForm, CInput, CInvalidFeedback, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSelect, CSwitch, CTextarea, CInputFile } from '@coreui/react';
import { Controller, useForm } from 'react-hook-form';
import { get, pick } from 'lodash';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import UploadFileCDNService from '../../services/UploadFileCDNService';
import CurriculumService from '../../services/CurriculumService';
import { reset } from 'enzyme/build/configuration';

CurriculumPopup.propTypes = {

};

function CurriculumPopup({ open, onClose, defaultValues }) {
    const history = useHistory();
    const defaultData = {
        name: "",
        parents: defaultValues.parents.map(({ _id, name }, index) => {
            return { value: _id, label: name }
        }) || [],
    }
    const { register, errors, control, handleSubmit, reset } = useForm({
        defaultValue: defaultData
    });

    const onSubmit = data => {
        const curriculum = pick(data, [
            'name',
            'parent',
        ]);

        const body = {
            name: curriculum.name,
            parent: curriculum.parent,
        }        
        reset(null);
        createCurriculum(body);
    }

    const createCurriculum = async (body) => {
        try {
            const data = await CurriculumService.CreateCurriculumsTutor(body);
            if (data.status == 201) {
                swal({ title: "Thành công", text: 'Tạo khoá học thành công !', icon: 'success', button: 'Đồng ý' })
                window.location.reload();
            } else {
                swal({ title: "Lỗi", text: 'Tạo khoá học thất bại !', icon: 'error', button: 'Đồng ý' })
            }
        } catch (error) {
            swal({ title: "Lỗi", text: 'Tạo khoá học thất bại !', icon: 'error', button: 'Đồng ý' })
        }
    }

    const onHandleClose = () => {
        onClose();
        reset(null);
    }

    return (
        <div>
            <CModal
                show={open}
                onClose={onClose}>
                <CModalHeader closeButton>
                    <CModalTitle>Thêm loại danh mục</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CRow>
                            <CCol xs="12" md="12">
                                <div className="mb-3">
                                    <CLabel htmlFor="exampleFormControlInput1">Tên</CLabel>
                                    <Controller
                                        control={control}
                                        id="name"
                                        name="name"
                                        rules={{ required: 'Vui lòng nhập tên danh mục !' }}
                                        render={({ onChange, value }) => (
                                            <CInput
                                                onChange={e => onChange(e.target.value)}
                                                value={value}
                                                invalid={!!errors.name}
                                            />
                                        )}
                                    />
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `name.name.message`, '')}
                                    </CInvalidFeedback>
                                </div>

                                <div className="mb-3">
                                    <CLabel htmlFor="select">Chọn danh mục</CLabel>
                                    <Controller
                                        control={control}
                                        id="parent"
                                        name="parent"
                                        rules={{ required: true }}
                                        render={(props) => (
                                            <CSelect
                                                {...props}
                                                value={props.value}
                                                onChange={(e) => {
                                                    props.onChange(e.target.value)
                                                }}
                                                invalid={!!errors.type}>
                                                {defaultData.parents && defaultData.parents.map(({ value, label }, index) => (
                                                    <option key={index} value={value} label={label}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </CSelect>
                                        )}>
                                    </Controller>
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `name.parent`, '')}
                                    </CInvalidFeedback>
                                </div>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton type="button" onClick={handleSubmit(onSubmit)} size="sm" color="danger">Submit</CButton>
                    <CButton
                        type="reset"
                        size="sm"
                        color="secondary"
                        onClick={onHandleClose}>Cancel
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default CurriculumPopup;