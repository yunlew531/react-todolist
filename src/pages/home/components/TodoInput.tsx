import React, { useState } from 'react';
import styled from '@emotion/styled';

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 16px;
  > input {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  } 
`;

const AddTodoBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  border: none;
  border-radius: 10px;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(0.9);
  }
  .add-icon {
    color: #fff;
  }
`;

const TodoInput: React.FC = () => {
  const [value, setValue] = useState('');
  return (
    <InputGroup>
      <input type="text" value={value} placeholder="新增待辦事項" onChange={() => setValue(value)} />
      <AddTodoBtn>
        <span className="material-icons-outlined add-icon">add</span>
      </AddTodoBtn>
    </InputGroup>
  );
};

export default TodoInput;
