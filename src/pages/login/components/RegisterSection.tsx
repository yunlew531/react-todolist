import React from 'react';
import styled from '@emotion/styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import useValidate from 'utils/useValidate';
import toast from 'react-hot-toast';
import { useLoading } from 'components/ProvideLoading';

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

interface IRegisterSectionProps {
  setCurrentDisplay: (v: CurrentDisplay) => void;
}

const RegisterSection: React.FC<IRegisterSectionProps> = ({ setCurrentDisplay }) => {
  const { setIsLoading } = useLoading();
  const {
    emailValidate, passwordValidate, passwordCheckValidate, nickNameValidate,
  } = useValidate();
  const {
    register, handleSubmit, formState: { errors }, getValues,
  } = useForm();

  const handleRegister: SubmitHandler<IUser> = async ({ email, password, nickname }) => {
    setIsLoading(true);
    const body = { user: { email, password, nickname } };
    try {
      let res: Response | IRegisterAPIRes = await fetch(`${process.env.REACT_APP_URL as string}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });
      const { status } = res;
      res = await res.json() as IRegisterAPIRes;

      if (status !== 201) throw new Error(JSON.stringify(res.error));
      toast.success(res.message);
      setCurrentDisplay('login');
    } catch (err) {
      if (err instanceof Error) {
        const resErrors = JSON.parse(err.message) as Array<string>;
        resErrors.forEach((error) => {
          if (!error.match('translation missing')) toast.error(error);
        });
      }
    }
    setIsLoading(false);
  };
  const handlePasswordCheck = (passwordCheck: string) => {
    const { password }: IUser = getValues();
    return passwordCheckValidate(password, passwordCheck);
  };

  /* eslint-disable */
  return (
    <>
      <Title>註冊帳號</Title>
      <form onSubmit={handleSubmit((account) => handleRegister(account))}>
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
          <label htmlFor="name">
            <p>您的暱稱</p>
            <input
              type="text"
              id="name"
              placeholder="請輸入您的暱稱"
              {...register('nickname', { required: '此欄位不可為空', validate: nickNameValidate })}
            />
            <ErrorMessage errors={errors} name="nickname" as="span" />
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
        <InputGroup>
          <label htmlFor="passwordCheck">
            <p>再次輸入密碼</p>
            <input
              type="password"
              id="passwordCheck"
              placeholder="請再次輸入密碼"
              {...register('passwordCheck', { required: '此欄位不可為空', validate: handlePasswordCheck })}
            />
            <ErrorMessage errors={errors} name="passwordCheck" as="span" />
          </label>
        </InputGroup>
        <ButtonGroup>
          <Button type="submit" m="0 0 24px" transitionType="bright">註冊帳號</Button>
          <Button
            onClick={() => setCurrentDisplay('login')}
            type="button"
            p="0"
            color="#333"
            bgColor="transparent"
            border="none"
            transitionType="scale"
          >
            登入
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export default RegisterSection;
