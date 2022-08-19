import React, {
  useState, createContext, PropsWithChildren, useContext,
} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLoading } from 'components/ProvideLoading';

const useAuthProvide = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const [user, setUser] = useState<IUser>({});

  const login = async (account: IUser) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const logout = () => {
    Cookies.remove('ReactTodos');
    Cookies.remove('ReactTodosNickName');
    setUser({});
    navigate('/login');
  };

  const checkAuth = (() => new Promise((resolve) => {
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
    }).catch(() => {
    });
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
