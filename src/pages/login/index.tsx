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

const FormContainer = styled.div`
  max-width: 304px;
  width: 100%;
`;

const Login: React.FC = () => {
  const [currentDisplay, setCurrentDisplay] = useState<CurrentDisplay>('login');
  return (
    <Wrap>
      <ImgContainer>
        <HeaderTitle />
        <img src="/images/todo_img.png" alt="todo" />
      </ImgContainer>
      <FormContainer>
        { currentDisplay === 'login'
          ? <LoginSection setCurrentDisplay={setCurrentDisplay} />
          : <RegisterSection setCurrentDisplay={setCurrentDisplay} /> }
      </FormContainer>
    </Wrap>
  );
};

export default Login;
