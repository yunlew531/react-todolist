import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import { useAuth } from 'auth/ProvideAuth';
import useValidate from 'utils/useValidate';

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

interface ILoginSectionProps {
  setCurrentDisplay: (v: CurrentDisplay) => void;
}

const LoginSection: React.FC<ILoginSectionProps> = ({ setCurrentDisplay }) => {
  const auth = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>({});
  const { emailValidate, passwordValidate } = useValidate();

  /* eslint-disable */
  return (
    <>
      <Title>最實用的線上代辦事項服務</Title>
      <form onSubmit={handleSubmit((account) => auth.login(account))}>
        <InputGroup>
          <label htmlFor="email">
            <p>Email</p>
            <input
              type="text"
              id="email"
              placeholder="請輸入Email"
              {...register('email', { required: '此欄位不可為空', validate: emailValidate })}
            />
            <ErrorMessage errors={errors} name="email" as="span" />
          </label>
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">
            <p>密碼</p>
            <input
              type="password"
              id="password"
              placeholder="請輸入密碼"
              {...register('password', { required: '此欄位不可為空', validate: passwordValidate })}
            />
            <ErrorMessage errors={errors} name="password" as="span" />
          </label>
        </InputGroup>
        <ButtonGroup>
          <Button
            type="submit"
            m="0 0 24px"
            transitionType="bright"
          >登入
          </Button>
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
      </form>
    </>
  );
};

export default LoginSection;
