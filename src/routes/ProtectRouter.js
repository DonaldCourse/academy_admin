import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/auth';

ProtectRouter.propTypes = {
    component: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node])
};

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return React.createElement(component, finalProps);
};

function ProtectRouter({ component: Component, redirectTo, ...rest }) {

    const { auth } = useAuth();
    console.log(auth);
    return (
        <Route
            {...rest}
            render={(props) =>
                auth.role ? (
                    (auth.role == 2) ? (
                        redirectTo ?
                            <Redirect
                                to={{
                                    pathname: redirectTo,
                                    search: `from=${props.location.pathname}`,
                                    state: { from: props.location },
                                }}
                            /> : renderMergedProps(Component, props, rest)
                    ) : (<Redirect
                        to={{
                            pathname: '/login',
                            search: `from=${props.location.pathname}`,
                            state: { from: props.location },
                        }}
                    />
                    )
                ) : (<Redirect
                    to={{
                        pathname: '/login',
                        search: `from=${props.location.pathname}`,
                        state: { from: props.location },
                    }}
                />
                )
            }
        />
    )
}

export default ProtectRouter;