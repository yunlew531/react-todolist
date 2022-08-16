import React, {
  useState, createContext, PropsWithChildren, useContext,
} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useAuthProvide = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();

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

      if (status !== 200) throw new Error(res.error);
      toast.success(res.message);

      if (!token) return;
      const expires = (new Date(Date.now() + 60 * 60 * 24 * 5 * 1000)).toString();
      document.cookie = `ReactTodos=${token};expires=${expires};`;
      navigate('/');
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  };

  const logout = () => {};

  return {
    user,
    login,
    logout,
    setUser,
  };
};

interface ProvideAuthContext {
  user?: IUser;
  login: (user: IUser) => void;
  logout: () => void;
  setUser: (user: IUser) => void;
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
