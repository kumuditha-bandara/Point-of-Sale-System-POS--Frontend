import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = ({ element: Element, ...rest }) => { // Change prop name from component to element
    const { authToken } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            element={authToken ? <Element {...rest} /> : <Navigate to="/login" />} // Use Navigate instead of Redirect
        />
    );
};

export default ProtectedRoute;
