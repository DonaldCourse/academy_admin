import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CButton, CCol, CForm, CInput, CInvalidFeedback, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSelect, CSwitch, CTextarea, CInputFile } from '@coreui/react';
import { Controller, useForm } from 'react-hook-form';
import { get, pick } from 'lodash';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import CurriculumService from '../../services/CurriculumService';

CurriculumEditPopup.propTypes = {

};

function CurriculumEditPopup({ open, onClose, defaultValues }) {
    const history = useHistory();
    const { register, errors, control, handleSubmit, reset, setValue } = useForm({
        defaultValue: defaultValues
    });
    const [curriculums, setCurriculum] = useState([]);

    useEffect(() => {
        getCurriculum();
    }, []);

    useEffect(() => {
        setValue("name", defaultValues.name);
        setValue("parent", defaultValues.parent);
    }, [defaultValues]);

    const onSubmit = data => {
        const curriculum = pick(data, [
            'name',
            'parent',
        ]);

        const body = {
            name: curriculum.name,
            parent_id: curriculum.parent,
        }
        reset(null);
        updateCurriculum(body);
    }

    const updateCurriculum = async (body) => {
        try {
            const data = await CurriculumService.UpdateCurriculum(defaultValues.id, body);
            if (data.status == 200) {
                swal({ title: "Thành công", text: 'Tạo khoá học thành công !', icon: 'success', button: 'Đồng ý' }).then(res => {
                    onClose();
                    window.location.reload();
                })
            } else {
                swal({ title: "Lỗi", text: 'Tạo khoá học thất bại !', icon: 'error', button: 'Đồng ý' })
            }
        } catch (error) {
            swal({ title: "Lỗi", text: 'Tạo khoá học thất bại !', icon: 'error', button: 'Đồng ý' })
        }
    }

    const getCurriculum = () => {
        CurriculumService.GetCurriculumsTutor()
            .then(res => {
                if (res.status == 200) {
                    const newArray = res.data.data && res.data.data.map(({ _id, name }) => {
                        return { value: _id, label: name }
                    });
                    setCurriculum(newArray);
                }
            }).catch(err => {

            })
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
                    <CModalTitle>Sửa giáo trình</CModalTitle>
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
                                        rules={{ required: 'Vui lòng nhập tên giáo trình !' }}
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
                                    <CLabel htmlFor="select">Thuộc danh mục</CLabel>
                                    <Controller
                                        control={control}
                                        id="parent"
                                        name="parent"
                                        rules={{ required: true }}
                                        defaultValue={curriculums.length > 0 ? curriculums[0].value : ''}
                                        render={(props) => (
                                            <CSelect
                                                {...props}
                                                value={props.value}
                                                onChange={(e) => {
                                                    props.onChange(e.target.value)
                                                }}
                                                invalid={!!errors.curriculums}>
                                                {curriculums && curriculums.map(({ value, label }, index) => (
                                                    <option key={index} value={value} label={label}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </CSelect>
                                        )}>
                                    </Controller>
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `name.categories.message`, '')}
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

export default CurriculumEditPopup;