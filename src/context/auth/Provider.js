import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'
import Context from './Context'
import authReducer from '../../reducer/AuthReducer'
import AuthServices from '../../services/AuthServices'
import { useHistory } from 'react-router-dom'
const AuthProvider = ({ persistKey = 'auth', children }) => {
    const persistAuth = JSON.parse(localStorage.getItem(persistKey))
    const [auth, dispatch] = useReducer(authReducer, persistAuth || {})
    const history = useHistory();

    useEffect(() => {
        validateUser();
    }, [])

    useEffect(() => {
        try {
            localStorage.setItem(persistKey, JSON.stringify(auth))
        } catch (error) {
            console.warn(error)
        }
    }, [auth, persistKey]);

    const validateUser = async () => {
        const data = await AuthServices.validateUser();
        try {
            if (data.status == 200) {
                console.log(data.data);
                setAuth(data.data.user);
            }else{
                setAuth({});
            }
        } catch (error) {
            setAuth({});
        }
    }

    const setAuth = (auth) => {
        dispatch({ type: 'SET_AUTH', auth })
    }

    const updateAuth = (auth) => {
        dispatch({ type: 'UPDATE_AUTH', auth })
    }

    return (
        <Context.Provider value={{ auth, setAuth, updateAuth }}>
            {children}
        </Context.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.any,
}

export default AuthProvider