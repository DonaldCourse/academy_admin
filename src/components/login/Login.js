import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import { pick } from 'lodash'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import AuthServices from '../../services/AuthServices'
import { useAuth } from '../../context/auth';

const Login = () => {
  const history = useHistory();
  const { register, control, errors, handleSubmit } = useForm({});
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#3c4b64");

  const {auth, setAuth, updateAuth} = useAuth();

  const onSubmit = data => {
    const info = pick(data, [
        'username',
        'password',
    ]);
    setLoading(true);
    data = {
      username: info.username,
      password: info.password,
    }
    
    AuthServices.login(data)
      .then(res => {
        setLoading(false);
        console.log(res);
        if (res.status == 201) {
          const role = res.data.user.role;
          if(role == 2){
            setAuth(res.data.user);
            window.localStorage.setItem('token', res.data.accessToken)
            swal({ title: "Thành công", text: 'Login thành công !', icon: 'success', button: 'Đồng ý' })
            history.push(`/dashboard`);
          }
        }else{
          swal({ title: "Lỗi", text: 'Login thất bại ! Vui lòng kiểm tra lại thông tin.', icon: 'error', button: 'Đồng ý' })
        }
      })
      .catch(err => {
        setLoading(false);
        swal({ title: "Lỗi", text: 'Login thất bại !', icon: 'error', button: 'Đồng ý' })
      })
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <h1>Đăng nhập</h1>
                    <p className="text-muted">Đăng nhập vào tài khoản của bạn</p>
                    <CFormGroup>
                      <Controller
                        control={control}
                        id="username"
                        name="username"
                        rules={{ 
                          required: 'Vui lòng nhập tên thiết bị !',
                        }}
                        render={({ onChange }) => (
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              placeholder="Tên đăng nhập"
                              onChange={e => onChange(e.target.value)}
                              invalid={!!errors.name}
                            />
                          </CInputGroup>
                        )}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <Controller
                        control={control}
                        id="password"
                        name="password"
                        rules={{ 
                          required: 'Vui lòng nhập tên thiết bị !',
                        }}
                        render={({ onChange }) => (
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="password"
                              placeholder="Mật khẩu"
                              onChange={e => onChange(e.target.value)}
                              invalid={!!errors.name}
                            />
                          </CInputGroup>
                        )}
                      />
                    </CFormGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" onClick={handleSubmit(onSubmit)} color="primary" style={{minWidth: 119}} className="px-4">Đăng nhập</CButton>
                      </CCol>
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>TING-TONG</h2>
                    <p></p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}></CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

Login.propTypes = {

}