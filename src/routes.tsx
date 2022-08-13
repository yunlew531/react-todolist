import React from 'react';
import type { RouteObject } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
