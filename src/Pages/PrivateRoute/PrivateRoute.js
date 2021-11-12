import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    
    const { user, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="page text-center">
                <div className="spinner-grow text-primary m-5 text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    
    return (
        <Route
            { ...rest }
            render={({ location }) => (
                user ? children :
                    <Redirect
                        to={{
                            pathname: '/account',
                            state: { from: location }
                        }}
                    />
            )}
        />
    );
};

export default PrivateRoute;