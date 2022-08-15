import ProvideAuth from 'auth/ProvideAuth';
import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes';

const App: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

const AppWrapper: React.FC = () => (
  <ProvideAuth>
    <Router>
      <App />
    </Router>
  </ProvideAuth>
);

export default AppWrapper;
