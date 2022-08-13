import React, { useState } from 'react';
import styled from '@emotion/styled';
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  > img {
    margin-right: 5px;
  }
  > h1 {
    font-family: 'Baloo Thambi 2';
    font-size: 32px;
    font-weight: 700;
  }
`;

const Login: React.FC = () => {
  const [currentDisplay, setCurrentDisplay] = useState<CurrentDisplay>('register');
  return (
    <Wrap>
      <ImgContainer>
        <TitleContainer>
          <img src="/images/check.png" alt="check" />
          <h1>ONLINE TODO LIST</h1>
        </TitleContainer>
        <img src="/images/todo_img.png" alt="todo" />
      </ImgContainer>
      { currentDisplay === 'login'
        ? <LoginSection setCurrentDisplay={setCurrentDisplay} />
        : <RegisterSection setCurrentDisplay={setCurrentDisplay} /> }
    </Wrap>
  );
};

export default Login;
