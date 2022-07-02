import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ children }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;

  return isAuthenticated ? (children) : (<Navigate to='/login' />)

}

export default PrivateRoute;