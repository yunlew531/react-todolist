import React from 'react';
import styled from '@emotion/styled';

const Wrap = styled.div`
  max-width: 240px;
  margin: 60px auto 0;
  .todo-empty-text {
    text-align: center;
    margin-bottom: 16px;
  }
`;

const TodoEmpty: React.FC = () => (
  <Wrap>
    <p className="todo-empty-text">目前尚無待辦事項</p>
    <img src="/images/empty 1.png" alt="todo empty" />
  </Wrap>
);

export default TodoEmpty;
