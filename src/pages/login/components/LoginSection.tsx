import React, { useState } from 'react';
import styled from '@emotion/styled';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  > button {
    font-weight: 700;
  }
`;

interface LoginSectionProps {
  setCurrentDisplay: (v: CurrentDisplay) => void;
}

const LoginSection: React.FC<LoginSectionProps> = ({ setCurrentDisplay }) => {
  const [account, setAccout] = useState();

  return (
    <div>
      <Title>最實用的線上代辦事項服務</Title>
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
        <Button type="button" m="0 0 24px" transitionType="bright">登入</Button>
        <Button
          onClick={() => setCurrentDisplay('register')}
          type="button"
          p="0"
          color="#333"
          bgColor="transparent"
          border="none"
          transitionType="scale"
        >
          註冊帳號
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default LoginSection;
