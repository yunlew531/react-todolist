import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Progress from 'pages/home/components/Progress';
import Button from 'components/Button';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useLoading } from 'components/ProvideLoading';

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

interface ITodoItemProps {
  inputDisplay: 'block' | 'none';
  contentDisplay: 'block' | 'none';
}

const TodoItem = styled.li<ITodoItemProps>`
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 17px 0 23px;
  transition: filter 0.1s linear;
  &:hover {
    filter: brightness(0.98);
    .todo-edit-btn {
      transform: translateY(0);
    }
  }
  &:active {
    filter: brightness(0.95);
  }
  .todo-edit-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10px;
    top: 0px;
    cursor: pointer;
    color: #FFB4B4;
    background-color: #FFF9CA;
    border-radius: 0 0 7px 7px;
    padding: 5px;
    border: none;
    transition: transform 0.2s linear;
    transform: translateY(-100%);
  }
  .todo-checkbox {
    flex-shrink: 0;
    display: block;
    width: 24px;
    height: 24px;
    cursor: default;
    border: 1px solid #9F9A91;
    border-radius: 5px;
    margin-right: 16px;
  }
  .todo-checkbox-done {
    flex-shrink: 0;
    display: none;
    cursor: default;
    color: #FFD370;
    margin-right: 16px;
  }
  > .todo-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #E5E5E5;
    padding: 24px 17px 24px 0;
    margin-right: 17px;
  }
  .todo-content {
    display: ${({ contentDisplay }) => contentDisplay};
  }
  .todo-delete-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .edit-todo-input {
    display: ${({ inputDisplay }) => inputDisplay};
    border: 1px solid #000;
  }
  &.finished {
    .todo-checkbox {
      display: none;
    }
    .todo-checkbox-done {
      display: block;
    }
    .todo-content {
      color: #9F9A91;
      text-decoration: line-through;
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
  getTodos: ()=> void;
  setTodos: (todos: React.SetStateAction<ITodo[]>) => void;
}

const TodoList: React.FC<ITodosProps> = ({
  todos, setDisplayStatus, unfinishedTodoNum, progressBarStyle, getTodos, setTodos,
}) => {
  const { setIsLoading } = useLoading();
  const [currentEdit, setCurrentEdit] = useState({ id: '', content: '', key: 0 });
  const editInputRefs = useRef<Array<HTMLInputElement>>([]);

  const toggleFinished = async (e: React.MouseEvent<HTMLLIElement>, id: string) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    if (currentEdit.id === id) return;

    setIsLoading(true);
    try {
      let res: Response | ITodo = await fetch(`${process.env.REACT_APP_URL as string}todos/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: Cookies.get('ReactTodos') || '' },
      });
      const { status } = res;
      if (status !== 200) throw new Error();

      res = await res.json() as ITodo;
      setTodos((prev) => prev.map((todo) => (
        todo.id === id ? { ...todo, completed_at: (res as ITodo).completed_at } : todo
      )));
    } catch (err) { toast.error('發生錯誤，請稍後再修改!'); }
    setIsLoading(false);
  };

  const editTodo = (
    e: React.MouseEvent<HTMLButtonElement>,
    { id, content }: ITodo,
    key: number,
  ) => {
    e.stopPropagation();
    setCurrentEdit({ id, content, key });
  };

  useEffect(() => {
    editInputRefs.current[currentEdit.key]?.focus();
  }, [currentEdit]);

  const cancelEdit = () => setCurrentEdit({ id: '', content: '', key: 0 });

  const submitEdit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      cancelEdit();
      return;
    }
    if (e.key !== 'Enter') return;
    if (!currentEdit.content) {
      toast.error('需要輸入點內容喔!');
      return;
    }

    const { id } = currentEdit;
    let { content } = currentEdit;

    const body = { todo: { content } };
    setIsLoading(true);
    try {
      let res: Response | ITodo = await fetch(`${process.env.REACT_APP_URL as string}todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: Cookies.get('ReactTodos') || '',
        },
        body: JSON.stringify(body),
      });
      const { status } = res;
      if (status !== 200) throw new Error();

      res = await res.json() as ITodo;
      ({ content } = res);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, content } : todo)));
      setCurrentEdit({ id: '', content: '', key: 0 });
    } catch (err) { toast.error('發生錯誤，請稍後再嘗試!'); }
    setIsLoading(false);
  };

  const deleteTodo = async (e: React.MouseEvent<HTMLButtonElement>, { id, content }: ITodo) => {
    e.stopPropagation();

    setIsLoading(true);
    try {
      let res: Response | ITodo = await fetch(`${process.env.REACT_APP_URL as string}todos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: Cookies.get('ReactTodos') || '' },
      });
      const { status } = res;
      if (status !== 200) throw new Error();

      res = await res.json() as ITodo;
      toast.success(`已刪除 ${content}`);
      setIsLoading(false);
      getTodos();
    } catch (err) {
      setIsLoading(false);
      toast.error('發生錯誤，請稍後再嘗試!');
    }
  };

  type DeleteFinishTodosRes = Array<Response> | Array<ITodo>;

  const deleteFinishTodos = async (todosData: Array<ITodo>) => {
    const finishTodos = todosData.filter((todo) => todo.completed_at);
    if (!finishTodos.length) {
      toast.error('目前沒有已完成項目!');
      return;
    }

    setIsLoading(true);
    try {
      const resArr: DeleteFinishTodosRes = await Promise.all(
        finishTodos.map((todo) => fetch(`${process.env.REACT_APP_URL as string}todos/${todo.id}`, {
          method: 'DELETE',
          headers: { Authorization: Cookies.get('ReactTodos') || '' },
        })),
      );
      const haveError = resArr.some((res) => res.status !== 200);
      if (haveError) throw new Error();

      toast.success('已刪除完成項目!');
      setIsLoading(false);
      getTodos();
    } catch (error) {
      toast.error('發生錯誤，請稍後再嘗試!');
      setIsLoading(false);
    }
  };

  return (
    <Wrap>
      <ButtonGroup>
        <StatusBtn type="button" onClick={() => setDisplayStatus('all')}>全部</StatusBtn>
        <StatusBtn type="button" onClick={() => setDisplayStatus('unfinished')}>待完成</StatusBtn>
        <StatusBtn type="button" onClick={() => setDisplayStatus('finished')}>已完成</StatusBtn>
      </ButtonGroup>
      <Progress progressBarStyle={progressBarStyle} />
      <ul>
        {todos.map((todo, key) => (
          <TodoItem
            key={todo.id}
            className={todo.completed_at ? 'finished' : ''}
            inputDisplay={todo.id === currentEdit.id ? 'block' : 'none'}
            contentDisplay={todo.id === currentEdit.id ? 'none' : 'block'}
            onClick={(e) => toggleFinished(e, todo.id)}
          >
            <div className="todo-container">
              <button type="button" className="todo-edit-btn" onClick={(e) => editTodo(e, todo, key)}>
                <span className="material-icons-outlined">edit</span>
              </button>
              <span className="material-icons-outlined todo-checkbox-done">done</span>
              <span className="todo-checkbox" />
              <p className="todo-content">{todo.content}</p>
              <input
                ref={(el: HTMLInputElement) => { editInputRefs.current[key] = el; }}
                type="text"
                className="edit-todo-input"
                value={currentEdit.content}
                onChange={
                  (e: React.ChangeEvent<HTMLInputElement>) => setCurrentEdit((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                onKeyUp={(e) => submitEdit(e)}
              />
            </div>
            <Button
              type="button"
              p="0"
              color="#000"
              bgColor="transparent"
              transitionType="scale"
              border="none"
              onClick={(e) => deleteTodo(e, todo)}
            >
              <span className="material-icons-outlined">close</span>
            </Button>
          </TodoItem>
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
          onClick={() => deleteFinishTodos(todos)}
        >
          清除已完成項目
        </Button>
      </TodoListFooter>
    </Wrap>
  );
};

export default TodoList;
