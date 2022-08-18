import React, {
  createContext, PropsWithChildren, useContext, useState,
} from 'react';
import styled from '@emotion/styled';
import { ReactComponent as LoadingSvgOrigin } from 'images/Rolling.svg';

interface IProvideLoadingContext {
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
}
const loadingContext = createContext({} as IProvideLoadingContext);

const useLoadingProvide = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    setIsLoading,
  };
};

export const useLoading = () => useContext(loadingContext);

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  width: 100%;
  background-color: #000;
  opacity: 0.5;
`;

const LoadingSvg = styled(LoadingSvgOrigin)`
  width: 50px;
  height: 50px;
  background-color: transparent;
`;

const ProvideLoading: React.FC<PropsWithChildren> = ({ children }) => {
  const loading = useLoadingProvide();
  return (
    <loadingContext.Provider value={loading}>
      {loading.isLoading && (
        <Loading>
          <LoadingSvg />
        </Loading>
      )}
      {children}
    </loadingContext.Provider>
  );
};

export default ProvideLoading;
