import React from 'react';
import styled from '@emotion/styled';
import Progress from 'pages/home/components/Progress';
import Button from 'components/Button';

const Wrap = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  overflow: hidden;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusBtn = styled.button`
  flex: 1 1;
  background-color: #fff;
  border: none;
  transition: filter 0.1s linear;
  padding: 15px 0;
  &:hover {
    filter: brightness(0.96);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

const TodoListContainer = styled.div`
  li {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 17px 0 23px;
    transition: filter 0.1s linear;
    &:hover {
      filter: brightness(0.98);
    }
    &:active {
      filter: brightness(0.95);
    }
    .todo-checkbox {
      display: block;
      width: 20px;
      height: 20px;
      cursor: default;
      border: 1px solid #9F9A91;
      border-radius: 5px;
      margin-right: 16px;
    }
    .todo-checkbox-done {
      display: none;
      cursor: default;
      color: #FFD370;
      margin-right: 16px;
    }
    > .todo-content {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #E5E5E5;
      padding: 24px 17px 24px 0;
      margin-right: 17px;
    }
    .todo-delete-btn {
      cursor: pointer;
    }
    &.finished {
      .todo-checkbox {
        display: none;
      }
      .todo-checkbox-done {
        display: block;
      }
      .todo-text {
        color: #9F9A91;
        text-decoration: line-through;
      }
    }
  }
`;

const TodoListFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px 48px 25px 23px;
`;

interface ITodosProps {
  todos: Array<ITodo>;
  progressBarStyle: IProgressBarStyle;
  unfinishedTodoNum: number;
  setDisplayStatus: (status: DisplayStatus) => void;
}

const TodoList: React.FC<ITodosProps> = ({
  todos, setDisplayStatus, unfinishedTodoNum, progressBarStyle,
}) => (
  <Wrap>
    <ButtonGroup>
      <StatusBtn type="button" onClick={() => setDisplayStatus('all')}>全部</StatusBtn>
      <StatusBtn type="button" onClick={() => setDisplayStatus('unfinished')}>待完成</StatusBtn>
      <StatusBtn type="button" onClick={() => setDisplayStatus('finished')}>已完成</StatusBtn>
    </ButtonGroup>
    <Progress progressBarStyle={progressBarStyle} />
    <TodoListContainer>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.finished ? 'finished' : ''}>
            <div className="todo-content">
              <span className="material-icons-outlined todo-checkbox-done">done</span>
              <span className="todo-checkbox" />
              <span className="todo-text">{todo.title}</span>
            </div>
            <span className="material-icons-outlined todo-delete-btn">close</span>
          </li>
        ))}
      </ul>
      <TodoListFooter>
        <p>{unfinishedTodoNum} 個待完成項目</p>
        <Button
          type="button"
          fs="14px"
          p="0"
          color="#9F9A91"
          bgColor="transparent"
          border="none"
          transitionType="dark"
        >
          清除已完成項目
        </Button>
      </TodoListFooter>
    </TodoListContainer>
  </Wrap>
);

export default TodoList;
