import React from 'react';
import styled from '@emotion/styled';
import Cookie from 'js-cookie';
import toast from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 16px;
  > input {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  } 
`;

const AddTodoBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  border: none;
  border-radius: 10px;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(0.9);
  }
  .add-icon {
    color: #fff;
  }
`;

const TodoInput: React.FC = () => {
  const { handleSubmit, register, setValue } = useForm();

  const addTodo: SubmitHandler<{ content?: string }> = async ({ content }) => {
    const body = { todo: { content } };
    try {
      let res: Response | IAddTodoRes = await fetch(`${(process.env.REACT_APP_URL as string)}todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: Cookie.get('ReactTodos') || '',
        },
        body: JSON.stringify(body),
      });
      const { status } = res;
      if (status !== 201) throw new Error();

      res = await res.json() as IAddTodoRes;
      const { content: resContent } = res;
      toast.success(`已新增 Todo:\u00A0\u00A0${resContent}`, {
        duration: 5000,
      });
      setValue('content', '');
    } catch (err) { toast.error('發生錯誤!'); }
  };

  const onError = (errors: FieldValues) => {
    const { content } = errors as { content: { message: string } };
    toast.error(content.message);
  };

  return (
    <form onSubmit={handleSubmit((formData): void => addTodo(formData), onError)}>
      <InputGroup>
        <input type="text" placeholder="新增代辦事項" {...register('content', { required: '請填寫 Todo 內容' })} />
        <AddTodoBtn type="submit">
          <span className="material-icons-outlined add-icon">add</span>
        </AddTodoBtn>
      </InputGroup>
    </form>
  );
};

export default TodoInput;
