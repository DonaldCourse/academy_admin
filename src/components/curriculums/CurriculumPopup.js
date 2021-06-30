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

function CurriculumPopup({ open, onClose }) {
    const history = useHistory();
    const { register, errors, control, handleSubmit, reset } = useForm({
        defaultValue: null
    });

    const onSubmit = data => {
        const curriculum = pick(data, [
            'title',
            'description',
            'file'
        ]);

        const body = {
            title: curriculum.title,
            description: curriculum.description,
        }
        reset(null);
        createCurriculum(body, curriculum.file);
    }

    const createCurriculum = async (body, file) => {
        const formData = new FormData();
        formData.append('files', file);
        try {
            const result = await UploadFileCDNService.UploadFile(formData);
            if (result.status == 201) {
                body.avatar = result.data[0].url
            }
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
                    <CModalTitle>Thêm loại giáo trình</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CRow>
                            <CCol xs="12" md="12">
                                <div className="mb-3">
                                    <CLabel htmlFor="exampleFormControlInput1">Tên</CLabel>
                                    <Controller
                                        control={control}
                                        id="title"
                                        name="title"
                                        rules={{ required: 'Vui lòng nhập tên giáo trình !' }}
                                        render={({ onChange, value }) => (
                                            <CInput
                                                onChange={e => onChange(e.target.value)}
                                                value={value}
                                                invalid={!!errors.title}
                                            />
                                        )}
                                    />
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `name.title.message`, '')}
                                    </CInvalidFeedback>
                                </div>

                                <div className="mb-3">
                                    <CLabel htmlFor="exampleFormControlInput1">Mô tả</CLabel>
                                    <Controller
                                        control={control}
                                        id="description"
                                        name="description"
                                        rules={{ required: 'Vui lòng nhập mô tả!' }}
                                        render={({ onChange, value }) => (
                                            <CTextarea
                                                rows="5"
                                                onChange={e => onChange(e.target.value)}
                                                value={value}
                                                invalid={!!errors.description}
                                            />
                                        )}
                                    />
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `name.description.message`, '')}
                                    </CInvalidFeedback>
                                </div>


                                <div className="mb-3" row>
                                    <CLabel htmlFor="select">Đặt ảnh đại diện</CLabel>
                                    <Controller
                                        control={control}
                                        rules={{ required: 'Vui lòng thêm tệp dữ liệu' }}
                                        name="file"
                                        render={({ onChange, value }) => (
                                            <React.Fragment>
                                                <CCol xs="12">
                                                    <CInputFile
                                                        invalid={!!errors.file}
                                                        onChange={e => {
                                                            onChange(e.target.files[0]);
                                                        }} custom id="custom-file-input" />
                                                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                                                        {value ? value.name : 'Tải ảnh'}
                                                    </CLabel>
                                                </CCol>
                                            </React.Fragment>
                                        )}
                                    />
                                    <CInvalidFeedback className="help-block">
                                        {get(errors, `name.file.message`, '')}
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