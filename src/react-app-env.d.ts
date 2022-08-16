/// <reference types="react-scripts" />

type CurrentDisplay = 'login' | 'register';
type DisplayStatus = 'all' | 'finished' | 'unfinished';

interface ITodo {
  title: string;
  id: string;
  finished: boolean;
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
  message: string;
  error: string;
}
