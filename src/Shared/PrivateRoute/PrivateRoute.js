import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../Context/Authprovider';

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useContext(authContext)

    if (loading) {
        return <div className='flex justify-center  items-center'>

            <div
                className="flex  w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400">

            </div>
        </div>
    }
    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;