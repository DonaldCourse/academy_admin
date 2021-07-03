import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CForm, CLabel, CInput, CInvalidFeedback, CCardFooter } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useForm, Controller } from 'react-hook-form';
import { get, pick, startsWith, toInteger, toNumber } from 'lodash'
import TutorService from '../../../services/TutorService';

// Spinner : Import
import { css, jsx } from '@emotion/react'
import HashLoader from "react-spinners/HashLoader";
import { useHistory } from 'react-router-dom';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

function AddTutor(props) {
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#3c4b64");
    const { register, errors, control, handleSubmit, reset } = useForm({});
    const history = useHistory();

    const onSubmit = (data, e) => {
        setLoading(true);
        const info = pick(data, [
            'name',
            'email',
            'password',
        ]);
        const body = {
            name: info.name,
            email: info.email,
            password: info.password
        }
        reset();
        registerTutor(body);
    }

    const registerTutor = async data => {
        TutorService.RegisterTutor(data).then(res => {
            setLoading(false);
            if (res.status == 200) {
                history.push('/tutors');
            }
        }).catch(err => {
            setLoading(false);
        })
    }

    return (
        <div>
            <div className="backdrop" hidden={!loading}>
                <HashLoader color={color} loading={loading} css={override} size={50} />
            </div>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Đăng ký tài khoản giáo viên
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <CRow>
                                    <CCol>
                                        <div className="mb-3">
                                            <CLabel htmlFor="exampleFormControlInput1">Tên giáo viên</CLabel>
                                            <Controller
                                                control={control}
                                                id="name"
                                                name="name"
                                                rules={{ required: 'Vui lòng nhập tên giáo viên !' }}
                                                render={({ onChange, value }) => (
                                                    <CInput
                                                        onChange={e => onChange(e.target.value)}
                                                        value={value}
                                                        invalid={!!errors.name}
                                                    />
                                                )}
                                            />
                                            <CInvalidFeedback className="help-block">
                                                {get(errors, `name.name`, '')}
                                            </CInvalidFeedback>
                                        </div>
                                        <div className="mb-3">
                                            <CLabel htmlFor="exampleFormControlInput1">Email</CLabel>
                                            <Controller
                                                control={control}
                                                id="email"
                                                name="email"
                                                rules={{ required: 'Vui lòng nhập email !' }}
                                                render={({ onChange, value }) => (
                                                    <CInput
                                                        type="email"
                                                        onChange={e => onChange(e.target.value)}
                                                        value={value}
                                                        invalid={!!errors.email}
                                                    />
                                                )}
                                            />
                                            <CInvalidFeedback className="help-block">
                                                {get(errors, `name.email`, '')}
                                            </CInvalidFeedback>
                                        </div>

                                        <div className="mb-3">
                                            <CLabel htmlFor="exampleFormControlInput1">Mật khẩu</CLabel>
                                            <Controller
                                                control={control}
                                                id="password"
                                                name="password"
                                                rules={{ required: 'Vui lòng nhập password !' }}
                                                render={({ onChange, value }) => (
                                                    <CInput
                                                        type="password"
                                                        onChange={e => onChange(e.target.value)}
                                                        value={value}
                                                        invalid={!!errors.email}
                                                    />
                                                )}
                                            />
                                            <CInvalidFeedback className="help-block">
                                                {get(errors, `name.password`, '')}
                                            </CInvalidFeedback>
                                        </div>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                        <CCardFooter style={{ "textAlign": "right" }}>
                            <CButton type="submit" onClick={handleSubmit(onSubmit)} size="sm" color="primary"><CIcon name="cil-scrubber" />Đăng ký</CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
}

AddTutor.propTypes = {

};

export default AddTutor;