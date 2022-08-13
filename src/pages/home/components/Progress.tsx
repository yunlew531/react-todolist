import React from 'react';
import styled from '@emotion/styled';

const Wrap = styled.div`
  position: relative;
  height: 3px;
  background-color: #EFEFEF;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(1 / 3) * 100}%;
  height: 100%;
  background-color: #333333;
  transition: left 0.3s linear;
`;

const Progress: React.FC = () => (
  <Wrap>
    <ProgressBar />
  </Wrap>
);
export default Progress;
