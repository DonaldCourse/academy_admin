import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types';

PublicRouter.propTypes = {
    component: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node])
};

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return React.createElement(component, finalProps);
};


function PublicRouter({ component, redirectTo = '/', ...rest }) {
    
    return (
        <Route
        {...rest}
        render={routeProps => renderMergedProps(component, routeProps, rest)}
      />
    )
}

export default PublicRouter;