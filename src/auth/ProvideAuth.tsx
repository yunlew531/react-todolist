import React, {
  useState, createContext, PropsWithChildren, useContext,
} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useAuthProvide = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({});
  let isChecking = false;

  const login = async (account: IUser) => {
    const { email, password } = account;
    const body = { user: { email, password } };

    try {
      let res: Response | ILoginApiRes = await fetch(`${process.env.REACT_APP_URL as string}users/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });
      const { status, headers } = res;
      const token = headers.get('authorization');
      res = await res.json() as ILoginApiRes;
      const { nickname } = res;
      if (status !== 200) throw new Error(res.error);
      toast.success(res.message);

      if (!token) return;
      Cookies.set('ReactTodos', token);
      Cookies.set('ReactTodosNickName', nickname, { expires: 7 });
      navigate('/');
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  };

  const logout = () => {
    document.cookie = 'ReactTodos=;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'ReactTodosNickName=;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    setUser({});
    navigate('/login');
  };

  const checkAuth = (() => new Promise((resolve) => {
    if (isChecking) return;
    isChecking = true;
    console.warn('check');

    fetch(`${process.env.REACT_APP_URL as string}check`, {
      method: 'GET',
      headers: { Authorization: Cookies.get('ReactTodos') || '' },
    }).then((res) => {
      const { status } = res;
      if (status === 200) {
        resolve(true);
        setUser({ nickname: Cookies.get('ReactTodosNickName') });
      } else {
        resolve(false);
      }
      isChecking = false;
    }).catch(() => { isChecking = false; });
  }));

  return {
    user,
    login,
    logout,
    setUser,
    checkAuth,
  };
};

interface ProvideAuthContext {
  user?: IUser;
  login: (user: IUser) => void;
  logout: () => void;
  setUser: (user: IUser) => void;
  checkAuth: () => Promise<unknown>;
}

const authContext = createContext({} as ProvideAuthContext);
export const useAuth = () => useContext(authContext);

const ProvideAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuthProvide();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export default ProvideAuth;
