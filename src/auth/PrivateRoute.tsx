import React, { PropsWithChildren, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { useAuth } from './ProvideAuth';

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, checkAuth } = useAuth();
  const [element, setElement] = useState(<div />);

  useEffect(() => {
    if (user?.nickname) {
      setElement(children as JSX.Element);
    } else {
      checkAuth().then((isLogin) => {
        if (isLogin) {
          setElement(children as JSX.Element);
        } else {
          toast.error('您尚未登入!');
          setElement(<Navigate to={{ pathname: '/login' }} />);
        }
      }).catch(() => {});
    }
  }, [user?.nickname, children, checkAuth]);
  return element;
};

export default PrivateRoute;
