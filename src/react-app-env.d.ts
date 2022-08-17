/// <reference types="react-scripts" />

type CurrentDisplay = 'login' | 'register';
type DisplayStatus = 'all' | 'finished' | 'unfinished';

interface ITodo {
  content: string;
  id: string;
  completed_at: boolean;
}

interface IProgressBarStyle {
  left: number;
}

interface IUser {
  email?: string;
  password?: string;
  passwordCheck?: string;
  nickname?: string;
}

interface IRegisterAPIRes {
  message: string;
  error: Array<string>;
}

interface ILoginApiRes {
  nickname: string;
  email: string;
  message: string;
  error: string;
}

interface ICheckLoginApiRes {
  message: string;
}

interface IAddTodoRes {
  id: string;
  content: string;
  message: string;
}

interface IGetTodosRes {
  message: string;
  todos?: Array<ITodo>
}

interface IUpdateTodoRes {
  id: string;
  content: string;
}
