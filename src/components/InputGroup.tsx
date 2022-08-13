import styled from '@emotion/styled';

const InputGroup = styled.div`
  height: 90px;
  font-weight: 700;
  margin-bottom: 16px;
  p {
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    border-radius: 10px;
    padding: 12px 16px;
    border: none;
    margin-bottom: 4px;
    &::placeholder {
      color: #9F9A91;
      font-weight: 700;
    }
  }
  span {
    color: #D87355;
    font-size: 14px;
  }
`;

export default InputGroup;
