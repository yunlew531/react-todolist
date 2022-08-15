import styled from '@emotion/styled';

interface IButtonProps {
  fs?: string;
  color?: string;
  bgColor?: string;
  cursor?: 'pointer';
  border?: string;
  radius?: number;
  transitionType?: 'bright' | 'dark' | 'scale';
  p?: string;
  m?: string;
}

const dark = `
  &:hover {
    filter: brightness(0.7);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

const bright = `
  &:hover {
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.8);
  }
`;

const scale = `
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1);
  }
`;

const Button = styled.button<IButtonProps>`
  font-size: ${({ fs }) => fs || '16px'};
  color: ${({ color }) => color || '#fff'};
  background-color: ${({ bgColor }) => bgColor || '#333333'};
  border: ${({ border }) => border || '#333333 1px solid'};
  cursor: ${({ cursor }) => cursor || 'default'};
  border-radius: ${({ radius }) => radius || '10px'};
  padding: ${({ p }) => p || '12px 48px'};
  margin: ${({ m }) => m || '0'};
${
  ({ transitionType }) => (
    (transitionType === 'dark' && dark)
    || (transitionType === 'bright' && bright)
    || (transitionType === 'scale' && scale)
  )
}
`;

export default Button;
