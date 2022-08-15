import React, { useCallback, useEffect, useState } from 'react';
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
  const [todos, setTodos] = useState<Array<ITodo>>([
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
    {
      title: '上英文',
      id: 'opiewe',
      finished: true,
    },
    {
      title: '聽音樂',
      id: 'fraukd',
      finished: false,
    },
    {
      title: '打球',
      id: 'niljve',
      finished: true,
    },
  ]);
  const [displayTodos, setDisplayTodos] = useState<Array<ITodo>>([]);
  const [displayStatus, setDisplayStatus] = useState<DisplayStatus>('all');
  const [unfinishedTodoNum, setUnfinishedTodoNum] = useState(0);

  const calUnfinishedTodo = (todosData: Array<ITodo>) => todosData.reduce((prev, todo) => (
    todo.finished ? prev : prev + 1), 0);

  const todosFilter = useCallback((todosData: Array<ITodo>) => todosData.filter((todo) => {
    let result = false;
    switch (displayStatus) {
      case 'all':
        result = true;
        break;
      case 'finished':
        result = todo.finished;
        break;
      case 'unfinished':
        result = !todo.finished;
        break;
      default:
        result = false;
    }
    return result;
  }), [displayStatus]);

  useEffect(() => {
    setDisplayTodos(todosFilter(todos));
    setUnfinishedTodoNum(calUnfinishedTodo(todos));
  }, [todos, todosFilter]);

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
        {todos.length
          ? (
            <TodoList
              todos={displayTodos}
              unfinishedTodoNum={unfinishedTodoNum}
              setDisplayStatus={setDisplayStatus}
            />
          ) : <TodoEmpty />}
      </TodoContainer>
      <BgDecorations />
    </Wrap>
  );
};

export default Home;
