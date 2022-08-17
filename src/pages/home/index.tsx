import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from 'components/Button';
import PrivateRoute from 'auth/PrivateRoute';
import HeaderTitle from 'components/HeaderTitle';
import { useAuth } from 'auth/ProvideAuth';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
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
  const { logout, user } = useAuth();
  const [todos, setTodos] = useState<Array<ITodo>>([]);

  const [displayTodos, setDisplayTodos] = useState<Array<ITodo>>([]);
  const [displayStatus, setDisplayStatus] = useState<DisplayStatus>('all');
  const [unfinishedTodoNum, setUnfinishedTodoNum] = useState(0);
  const [progressBarStyle, setProgressBarStyle] = useState({ left: 0 });

  const handleProgressBar = useCallback(() => {
    const style = { left: 0 };
    if (displayStatus === 'unfinished') style.left = 33.333;
    else if (displayStatus === 'finished') style.left = 66.666;
    return style;
  }, [displayStatus]);

  const calUnfinishedTodo = (todosData: Array<ITodo>) => todosData.reduce((prev, todo) => (
    todo.completed_at ? prev : prev + 1), 0);

  const todosFilter = useCallback((todosData: Array<ITodo>) => todosData.filter((todo) => {
    let result = false;
    switch (displayStatus) {
      case 'all':
        result = true;
        break;
      case 'finished':
        result = todo.completed_at;
        break;
      case 'unfinished':
        result = !todo.completed_at;
        break;
      default:
        result = false;
    }
    return result;
  }), [displayStatus]);

  const getTodos = useCallback(async () => {
    try {
      let res: Response | IGetTodosRes = await fetch(`${process.env.REACT_APP_URL as string}todos`, {
        method: 'GET',
        headers: { Authorization: Cookies.get('ReactTodos') || '' },
      });
      const { status } = res;
      if (status !== 200) throw new Error();

      res = await res.json() as IGetTodosRes;
      const { todos: todosRes } = res;
      if (!todosRes) return;
      setTodos(todosRes);
    } catch (err) { toast.error('發生錯誤，無法取得資料!'); }
  }, []);

  useEffect(() => {
    getTodos().catch(() => {});
  }, [getTodos]);

  useEffect(() => {
    setDisplayTodos(todosFilter(todos));
    setUnfinishedTodoNum(calUnfinishedTodo(todos));
  }, [todos, todosFilter, getTodos]);

  useEffect(() => {
    setProgressBarStyle(handleProgressBar());
  }, [displayStatus, handleProgressBar]);

  return (
    <Wrap>
      <Header>
        <HeaderTitle />
        <p className="userName">{user?.nickname}的代辦</p>
        <Button
          type="button"
          p="0"
          color="#333"
          bgColor="transparent"
          border="none"
          transitionType="scale"
          onClick={logout}
        >
          登出
        </Button>
      </Header>
      <TodoContainer>
        <TodoInput getTodos={getTodos} />
        {todos.length
          ? (
            <TodoList
              todos={displayTodos}
              unfinishedTodoNum={unfinishedTodoNum}
              progressBarStyle={progressBarStyle}
              setDisplayStatus={setDisplayStatus}
              getTodos={getTodos}
            />
          ) : <TodoEmpty />}
      </TodoContainer>
      <BgDecorations />
    </Wrap>
  );
};

const HomeWrapper: React.FC = () => (
  <PrivateRoute>
    <Home />
  </PrivateRoute>
);

export default HomeWrapper;
