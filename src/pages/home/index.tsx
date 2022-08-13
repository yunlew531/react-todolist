import React, { useState } from 'react';
import styled from '@emotion/styled';
import HeaderTitle from 'components/HeaderTitle';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoEmpty from './components/TodoEmpty';

const Wrap = styled.div`
  padding: 20px 35px;
`;

const Header = styled.header`
  display: flex;
  align-items: start;
  margin-bottom: 40px;
  .userName {
    font-weight: 700;
  }
  > div {
    &:first-of-type {
      margin-right: auto;
    }
  } 
`;

const LogoutBtn = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  margin-left: 24px;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1);
  }
`;

const TodoContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const BgDecorations = styled.div`
  height: 50vh;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  clip-path: polygon(0 22%, 100% 0, 100% 100%, 0% 100%);
  z-index: -1;
`;

const Home: React.FC = () => {
  const [todos, setTodos] = useState([
    {
      title: '吃飯',
      id: 'jfioejw',
      finished: false,
    },
    {
      title: '睡覺',
      id: 'joeijg',
      finished: true,
    },
  ]);

  return (
    <Wrap>
      <Header>
        <HeaderTitle />
        <p className="userName">王小明的代辦</p>
        <LogoutBtn type="button">登出</LogoutBtn>
      </Header>
      <TodoContainer>
        <TodoInput />
        {todos.length ? <TodoList todos={todos} setTodos={setTodos} /> : <TodoEmpty />}
      </TodoContainer>
      <BgDecorations />
    </Wrap>
  );
};

export default Home;
