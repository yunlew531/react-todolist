import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './ProvideAuth';

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children as JSX.Element : <Navigate to={{ pathname: '/login' }} />;
};

export default PrivateRoute;
