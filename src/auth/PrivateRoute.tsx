import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './ProvideAuth';

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();
  console.log('auth', auth.user === true);
  return auth.user ? children as JSX.Element : <Navigate to={{ pathname: '/login' }} />;
};

export default PrivateRoute;
