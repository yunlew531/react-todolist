import React from 'react';
import styled from '@emotion/styled';

const Wrap = styled.div`
  position: relative;
  height: 3px;
  background-color: #EFEFEF;
`;

const ProgressBar = styled.div<{ left: number }>`
  position: absolute;
  top: 0;
  left: ${({ left }) => left}%;
  width: ${(1 / 3) * 100}%;
  height: 100%;
  background-color: #333333;
  transition: left 0.2s linear;
`;

interface IProgressProps {
  progressBarStyle: IProgressBarStyle;
}

const Progress: React.FC<IProgressProps> = ({ progressBarStyle }) => (
  <Wrap>
    <ProgressBar left={progressBarStyle.left} />
  </Wrap>
);
export default Progress;
