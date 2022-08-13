import React, { useState } from 'react';
import styled from '@emotion/styled';
import InputGroup from 'components/InputGroup';

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

const InputArea = styled.div`
  > h2 {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > button {
    font-weight: 700;
  }
`;

const LoginBtn = styled.button`
  color: #fff;
  background-color: #333333;
  border-radius: 10px;
  padding: 12px 48px;
  margin-bottom: 24px;
  &:hover {
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.8);
  }
`;

const RegisterBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Login: React.FC = () => {
  const [account, setAccout] = useState();
  return (
    <Wrap>
      <ImgContainer>
        <TitleContainer>
          <img src="/images/check.png" alt="check" />
          <h1>ONLINE TODO LIST</h1>
        </TitleContainer>
        <img src="/images/todo_img.png" alt="todo" />
      </ImgContainer>
      <InputArea>
        <h2>最實用的線上代辦事項服務</h2>
        <InputGroup>
          <label htmlFor="email">
            <p>Email</p>
            <input type="email" id="email" placeholder="請輸入Email" />
            <span>此欄位不可為空</span>
          </label>
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">
            <p>密碼</p>
            <input type="password" id="password" placeholder="請輸入密碼" />
            <span>此欄位不可為空</span>
          </label>
        </InputGroup>
        <ButtonGroup>
          <LoginBtn type="button">登入</LoginBtn>
          <RegisterBtn type="button">註冊帳號</RegisterBtn>
        </ButtonGroup>
      </InputArea>
    </Wrap>
  );
};

export default Login;
