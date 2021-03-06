import React, { useEffect, useRef, useState } from 'react';
import PropTypes, { number } from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { get, pick, startsWith, toInteger, toNumber } from 'lodash'
import { CCard, CCardBody, CCardHeader, CCol, CForm, CFormGroup, CRow, CInput, CLabel, CInvalidFeedback, CTextarea, CSelect, CInputFile, CButton, CCardFooter, CNav, CNavLink, CNavItem, CTabContent, CTabPane, CCardText, CTabs } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import swal from 'sweetalert';
import lodash from 'lodash'
import UploadFileCDNService from '../../services/UploadFileCDNService';
import CourseServices from '../../services/CourseServices';
import CurriculumService from '../../services/CurriculumService';
import { useAuth } from '../../context/auth';
import TutorService from '../../services/TutorService';


// Spinner : Import
import { css, jsx } from '@emotion/react'
import HashLoader from "react-spinners/HashLoader";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

CreateCourse.propTypes = {

};

function CreateCourse(props) {
    const { register, errors, control, handleSubmit, reset } = useForm({});
    const [curriculums, setCurriculum] = useState([]);
    const [tutors, setTutors] = useState([]);
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#3c4b64");
    useEffect(() => {
        getCurriculum();
        getTutor();
    }, []);

    const onSubmit = (data, e) => {
        setLoading(true);
        const course = pick(data, [
            'name',
            'level',
            'overview',
            'prerequisites',
            'file',
            'curriculums',
            'description',
            'tutor'
        ]);
        const body = {
            name: course.name,
            level: parseInt(course.level),
            overview: course.overview,
            prerequisites: course.prerequisites,
            curriculumId: course.curriculums,
            description: course.description,
            tutorId: course.tutor
        }
        reset();
        createCourse(body, course.file)
    }

    const createCourse = async (body, file) => {
        const formData = new FormData();
        formData.append('files', file);
        try {
            const result = await UploadFileCDNService.UploadFile(formData);
            if (result.status == 201) {
                body.avatar = result.data[0].path
            }
            const data = await CourseServices.CreateCourse(body);
            if (data.status == 201) {
                setLoading(false);
                swal({ title: "Th??nh c??ng", text: 'T???o kho?? h???c th??nh c??ng !', icon: 'success', button: '?????ng ??' })
                window.location.reload();
            } else {
                setLoading(false);
                swal({ title: "L???i", text: 'T???o kho?? h???c th???t b???i !', icon: 'error', button: '?????ng ??' })
            }
        } catch (error) {
            setLoading(false);
            swal({ title: "L???i", text: 'T???o kho?? h???c th???t b???i !', icon: 'error', button: '?????ng ??' })
        }
    }

    const getCurriculum = async () => {
        CurriculumService.GetCurriculumsTutor()
            .then(res => {
                if (res.status == 200) {
                    const newArray = res.data && res.data.map(({ id, title }) => {
                        return { value: id, label: title }
                    });
                    setCurriculum(newArray);
                }
            }).catch(err => {

            })
    }

    const getTutor = async () => {
        TutorService.GetAllTutorApproved().then(res => {
            if (res.status == 200) {
                const newArray = res.data.list && res.data.list.map(({ id, username }) => {
                    return { value: id, label: username }
                });
                setTutors(newArray);
            }
        }).catch(err => {

        })
    }

    return (
        <div>
            <div className="backdrop" hidden={!loading}>
                <HashLoader color={color} loading={loading} css={override} size={50} />
            </div>
            <CRow>

                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader style={{ 'fontSize': '30px', 'textAlign': 'center' }}>
                            T???o kho?? h???c
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <CRow>
                                    <CCol>
                                        <div className="mb-3">
                                            <CLabel htmlFor="exampleFormControlInput1">T??n kho?? h???c</CLabel>
                                            <Controller
                                                control={control}
                                                id="name"
                                                name="name"
                                                rules={{ required: 'Vui l??ng nh???p t??n kho?? h???c !' }}
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
                                            <CLabel htmlFor="select">Thu???c danh m???c</CLabel>
                                            <Controller
                                                control={control}
                                                id="curriculums"
                                                name="curriculums"
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
                                                {get(errors, `name.curriculums`, '')}
                                            </CInvalidFeedback>
                                        </div>

                                        <div className="mb-3">
                                            <CLabel htmlFor="select">Ph??n c??ng cho gi??o vi??n</CLabel>
                                            <Controller
                                                control={control}
                                                id="tutor"
                                                name="tutor"
                                                rules={{ required: true }}
                                                defaultValue={tutors.length > 0 ? tutors[0].value : ''}
                                                render={(props) => (
                                                    <CSelect
                                                        {...props}
                                                        value={props.value}
                                                        onChange={(e) => {
                                                            props.onChange(e.target.value)
                                                        }}
                                                        invalid={!!errors.curriculums}>
                                                        {tutors && tutors.map(({ value, label }, index) => (
                                                            <option key={index} value={value} label={label}>
                                                                {label}
                                                            </option>
                                                        ))}
                                                    </CSelect>
                                                )}>
                                            </Controller>
                                            <CInvalidFeedback className="help-block">
                                                {get(errors, `name.tutor`, '')}
                                            </CInvalidFeedback>
                                        </div>

                                        <div className="mb-3">
                                            <CLabel htmlFor="select">Ch???n level kho?? h???c</CLabel>
                                            <Controller
                                                control={control}
                                                id="level"
                                                name="level"
                                                as={CSelect}
                                                defaultValue={0}>
                                                <option value={0}>any_level</option>
                                                <option value={1}>beginner</option>
                                                <option value={2}>intermediate</option>
                                                <option value={3}>advance</option>
                                            </Controller>
                                        </div>

                                        <div className="mb-3">
                                            <CLabel htmlFor="exampleFormControlInput1">M?? t???</CLabel>
                                            <Controller
                                                control={control}
                                                id="description"
                                                name="description"
                                                render={({ onChange, value }) => (
                                                    <CTextarea
                                                        rows="5"
                                                        onChange={e => onChange(e.target.value)}
                                                        value={value}
                                                        invalid={!!errors.description}
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <CLabel htmlFor="select">??i???u ki???n ti??n quy???t</CLabel>
                                            <Controller
                                                control={control}
                                                id="prerequisites"
                                                name="prerequisites"
                                                render={({ onChange, value }) => (
                                                    <CTextarea
                                                        rows="5"
                                                        onChange={e => onChange(e.target.value)}
                                                        value={value}
                                                        invalid={!!errors.prerequisites}
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="mb-3" row>
                                            <CLabel htmlFor="select">?????t ???nh ?????i di???n</CLabel>
                                            <Controller
                                                control={control}
                                                rules={{ required: 'Vui l??ng th??m t???p d??? li???u' }}
                                                name="file"
                                                render={({ onChange, value }) => (
                                                    <React.Fragment>
                                                        <CCol xs="12">
                                                            <CInputFile onChange={e => {
                                                                onChange(e.target.files[0]);
                                                            }} custom id="custom-file-input" />
                                                            <CLabel htmlFor="custom-file-input" variant="custom-file">
                                                                {value ? value.name : 'T???i ???nh'}
                                                            </CLabel>
                                                        </CCol>
                                                    </React.Fragment>
                                                )}
                                            />

                                        </div>

                                        <div className="mb-3">
                                            <CLabel htmlFor="exampleFormControlInput1">T???ng quan</CLabel>
                                            <Controller
                                                control={control}
                                                id="overview"
                                                name="overview"
                                                render={({ onChange, value }) => (
                                                    <CTextarea
                                                        rows="50"
                                                        onChange={e => onChange(e.target.value)}
                                                        value={value}
                                                        invalid={!!errors.description}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </CCol>
                                </CRow>

                            </CForm>
                        </CCardBody>

                        <CCardFooter style={{ "textAlign": "right" }}>
                            <CButton type="submit" onClick={handleSubmit(onSubmit)} size="sm" color="primary"><CIcon name="cil-scrubber" />????ng k??</CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow >
        </div>
    );
}

export default CreateCourse;