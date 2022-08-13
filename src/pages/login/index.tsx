import React, { useState } from 'react';
import styled from '@emotion/styled';
import HeaderTitle from 'components/HeaderTitle';
import LoginSection from './components/LoginSection';
import RegisterSection from './components/RegisterSection';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ImgContainer = styled.div`
  width: 386px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 106px;
`;

const Login: React.FC = () => {
  const [currentDisplay, setCurrentDisplay] = useState<CurrentDisplay>('register');
  return (
    <Wrap>
      <ImgContainer>
        <HeaderTitle />
        <img src="/images/todo_img.png" alt="todo" />
      </ImgContainer>
      { currentDisplay === 'login'
        ? <LoginSection setCurrentDisplay={setCurrentDisplay} />
        : <RegisterSection setCurrentDisplay={setCurrentDisplay} /> }
    </Wrap>
  );
};

export default Login;
