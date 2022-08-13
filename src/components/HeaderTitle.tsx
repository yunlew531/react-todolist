import React from 'react';
import styled from '@emotion/styled';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  > img {
    width: 33px;
    height: 33px;
    margin-right: 5px;
  }
  > h1 {
    font-family: 'Baloo Thambi 2';
    font-size: 32px;
    font-weight: 700;
  }
`;

const HeaderTitle: React.FC = () => (
  <Wrap>
    <img src="/images/check.png" alt="check" />
    <h1>ONLINE TODO LIST</h1>
  </Wrap>
);

export default HeaderTitle;
