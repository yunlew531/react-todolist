import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from 'components/Button';
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
    margin-right: 24px;
  }
  > div {
    &:first-of-type {
      margin-right: auto;
    }
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
        <Button
          type="button"
          p="0"
          color="#333"
          bgColor="transparent"
          border="none"
          transitionType="scale"
        >
          登出
        </Button>
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
